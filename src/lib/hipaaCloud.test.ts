/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { checklist, checklistProgress } from "./hipaaCloud";

describe("HIPAA checklist progress", () => {
  test("starts with sixteen unreviewed items", () => {
    expect(checklistProgress([])).toEqual({ reviewed: 0, total: 16, remaining: 16 });
  });
  test("only counts each valid item once", () => {
    expect(checklistProgress(["baa", "baa", "unknown"])).toEqual({ reviewed: 1, total: 16, remaining: 15 });
  });
  test("all items reviewed has zero remaining", () => {
    const ids = checklist.sections.flatMap(section => section.items.map(item => item.id));
    expect(new Set(ids).size).toBe(16);
    expect(checklistProgress(ids)).toEqual({ reviewed: 16, total: 16, remaining: 0 });
  });
});