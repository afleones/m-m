export function buildWhatsAppLink(phone: string, message: string): string {
  const sanitizedPhone = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
}
