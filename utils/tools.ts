export function priceFormatter(price?: number | string, currency?: string) {
  if (!price) return "";
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${
    currency ? currency : ""
  }`;
}

export function getNextDateString(date = new Date(), days = 1): string {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split("T")[0] as string;
}

// that function return only start and end dates in massive
export function getDateRangeString(
  endDate: string | Date = new Date(),
  days = 1
): [string, string] {
  const end = new Date(endDate);
  const start = new Date(end);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  start.setDate(end.getDate() - days);

  return [
    start.toISOString().split("T")[0] as string,
    end.toISOString().split("T")[0] as string,
  ];
}
