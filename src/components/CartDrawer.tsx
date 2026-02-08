import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle, Store, Truck, User, Phone, MapPin, ArrowLeft, ChefHat, Percent, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

// --- CONFIGURATION ---
const WHATSAPP_NUMBER = "447350739707"; 
const CURRENCY_SYMBOL = "£";
const DELIVERY_FEE = 2.49;
const SERVICE_CHARGE = 0.50; 
const FREE_DELIVERY_THRESHOLD = 25.00;
const PICKUP_ADDRESS = "577 Stoney Stanton rd, CV6 5ED";

// --- LINKS ---
const WAZE_LINK = "https://waze.com/ul/hgcqfnpb74";
const GMAPS_LINK = "https://maps.app.goo.gl/wGqL1Ee9J24EDRCT8?g_st=ipc";

// --- NEW OFFER CONFIGURATION ---
const PICKUP_OFFER_THRESHOLD = 15.00; // £15
const PICKUP_DISCOUNT_PERCENTAGE = 0.10; // 10%
// ---------------------

type OrderType = 'pickup' | 'delivery';

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, totalPrice, removeItem } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // New State for Order Flow
  const [orderType, setOrderType] = useState<OrderType>('pickup');
  const [instructions, setInstructions] = useState(""); 
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const [errors, setErrors] = useState<{[key: string]: boolean}>({});

  // Refs for auto-scrolling
  const deliveryFormRef = useRef<HTMLDivElement>(null);
  const orderTypeRef = useRef<HTMLDivElement>(null); 

  // --- LOGIC: Handle Browser Back Button ---
  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ cartOpen: true }, "");

      const handlePopState = () => {
        if (showConfirmation) {
          setShowConfirmation(false); 
        } else {
          setIsOpen(false); 
        }
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [isOpen, setIsOpen, showConfirmation]);

  // --- LOGIC: Auto-scroll to Order Type on Open ---
  useEffect(() => {
    if (isOpen && orderTypeRef.current) {
      setTimeout(() => {
        orderTypeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300); 
    }
  }, [isOpen]);

  // --- LOGIC: Auto-scroll to Delivery Form ---
  useEffect(() => {
    if (orderType === 'delivery' && deliveryFormRef.current) {
      setTimeout(() => {
        deliveryFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [orderType]);

  // --- CALCULATIONS ---
  const isFreeDelivery = totalPrice >= FREE_DELIVERY_THRESHOLD;
  const currentDeliveryFee = orderType === 'delivery' && !isFreeDelivery ? DELIVERY_FEE : 0;
  const amountToFreeDelivery = FREE_DELIVERY_THRESHOLD - totalPrice;
  const currentServiceCharge = SERVICE_CHARGE;
  const isPickupOfferEligible = totalPrice >= PICKUP_OFFER_THRESHOLD;
  const pickupDiscount = (orderType === 'pickup' && isPickupOfferEligible) 
    ? totalPrice * PICKUP_DISCOUNT_PERCENTAGE 
    : 0;
  const amountToPickupOffer = PICKUP_OFFER_THRESHOLD - totalPrice;
  const finalTotal = totalPrice + currentDeliveryFee + currentServiceCharge - pickupDiscount;

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: false }));
    }
  };

  const handleOrderClick = () => {
    if (items.length === 0) return;

    if (orderType === 'delivery') {
      const newErrors: {[key: string]: boolean} = {};
      if (!customerDetails.name.trim()) newErrors.name = true;
      if (!customerDetails.phone.trim()) newErrors.phone = true;
      if (!customerDetails.address.trim()) newErrors.address = true;

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        if (deliveryFormRef.current) {
            deliveryFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
    }

    setShowConfirmation(true);
  };

  // Step 2: User confirms, send message
  const confirmOrder = () => {
    // --- UPDATED MESSAGE FORMAT ---
    // Format: "- 1x Burger + Cheese + Coke (£7.99)"
    const itemsList = items.map((item) => {
      const totalItemPrice = (item.price * item.quantity).toFixed(2);
      
      // Start with base item
      let itemString = `- ${item.quantity}x ${item.name}`;

      // Append options inline with "+"
      if (item.selectedOptions && item.selectedOptions.length > 0) {
         const optionsJoined = item.selectedOptions.join(" + ");
         itemString += ` + ${optionsJoined}`;
      }
      
      // Append Price at the end
      itemString += ` (${CURRENCY_SYMBOL}${totalItemPrice})`;
      
      return itemString;
    }).join("\n"); 
    // ----------------------------------------------

    const instructionsText = instructions.trim() ? `\n\n*📝 Instructions:*\n${instructions}` : "";

    let message = "";

    if (orderType === 'pickup') {
      message = `*New Order: PICKUP* 🛍️\n\n` +
        `*Items:*\n${itemsList}` +
        `${instructionsText}\n\n` +
        `--------------------------------\n` +
        `Subtotal: ${CURRENCY_SYMBOL}${totalPrice.toFixed(2)}\n` +
        `Service Charge: ${CURRENCY_SYMBOL}${currentServiceCharge.toFixed(2)}\n` +
        (pickupDiscount > 0 ? `Discount (10%): -${CURRENCY_SYMBOL}${pickupDiscount.toFixed(2)}\n` : '') +
        `*Final Total: ${CURRENCY_SYMBOL}${finalTotal.toFixed(2)}*\n` +
        `--------------------------------\n\n` +
        `*NOTE:* Please collect your order after 20 minutes from ${PICKUP_ADDRESS}.\n\n` +
        `*Driving Instructions:*\n` +
        `Waze: ${WAZE_LINK}\n` +
        `Google Maps: ${GMAPS_LINK}`;
    } else {
      message = `*New Order: DELIVERY* 🛵\n\n` +
        `*Items:*\n${itemsList}` +
        `${instructionsText}\n\n` + 
        `*Customer Details:*\n` + 
        `Name: ${customerDetails.name}\n` +
        `Phone: ${customerDetails.phone}\n` +
        `Address: ${customerDetails.address}\n\n` +
        `--------------------------------\n` +
        `Subtotal: ${CURRENCY_SYMBOL}${totalPrice.toFixed(2)}\n` +
        `Delivery Fee: ${currentDeliveryFee === 0 ? 'FREE' : `${CURRENCY_SYMBOL}${currentDeliveryFee}`}\n` +
        `Service Charge: ${CURRENCY_SYMBOL}${currentServiceCharge.toFixed(2)}\n` +
        `*Final Total: ${CURRENCY_SYMBOL}${finalTotal.toFixed(2)}*`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    
    setShowConfirmation(false); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[150]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-[200] flex flex-col border-l border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border bg-background/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <h2 className="font-serif text-xl font-bold text-foreground">Your Cart</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Cart Items Area - Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 bg-secondary/10">
              {items.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center justify-center h-full">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-accent/50" />
                  </div>
                  <p className="text-foreground font-medium text-lg mb-2">Your cart is empty</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-6 px-8 py-3 bg-accent text-accent-foreground rounded-full font-bold shadow-soft hover:bg-yellow-400 transition-colors"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* List of Items */}
                  <div className="space-y-4">
                    {items.map((item) => {
                      // Check if item has add-ons
                      const hasOptions = item.selectedOptions && item.selectedOptions.length > 0;

                      return (
                        <motion.div
                          key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} // Ensure unique key for variants
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex gap-4 bg-card rounded-xl p-3 shadow-sm border border-border/50"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg bg-secondary"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <div className="pr-2">
                                  <h3 className="font-bold text-foreground text-sm line-clamp-2">{item.name}</h3>
                                  {/* --- Display Selected Options --- */}
                                  {hasOptions && (
                                      <div className="mt-1 flex flex-col gap-0.5">
                                      {item.selectedOptions!.map((opt, i) => (
                                          <span key={i} className="text-[10px] text-muted-foreground flex items-center gap-1">
                                          <span className="w-1 h-1 rounded-full bg-accent" />
                                          {opt}
                                          </span>
                                      ))}
                                      </div>
                                  )}
                              </div>
                              <p className="text-amber-600 font-bold text-sm whitespace-nowrap">
                                {CURRENCY_SYMBOL}{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                              {/* --- QUANTITY CONTROLS --- */}
                              {hasOptions ? (
                                // IF CUSTOMIZED: Show only count, no buttons to avoid issues
                                <div className="text-xs font-bold text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-lg">
                                    Qty: {item.quantity}
                                </div>
                              ) : (
                                // IF STANDARD: Show + / - buttons
                                <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-1">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-7 h-7 flex items-center justify-center bg-background rounded-md shadow-sm text-foreground hover:text-accent transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-7 h-7 flex items-center justify-center bg-background rounded-md shadow-sm text-foreground hover:text-accent transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                              
                              {/* --- DELETE BUTTON --- */}
                              <button
                                // FIXED: Must pass selectedOptions to delete specific variant
                                onClick={() => removeItem(item.id, item.selectedOptions)} 
                                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* --- Order Type Selection --- */}
                  <div 
                    ref={orderTypeRef} 
                    className="bg-card p-4 rounded-xl border border-border space-y-3"
                  >
                    <h3 className="font-serif font-bold text-foreground">Order Type</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setOrderType('pickup')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all font-medium ${
                          orderType === 'pickup' 
                            ? 'border-accent bg-accent/10 text-foreground' 
                            : 'border-border bg-transparent text-muted-foreground hover:border-accent/50'
                        }`}
                      >
                        <Store className="w-4 h-4" />
                        Pickup
                      </button>
                      <button
                        onClick={() => setOrderType('delivery')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all font-medium ${
                          orderType === 'delivery' 
                            ? 'border-accent bg-accent/10 text-foreground' 
                            : 'border-border bg-transparent text-muted-foreground hover:border-accent/50'
                        }`}
                      >
                        <Truck className="w-4 h-4" />
                        Delivery
                      </button>
                    </div>

                    {/* Logic: Pickup Selected - Show Offer */}
                    {orderType === 'pickup' && (
                      <div className="mt-4 pt-4 border-t border-border animate-in fade-in slide-in-from-top-2">
                        <div className={`border p-3 rounded-lg mb-2 ${isPickupOfferEligible ? 'bg-green-50 border-green-200' : 'bg-secondary/30 border-dashed border-accent'}`}>
                           <div className="flex items-start gap-3">
                             <div className={`p-2 rounded-full ${isPickupOfferEligible ? 'bg-green-100 text-green-700' : 'bg-accent/10 text-accent'}`}>
                                <Percent className="w-4 h-4" />
                             </div>
                             <div>
                                <h4 className={`font-bold text-sm ${isPickupOfferEligible ? 'text-green-800' : 'text-foreground'}`}>
                                  Pickup Offer
                                </h4>
                                {isPickupOfferEligible ? (
                                   <p className="text-xs text-green-700 mt-1">
                                     Yay! You've unlocked <strong>10% OFF</strong> on this order.
                                   </p>
                                ) : (
                                   <p className="text-xs text-muted-foreground mt-1">
                                     Add <strong>{CURRENCY_SYMBOL}{amountToPickupOffer.toFixed(2)}</strong> more to get <strong>10% OFF</strong>!
                                   </p>
                                )}
                             </div>
                           </div>
                           
                           {!isPickupOfferEligible && (
                              <button 
                                onClick={() => setIsOpen(false)}
                                className="mt-2 ml-10 text-xs flex items-center gap-1 font-bold text-accent hover:underline"
                              >
                                <ArrowLeft className="w-3 h-3" />
                                Add more items
                              </button>
                           )}
                        </div>
                      </div>
                    )}

                    {/* Logic: Delivery Selected */}
                    {orderType === 'delivery' && (
                        <div 
                          ref={deliveryFormRef}
                          className="mt-4 pt-4 border-t border-border animate-in fade-in slide-in-from-top-2"
                        >
                           {/* Free Delivery Message */}
                           {!isFreeDelivery && (
                             <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg mb-4">
                                <p className="text-sm text-blue-800 mb-2">
                                  Add <strong>{CURRENCY_SYMBOL}{amountToFreeDelivery.toFixed(2)}</strong> more for free delivery!
                                </p>
                                <button 
                                  onClick={() => setIsOpen(false)}
                                  className="text-xs flex items-center gap-1 font-bold text-blue-600 hover:underline"
                                >
                                  <ArrowLeft className="w-3 h-3" />
                                  Back to Menu
                                </button>
                             </div>
                           )}

                           {/* Delivery Form */}
                           <div className="space-y-3">
                              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                                Delivery Details <span className="text-red-500 text-xs">*</span>
                              </h4>
                              
                              <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <input 
                                  type="text"
                                  name="name"
                                  placeholder="Full Name"
                                  value={customerDetails.name}
                                  onChange={handleInputChange}
                                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-accent ${errors.name ? 'border-red-500' : 'border-input'}`}
                                />
                              </div>

                              <div className="relative">
                                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <input 
                                  type="tel"
                                  name="phone"
                                  placeholder="Phone Number"
                                  value={customerDetails.phone}
                                  onChange={handleInputChange}
                                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-accent ${errors.phone ? 'border-red-500' : 'border-input'}`}
                                />
                              </div>

                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <textarea 
                                  name="address"
                                  placeholder="Full Delivery Address (House No, Street, Postcode)"
                                  rows={2}
                                  value={customerDetails.address}
                                  onChange={handleInputChange}
                                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none ${errors.address ? 'border-red-500' : 'border-input'}`}
                                />
                              </div>
                           </div>
                        </div>
                    )}
                  </div>

                  {/* --- Cooking Instructions --- */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-2 text-sm font-bold text-foreground">
                      <ChefHat className="w-4 h-4" />
                      Cooking Instructions (Optional)
                    </div>
                    <textarea 
                      placeholder="E.g., No onions, extra spicy, allergies..." 
                      className="w-full p-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent text-sm resize-none shadow-sm"
                      rows={2}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                    
                    {/* Allergy Note Box */}
                    <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-red-800 leading-tight">
                        <strong>Allergy Note:</strong> If you have a food allergy or a special dietary requirement, please inform a member of staff.
                      </p>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-border bg-background space-y-4">
                <div className="space-y-1 mb-2">
                   <div className="flex items-center justify-between text-muted-foreground">
                     <span>Subtotal</span>
                     <span>{CURRENCY_SYMBOL}{totalPrice.toFixed(2)}</span>
                   </div>
                   
                   {/* Delivery Fee Line */}
                   {orderType === 'delivery' && (
                     <div className="flex items-center justify-between text-muted-foreground">
                       <span>Delivery Fee</span>
                       {isFreeDelivery ? (
                         <span className="text-green-600 font-bold">FREE</span>
                       ) : (
                         <span>{CURRENCY_SYMBOL}{DELIVERY_FEE.toFixed(2)}</span>
                       )}
                     </div>
                   )}

                   {/* Service Charge Line - Shows for BOTH now */}
                   <div className="flex items-center justify-between text-muted-foreground">
                     <span>Service Charge</span>
                     <span>{CURRENCY_SYMBOL}{SERVICE_CHARGE.toFixed(2)}</span>
                   </div>

                   {/* Pickup Discount Line */}
                   {orderType === 'pickup' && pickupDiscount > 0 && (
                     <div className="flex items-center justify-between text-green-600">
                        <span className="flex items-center gap-1"><Percent className="w-3 h-3"/> Pickup Discount (10%)</span>
                        <span>-{CURRENCY_SYMBOL}{pickupDiscount.toFixed(2)}</span>
                     </div>
                   )}

                   <div className="flex items-center justify-between text-xl pt-2 border-t border-border/50">
                      <span className="font-bold text-foreground">Total</span>
                      <span className="font-sans font-black text-foreground">
                        {CURRENCY_SYMBOL}{finalTotal.toFixed(2)}
                      </span>
                   </div>
                </div>

                <motion.button
                  onClick={handleOrderClick}
                  className="w-full py-4 bg-accent text-accent-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-soft hover:bg-yellow-400 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-6 h-6" />
                  {orderType === 'pickup' ? 'Order for Pickup' : 'Proceed to Checkout'}
                </motion.button>
              </div>
            )}

            {/* --- CONFIRMATION POPUP --- */}
            <AnimatePresence>
              {showConfirmation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[250] flex items-center justify-center p-4"
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-background w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-border"
                  >
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-accent">
                        {orderType === 'pickup' ? <Store className="w-6 h-6"/> : <Truck className="w-6 h-6"/>}
                      </div>
                      <h3 className="text-xl font-serif font-bold text-foreground">
                        Confirm {orderType === 'pickup' ? 'Pickup' : 'Delivery'}
                      </h3>
                      
                      <p className="text-sm text-foreground/80 font-medium">
                        Order will be sent via WhatsApp
                      </p>

                      <div className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                        {orderType === 'pickup' ? (
                           <div className="text-center">
                             <p>Please collect your order after 20 minutes from <br/><strong>{PICKUP_ADDRESS}</strong></p>
                           </div>
                        ) : (
                           <div className="text-left">
                              <p className="font-bold mb-1">Delivering to:</p>
                              <p>{customerDetails.name}</p>
                              <p>{customerDetails.address}</p>
                           </div>
                        )}
                      </div>
                      
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => setShowConfirmation(false)}
                          className="flex-1 py-3 border border-border rounded-xl font-bold text-foreground hover:bg-secondary transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmOrder}
                          className="flex-1 py-3 bg-accent text-accent-foreground rounded-xl font-bold hover:bg-yellow-400 transition-colors shadow-sm"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

