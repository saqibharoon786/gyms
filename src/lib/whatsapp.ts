export const WHATSAPP_NUMBER = "923170570415";
export const WHATSAPP_DISPLAY = "+92 317 0570415";
export const waLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
