export function formatPhoneNumber(phone: string) {
  if (!phone) return "";

  if (phone.startsWith("+98")) {
    return phone;
  }

  if (phone.startsWith("09")) {
    return phone.replace(/^0/, "+98");
  }

  if (phone.startsWith("9")) {
    return "+98" + phone;
  }

  return phone;
}
