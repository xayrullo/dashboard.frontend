export function priceFormatter(price?: number | string, currency?: string) {
  if (!price) return "";
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${
    currency ? currency : ""
  }`;
}
