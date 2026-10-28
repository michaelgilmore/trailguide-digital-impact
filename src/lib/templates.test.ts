/// <reference types="bun" />
import { expect, test } from "bun:test";
import { filterTemplates, templates } from "./templates";

test("category selection excludes other categories", () => {
  expect(filterTemplates("", "Medical device").map(template => template.id)).toEqual(["software-development-plan", "traceability-matrix", "risk-register"]);
});
test("search is case-insensitive and includes document sections", () => {
  expect(filterTemplates("  DRIFT  ", "AI / ML").map(template => template.id)).toEqual(["model-evaluation-plan"]);
});
test("search and category filters both apply", () => {
  expect(filterTemplates("traceability", "Planning")).toEqual([]);
});
test("an empty search returns all six templates", () => {
  expect(filterTemplates(" ", "All")).toHaveLength(6);
  expect(new Set(templates.map(template => template.filename)).size).toBe(6);
});