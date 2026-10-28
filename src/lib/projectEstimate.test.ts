/// <reference types="bun" />
import { expect, test } from "bun:test";
import { calculateProjectEstimate } from "./projectEstimate";

const base = { lowHours: 40, highHours: 80, hourlyRate: 150, contingency: 0, extras: [] };
test("labor is effort multiplied by the visitor's hourly rate", () => {
  const result = calculateProjectEstimate(base);
  expect(result.lowTotal).toBe(6000);
  expect(result.highTotal).toBe(12000);
});
test("contingency is added once to each labor bound", () => {
  const result = calculateProjectEstimate({ ...base, contingency: 20 });
  expect(result.lowReserve).toBe(1200);
  expect(result.highReserve).toBe(2400);
  expect(result.lowTotal).toBe(7200);
  expect(result.highTotal).toBe(14400);
});
test("selected extras add hours once and ignore unknown identifiers", () => {
  const result = calculateProjectEstimate({ ...base, extras: ["integration", "integration", "unknown"] });
  expect(result.lowHours).toBe(80);
  expect(result.highHours).toBe(180);
  expect(result.lowTotal).toBe(12000);
  expect(result.highTotal).toBe(27000);
});
test("all extras are included in the labor and reserve calculation", () => {
  const result = calculateProjectEstimate({ ...base, extras: ["integration", "ai", "evidence"], contingency: 10 });
  expect(result.lowHours).toBe(240);
  expect(result.highHours).toBe(540);
  expect(result.lowTotal).toBe(39600);
  expect(result.highTotal).toBe(89100);
});
test("rejects missing rate, inverted hours, nonfinite values and invalid contingency", () => {
  expect(() => calculateProjectEstimate({ ...base, hourlyRate: 0 })).toThrow();
  expect(() => calculateProjectEstimate({ ...base, highHours: 20 })).toThrow();
  expect(() => calculateProjectEstimate({ ...base, lowHours: NaN })).toThrow();
  expect(() => calculateProjectEstimate({ ...base, contingency: 101 })).toThrow();
  expect(() => calculateProjectEstimate({ ...base, contingency: -1 })).toThrow();
});