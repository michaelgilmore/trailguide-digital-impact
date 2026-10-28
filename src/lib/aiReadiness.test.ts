/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { assessReadiness } from "./aiReadiness";

describe("AI readiness self-assessment", () => {
  test("requires all eight answers", () => {
    expect(() => assessReadiness([2, 2])).toThrow();
  });
  test("unknown or not started answers score zero and expose every gap", () => {
    const result = assessReadiness([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(result.score).toBe(0);
    expect(result.stage).toBe("Build your foundation");
    expect(result.gaps).toHaveLength(8);
  });
  test("work in progress gets half credit", () => {
    const result = assessReadiness([1, 1, 1, 1, 1, 1, 1, 1]);
    expect(result.score).toBe(50);
    expect(result.stage).toBe("Close the gaps");
  });
  test("documented and reviewed answers get full credit", () => {
    const result = assessReadiness([2, 2, 2, 2, 2, 2, 2, 2]);
    expect(result.score).toBe(100);
    expect(result.stage).toBe("Advance your evidence");
    expect(result.gaps).toHaveLength(0);
  });
  test("unstarted gaps take priority even with a high total score", () => {
    const result = assessReadiness([2, 2, 2, 2, 0, 2, 2, 1]);
    expect(result.score).toBe(81);
    expect(result.gaps.map(gap => gap.id)).toEqual(["risk", "operations"]);
  });
});