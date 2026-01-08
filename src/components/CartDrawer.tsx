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
const PICKUP_ADDRESS = "577 Stoney Stanton rd, CV6 5ED";

// --- LINKS ---
const WAZE_LINK = "https://waze.com/ul/hgcqfnpb74";
const GMAPS_LINK = "https://maps.app.goo.gl/wGqL1Ee9J24EDRCT8?g_st=ipc";

// --- PICKUP OFFER CONFIGURATION ---
const PICKUP_OFFER_THRESHOLD = 15.0;
const PICKUP_DISCOUNT_PERCENTAGE = 0.1;

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, totalPrice, removeItem } =
    useCart();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [instructions, setInstructions] = useState("");

  const isPickupOfferEligible = totalPrice >= PICKUP_OFFER_THRESHOLD;
  const pickupDiscount = isPickupOfferEligible
    ? totalPrice * PICKUP_DISCOUNT_PERCENTAGE
    : 0;
  const amountToPickupOffer = PICKUP_OFFER_THRESHOLD - totalPrice;
  const finalTotal = totalPrice + SERVICE_CHARGE - pickupDiscount;

  const handleInstructionsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInstructions(e.target.value);
  };

  const handleOrderClick = () => {
    if (items.length === 0) return;
    setShowConfirmation(true);
  };

  const confirmOrder = () => {
    const itemsList = items
      .map((item) => {
        const totalItemPrice = (item.price * item.quantity).toFixed(2);
        let itemString = `- ${item.quantity}x ${item.name}`;

        if (item.selectedOptions && item.selectedOptions.length > 0) {
          const optionsJoined = item.selectedOptions.join(" + ");
          itemString += ` + ${optionsJoined}`;
        }

        itemString += ` (${CURRENCY_SYMBOL}${totalItemPrice})`;
        return itemString;
      })
      .join("\n");

    const instructionsText = instructions.trim()
      ? `\n\nInstructions:\n${instructions}`
      : "";

    const message =
      `New Order: PICKUP\n\n` +
      `Items:\n${itemsList}\n` +
      `${instructionsText}\n\n` +
      `--------------------------------\n` +
      `Subtotal: ${CURRENCY_SYMBOL}${totalPrice.toFixed(2)}\n` +
      `Service Charge: ${CURRENCY_SYMBOL}${SERVICE_CHARGE.toFixed(2)}\n` +
      (pickupDiscount > 0
        ? `Discount (10%): -${CURRENCY_SYMBOL}${pickupDiscount.toFixed(2)}\n`
        : "") +
      `Final Total: ${CURRENCY_SYMBOL}${finalTotal.toFixed(2)}\n` +
      `--------------------------------\n\n` +
      `NOTE: Please collect your order after 20 minutes from ${PICKUP_ADDRESS}.\n\n` +
      `Driving Instructions:\n` +
      `Waze: ${WAZE_LINK}\n` +
      `Google Maps: ${GMAPS_LINK}`;

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
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-bold">Your Cart</h2>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.map((item) => (
                <motion.div
                  key={`${item.id}-${JSON.stringify(item.selectedOptions)}`}
                  layout
                  className="flex gap-4 mb-4 bg-card p-3 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{item.name}</h3>
                      <span>
                        {CURRENCY_SYMBOL}
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus size={14} />
                      </button>

                      <button
                        onClick={() =>
                          removeItem(item.id, item.selectedOptions)
                        }
                        className="ml-auto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-5 border-t">
              <div className="flex justify-between">
                <span>Total</span>
                <span>
                  {CURRENCY_SYMBOL}
                  {finalTotal.toFixed(2)}
                </span>
              </div>

              <motion.button
                onClick={handleOrderClick}
                className="mt-4 w-full bg-accent py-3 rounded-lg font-bold"
              >
                <MessageCircle className="inline mr-2" />
                Order for Pickup
              </motion.button>
            </div>
          </motion.div>

          {/* Confirmation */}
          <AnimatePresence>
            {showConfirmation && (
              <motion.div className="fixed inset-0 bg-black/60 z-[300] flex items-center justify-center">
                <motion.div className="bg-background p-6 rounded-xl max-w-sm w-full">
                  <h3 className="text-lg font-bold mb-4">Confirm Pickup</h3>
                  <p className="text-sm mb-4">
                    Order will be sent via WhatsApp
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="flex-1 border py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmOrder}
                      className="flex-1 bg-accent py-2 rounded font-bold"
                    >
                      Send
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;