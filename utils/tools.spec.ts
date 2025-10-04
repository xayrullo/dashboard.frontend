import { describe, it, expect, vi } from "vitest";
import {
  priceFormatter,
  getNextDateString,
  formatLocalDate,
  getDateRangeString,
} from "./tools";

// --- priceFormatter ---
describe("priceFormatter", () => {
  it("should format numbers with spaces", () => {
    expect(priceFormatter(1000)).toBe("1 000 ");
    expect(priceFormatter(1234567)).toBe("1 234 567 ");
  });

  it("should append currency if provided", () => {
    expect(priceFormatter(1000, "$")).toBe("1 000 $");
    expect(priceFormatter(2000000, "USD")).toBe("2 000 000 USD");
  });

  it("should handle string numbers", () => {
    expect(priceFormatter("5000", "€")).toBe("5 000 €");
  });

  it("should return empty string if price is undefined or 0", () => {
    expect(priceFormatter()).toBe("");
    expect(priceFormatter(0)).toBe("");
    expect(priceFormatter("")).toBe("");
  });
});

// --- getNextDateString ---
describe("getNextDateString", () => {
  it("should return next day string by default", () => {
    const today = new Date("2025-10-04T10:00:00.000Z");
    const result = getNextDateString(today);
    expect(result).toBe("2025-10-05"); // +1 day
  });

  it("should support negative days", () => {
    const today = new Date("2025-10-04T10:00:00.000Z");
    const result = getNextDateString(today, -1);
    expect(result).toBe("2025-10-03");
  });

  it("should return today if days = 0", () => {
    const today = new Date("2025-10-04T10:00:00.000Z");
    expect(getNextDateString(today, 0)).toBe("2025-10-04");
  });
});

// --- formatLocaleDate ---
describe("formatLocalDate", () => {
  it("should format a normal date correctly", () => {
    const d = new Date(2025, 9, 4); // months are 0-indexed, so 9 = October
    expect(formatLocalDate(d)).toBe("2025-10-04");
  });

  it("should pad single-digit month and day with leading zero", () => {
    const d = new Date(2025, 0, 5); // Jan 5, 2025
    expect(formatLocalDate(d)).toBe("2025-01-05");
  });

  it("should format end of year date correctly", () => {
    const d = new Date(2025, 11, 31); // Dec 31, 2025
    expect(formatLocalDate(d)).toBe("2025-12-31");
  });

  it("should format beginning of year date correctly", () => {
    const d = new Date(2025, 0, 1); // Jan 1, 2025
    expect(formatLocalDate(d)).toBe("2025-01-01");
  });

  it("should respect leap years", () => {
    const d = new Date(2024, 1, 29); // Feb 29, 2024
    expect(formatLocalDate(d)).toBe("2024-02-29");
  });

  it("should handle single-digit day", () => {
    const d = new Date(2025, 5, 7); // June 7, 2025
    expect(formatLocalDate(d)).toBe("2025-06-07");
  });
});

// --- getDateRangeString ---
describe("getDateRangeString", () => {
  it("should return start and end date correctly", () => {
    const endDate = new Date("2025-10-04T10:00:00.000Z");
    const [start, end] = getDateRangeString(endDate, 7);

    expect(start).toBe("2025-09-27"); // 7 days before
    expect(end).toBe("2025-10-04");
  });

  it("should accept string as endDate", () => {
    const [start, end] = getDateRangeString("2025-10-04", 1);
    expect(start).toBe("2025-10-03");
    expect(end).toBe("2025-10-04");
  });

  it("should handle days = 0", () => {
    const [start, end] = getDateRangeString("2025-10-04", 0);
    expect(start).toBe("2025-10-04");
    expect(end).toBe("2025-10-04");
  });
});
