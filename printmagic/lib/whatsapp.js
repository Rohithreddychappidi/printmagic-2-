import { SHOP } from "./constants";

/**
 * Builds a wa.me deep link pre-filled with a message listing the
 * products the customer picked. This is the entire "checkout" flow —
 * there is no cart/payment, just a handoff to a real conversation.
 */
export function buildWhatsAppLink(items, { note } = {}) {
  const list = Array.isArray(items) ? items : [items];

  const lines = [
    `Hi PrintMagic! I'd like to enquire about:`,
    "",
    ...list.map((item, i) => {
      const price = item.price ? ` — ₹${item.price}` : "";
      return `${i + 1}. ${item.name}${price}`;
    }),
  ];

  if (note) {
    lines.push("", note);
  }

  const message = lines.join("\n");
  return `https://wa.me/${SHOP.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

export function buildGeneralEnquiryLink() {
  return `https://wa.me/${SHOP.whatsappNumber}?text=${encodeURIComponent(
    "Hi PrintMagic! I'd like to know more about your customized gifts."
  )}`;
}
