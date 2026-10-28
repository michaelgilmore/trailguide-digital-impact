/// <reference types="bun" />
import { expect, test } from "bun:test";
import { clearanceStages, roadmapProgress } from "./clearanceRoadmap";

test("initial roadmap starts with product definition and seven stages", () => {
  const result = roadmapProgress([]);
  expect(result.count).toBe(0);
  expect(result.total).toBe(7);
  expect(result.next?.id).toBe("define");
});
test("next stage is the earliest unreviewed milestone", () => {
  const result = roadmapProgress(["define", "design", "define", "unknown"]);
  expect(result.count).toBe(2);
  expect(result.next?.id).toBe("plan");
});
test("reviewing all milestones leaves no next stage", () => {
  const result = roadmapProgress(clearanceStages.map(stage => stage.id));
  expect(result.count).toBe(7);
  expect(result.next).toBeUndefined();
});