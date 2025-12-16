import { useState } from "react";
import { Instagram, Facebook, MapPin, Phone, Mail, X, FileText, Shield, RefreshCcw, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- LEGAL CONTENT CONSTANTS ---
const TERMS_CONTENT = `BOB – Bites of Bliss
Terms and Conditions
Last updated: [15/12/2025]

1. About Us
This website is operated by BOB – Bites of Bliss (“we”, “us”, “our”).
By accessing or using our website bobbitesofbliss.com, you agree to be bound by these Terms and Conditions.
If you do not agree with any part of these terms, please do not use our website.

2. Use of Our Website
• You must be at least 18 years old or have permission from a parent or guardian to use this website.
• You agree not to use the website for any unlawful purpose or in a way that may harm our business or reputation.
• We reserve the right to suspend or restrict access to the website at any time.

3. Online Orders
• All orders placed through our website are subject to availability and acceptance.
• Once an order is placed, you will receive an order confirmation. This does not guarantee acceptance.
• We reserve the right to refuse or cancel an order for any reason, including pricing errors or stock availability.

4. Pricing and Payment
• All prices are displayed in GBP (£) and include VAT where applicable.
• Prices may change at any time without notice.
• Payment must be made in full at the time of ordering using the payment methods available on our website.
• We are not responsible for payment failures caused by third-party payment providers.

5. Cancellations and Refunds
• Due to the nature of freshly prepared food, orders cannot usually be cancelled or refunded once preparation has begun.
• Refunds may be offered at our discretion in cases of incorrect or unsatisfactory orders.
• Any issues must be reported as soon as possible after receiving your order.

6. Allergens and Dietary Requirements
• Our food may contain or come into contact with allergens including (but not limited to) nuts, gluten, dairy, soy, and sesame.
• While we take care to reduce cross-contamination, we cannot guarantee that any item is completely allergen-free.
• Customers are responsible for informing us of any allergies before placing an order.

7. Delivery and Collection
• Estimated delivery or collection times are provided as a guide only and may vary.
• We are not responsible for delays caused by traffic, weather, or unforeseen circumstances.
• Risk passes to you once the order has been delivered or collected.

8. Intellectual Property
• All content on this website (including logos, text, images, and designs) is the property of BOB – Bites of Bliss.
• You may not copy, reproduce, or use any content without our written permission.

9. Limitation of Liability
• We will not be liable for any indirect, incidental, or consequential losses arising from the use of our website or services.
• Nothing in these terms limits our liability for death or personal injury caused by negligence, fraud, or any matter that cannot be excluded under UK law.

10. Privacy
Your use of this website is also governed by our Privacy Policy, which explains how we collect and use personal data in accordance with UK GDPR.

11. Changes to These Terms
We may update these Terms and Conditions at any time.
Changes will be effective immediately once posted on this page.

12. Governing Law
These Terms and Conditions are governed by the laws of England and Wales, and any disputes shall be subject to the exclusive jurisdiction of the UK courts.

13. Contact Us
If you have any questions about these Terms and Conditions, please contact us at:
BOB – Bites of Bliss
📧 Email: bitesofblissbob@gmail.com
🌐 Website: https://bobbitesofbliss.com`;

const PRIVACY_CONTENT = `BOB – Bites of Bliss
Privacy Policy
Last updated: [15/12/2025]

1. Introduction
BOB – Bites of Bliss (“we”, “us”, “our”) is committed to protecting your personal data.
This Privacy Policy explains how we collect, use, store, and protect your information in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.

2. Who We Are
Business Name: BOB – Bites of Bliss
Website: https://bobbitesofbliss.com
Locations:
• 119 Gosford Street, Coventry, CV1 5DL
• 577 Stoney Stanton Road, Coventry, CV6 5ED

3. Personal Data We Collect
We may collect the following information:
• Name
• Email address
• Phone number
• Delivery/collection address
• Order details and preferences
• Payment confirmation (payments are processed securely by third-party providers; we do not store card details)
• IP address and website usage data

4. How We Use Your Data
We use your data to:
• Process and fulfil orders
• Communicate about your order
• Improve our services and website
• Meet legal and regulatory requirements

5. Legal Basis for Processing
We process your data under the following legal bases:
• Performance of a contract (order fulfilment)
• Legal obligations
• Legitimate business interests
• Consent (where required)

6. Sharing Your Data
We may share your data with:
• Payment providers
• Delivery partners
• Website hosting and ordering platforms
We never sell your personal data.

7. Data Retention
We only keep your personal data for as long as necessary to fulfil the purposes outlined above or to meet legal requirements.

8. Your Rights Under UK GDPR
You have the right to:
• Access your personal data
• Correct inaccurate data
• Request deletion of your data
• Restrict or object to processing
• Withdraw consent at any time
• Lodge a complaint with the Information Commissioner’s Office (ICO)

9. Cookies
Our website uses cookies to improve user experience. You can control cookies through your browser settings.

10. Contact Us
If you have any questions about this Privacy Policy or your data, contact us at:
📧 Email: bitesofblissbob@gmail.com`;

const REFUND_CONTENT = `BOB – Bites of Bliss
Refund & Returns Policy
Last updated: [15/12/2025]

1. General Policy
Due to the nature of freshly prepared food, we do not offer returns.

2. Refunds
Refunds may be issued at our discretion in the following cases:
• Incorrect items supplied
• Items missing from the order
• Food quality issues
Any issue must be reported immediately or within 24 hours of receiving your order.

3. Non-Refundable Situations
Refunds will not be issued for:
• Change of mind
• Incorrect address provided by the customer
• Failure to collect an order on time
• Allergies not disclosed at the time of ordering

4. How Refunds Are Processed
Approved refunds will be issued to the original payment method and may take 3–7 working days to appear, depending on your bank.

5. Contact for Refunds
Please contact us with your order number and details:
📧 Email: bitesofblissbob@gmail.com`;

const ALLERGEN_CONTENT = `⚠️ Food Allergen Disclaimer
Last updated: [15/12/2025]

Important Allergen Information
At BOB – Bites of Bliss, we prepare food in environments where allergens are present.
Our food may contain or come into contact with:
• Nuts
• Peanuts
• Gluten (wheat)
• Dairy
• Eggs
• Soy
• Sesame
• Mustard
• Sulphites

While we take reasonable steps to reduce cross-contamination, we cannot guarantee that any item is completely allergen-free.

Customer Responsibility
• Customers must inform us of any allergies before placing an order.
• We cannot accept responsibility for allergic reactions where allergies were not declared.

If you have severe allergies, please contact us before ordering.`;

// --- COMPONENT ---

const Footer = () => {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'refund' | 'allergen' | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getModalContent = () => {
    switch (activeModal) {
      case 'terms': return { title: 'Terms & Conditions', content: TERMS_CONTENT, icon: FileText };
      case 'privacy': return { title: 'Privacy Policy', content: PRIVACY_CONTENT, icon: Shield };
      case 'refund': return { title: 'Refund Policy', content: REFUND_CONTENT, icon: RefreshCcw };
      case 'allergen': return { title: 'Allergen Info', content: ALLERGEN_CONTENT, icon: AlertTriangle };
      default: return null;
    }
  };

  const modalData = getModalContent();

  return (
    <>
      <footer className="bg-foreground text-primary-foreground pt-16 pb-8 px-4 md:px-8 border-t border-white/10">
        <div className="container-narrow mx-auto">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <div className="mb-2">
                <img 
                  src="/images/logo.png" 
                  alt="Bites of Bliss" 
                  className="h-16 w-auto rounded-full" 
                />
              </div>
              
              <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
                Bringing the vibrant energy of Indian food fused with English classics to your neighborhood.
              </p>
              {/* Social Icons */}
              <div className="flex gap-4 pt-2">
                <a
                  href="https://www.instagram.com/bob_bitesofbliss?igsh=MWl0bTk1cHFjcXIz&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/share/1EyUhirxEN/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-accent">Quick Links</h4>
              <ul className="space-y-2">
                {/* Page Navigation */}
                {['Home', 'Menu', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                      className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                    >
                      {item}
                    </button>
                  </li>
                ))}
                
                {/* Legal Links */}
                <li className="pt-2">
                  <button onClick={() => setActiveModal('terms')} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('privacy')} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('refund')} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                    Refund Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="lg:col-span-2">
              <h4 className="font-serif text-lg font-semibold mb-6 text-accent">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=119+Gosford+Street,+Coventry,+CV1+5DL" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors text-left"
                  >
                    119 Gosford Street, Coventry, CV1 5DL
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=577+Stoney+Stanton+Rd,+Coventry,+CV6+5ED" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors text-left"
                  >
                    577 Stoney Stanton Rd, Coventry, CV6 5ED
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                  <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <a href="tel:+447350739707" className="hover:text-accent transition-colors">+44 7350 739707</a>
                    <a href="tel:+447825229301" className="hover:text-accent transition-colors">+44 7825 229301</a>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <a href="mailto:bitesofblissbob@gmail.com" className="hover:text-accent transition-colors">
                    bitesofblissbob@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 w-full mb-8"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/40">
            <p>© {new Date().getFullYear()} Bites of Bliss with BOB. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
              <button onClick={() => setActiveModal('allergen')} className="hover:text-red-400 transition-colors flex items-center gap-1 font-bold">
                <AlertTriangle className="w-3 h-3" /> Allergen Info
              </button>
              <button onClick={() => setActiveModal('privacy')} className="hover:text-accent transition-colors">Privacy</button>
              <button onClick={() => setActiveModal('terms')} className="hover:text-accent transition-colors">Terms</button>
              <button onClick={() => setActiveModal('refund')} className="hover:text-accent transition-colors">Refunds</button>
            </div>
          </div>
        </div>
      </footer>

      {/* --- LEGAL MODAL --- */}
      <AnimatePresence>
        {activeModal && modalData && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-background w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col border border-border"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border bg-card/50 rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <modalData.icon className={`w-5 h-5 ${activeModal === 'allergen' ? 'text-red-500' : 'text-accent'}`} />
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {modalData.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Scrollable Text Area */}
              <div className="p-6 overflow-y-auto text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap font-sans">
                {modalData.content}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border bg-card/50 rounded-b-2xl">
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-3 bg-accent text-accent-foreground rounded-xl font-bold hover:bg-yellow-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;