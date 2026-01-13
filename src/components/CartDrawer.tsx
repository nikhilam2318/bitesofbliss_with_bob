import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Store,
  Percent,
  ArrowLeft,
  ChefHat,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

// --- CONFIGURATION ---
const WHATSAPP_NUMBER = "447350739707";
const CURRENCY_SYMBOL = "£";
const SERVICE_CHARGE = 0.5;

// --- PICKUP ADDRESSES ---
const PICKUP_ADDRESSES = [
  { id: "stoney", label: "577 Stoney Stanton Rd, CV6 5ED" },
  { id: "city", label: "119 Gosford Street, Coventry, England CV1 5DL" },
];

// --- LINKS ---
const WAZE_LINK = "https://waze.com/ul/hgcqfnpb74";
const GMAPS_LINK = "https://maps.app.goo.gl/wGqL1Ee9J24EDRCT8?g_st=ipc";

// --- PICKUP OFFER ---
const PICKUP_OFFER_THRESHOLD = 15.0;
const PICKUP_DISCOUNT_PERCENTAGE = 0.1;

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, totalPrice, removeItem } =
    useCart();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [selectedPickupAddress, setSelectedPickupAddress] = useState(
    PICKUP_ADDRESSES[0]
  );

  const isPickupOfferEligible = totalPrice >= PICKUP_OFFER_THRESHOLD;
  const pickupDiscount = isPickupOfferEligible
    ? totalPrice * PICKUP_DISCOUNT_PERCENTAGE
    : 0;

  const amountToPickupOffer = PICKUP_OFFER_THRESHOLD - totalPrice;
  const finalTotal = totalPrice + SERVICE_CHARGE - pickupDiscount;

  const handleOrderClick = () => {
    if (items.length === 0) return;
    setShowConfirmation(true);
  };

  const confirmOrder = () => {
    const itemsList = items
      .map((item) => {
        const totalItemPrice = (item.price * item.quantity).toFixed(2);
        let str = `- ${item.quantity}x ${item.name}`;
        if (item.selectedOptions?.length) {
          str += ` + ${item.selectedOptions.join(" + ")}`;
        }
        str += ` (${CURRENCY_SYMBOL}${totalItemPrice})`;
        return str;
      })
      .join("\n");

    const instructionsText = instructions.trim()
      ? `\n\n*📝 Instructions:*\n${instructions}`
      : "";

    const message =
      `*New Order: PICKUP* 🛍️\n\n` +
      `*Items:*\n${itemsList}` +
      `${instructionsText}\n\n` +
      `--------------------------------\n` +
      `Subtotal: ${CURRENCY_SYMBOL}${totalPrice.toFixed(2)}\n` +
      `Service Charge: ${CURRENCY_SYMBOL}${SERVICE_CHARGE.toFixed(2)}\n` +
      (pickupDiscount > 0
        ? `Discount (10%): -${CURRENCY_SYMBOL}${pickupDiscount.toFixed(2)}\n`
        : "") +
      `*Final Total: ${CURRENCY_SYMBOL}${finalTotal.toFixed(2)}*\n` +
      `--------------------------------\n\n` +
      `*Pickup Address:*\n${selectedPickupAddress.label}\n\n` +
      `Please collect after 20 minutes.\n\n` +
      `Waze: ${WAZE_LINK}\n` +
      `Google Maps: ${GMAPS_LINK}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setShowConfirmation(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[150]"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-[200] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
          >
            {/* Header */}
            <div className="p-5 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold flex gap-2">
                <ShoppingBag className="text-accent" /> Your Cart
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${JSON.stringify(item.selectedOptions)}`}
                  className="flex gap-3 border rounded-xl p-3"
                >
                  <img
                    src={item.image}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{item.name}</h3>
                      <span className="font-bold text-amber-600">
                        {CURRENCY_SYMBOL}
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {item.selectedOptions?.map((opt, i) => (
                      <p key={i} className="text-xs text-muted-foreground">
                        • {opt}
                      </p>
                    ))}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          removeItem(item.id, item.selectedOptions)
                        }
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pickup Offer */}
              <div className="border rounded-lg p-3">
                <h4 className="font-bold flex gap-2">
                  <Percent size={16} /> Pickup Offer
                </h4>
                {isPickupOfferEligible ? (
                  <p className="text-green-600 text-sm">
                    🎉 You unlocked 10% OFF
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Add {CURRENCY_SYMBOL}
                    {amountToPickupOffer.toFixed(2)} more to get 10% OFF
                  </p>
                )}
              </div>

              {/* Instructions */}
              <div>
                <label className="font-bold flex gap-2 mb-2">
                  <ChefHat size={16} /> Cooking Instructions (Optional)
                </label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={2}
                  className="w-full border rounded-lg p-2"
                  placeholder="No onions, extra spicy, allergies..."
                />
                <div className="mt-2 flex gap-2 text-xs text-red-700">
                  <AlertCircle size={14} />
                  Please inform staff about allergies.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {CURRENCY_SYMBOL}
                  {totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Service Charge</span>
                <span>
                  {CURRENCY_SYMBOL}
                  {SERVICE_CHARGE.toFixed(2)}
                </span>
              </div>

              {pickupDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Pickup Discount</span>
                  <span>
                    -{CURRENCY_SYMBOL}
                    {pickupDiscount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-xl font-bold border-t pt-2">
                <span>Total</span>
                <span>
                  {CURRENCY_SYMBOL}
                  {finalTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleOrderClick}
                className="w-full bg-accent text-white py-3 rounded-xl mt-3 flex justify-center gap-2"
              >
                <MessageCircle /> Order for Pickup
              </button>
            </div>

            {/* Confirmation */}
            <AnimatePresence>
              {showConfirmation && (
                <motion.div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 z-[300]">
                  <motion.div className="bg-background p-6 rounded-xl w-full max-w-sm">
                    <h3 className="text-xl font-bold text-center">
                      Confirm Pickup
                    </h3>
                    <p className="text-center text-sm mb-4">
                      Order will be sent via WhatsApp
                    </p>

                    {PICKUP_ADDRESSES.map((addr) => (
                      <button
                        key={addr.id}
                        onClick={() => setSelectedPickupAddress(addr)}
                        className={`w-full p-3 border rounded-lg text-left mb-2 ${
                          selectedPickupAddress.id === addr.id
                            ? "border-accent bg-accent/10"
                            : ""
                        }`}
                      >
                        {addr.label}
                      </button>
                    ))}

                    <p className="text-xs text-center mt-2">
                      Collect after 20 minutes
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => setShowConfirmation(false)}
                        className="flex-1 border rounded-lg py-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmOrder}
                        className="flex-1 bg-accent text-white rounded-lg py-2"
                      >
                        Send
                      </button>
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
