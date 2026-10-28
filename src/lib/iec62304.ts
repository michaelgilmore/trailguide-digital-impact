// IEC 62304:2006+A1:2015 software safety classification (clause 4.3)
export type SafetyClass = "A" | "B" | "C";
export type Harm = "none" | "non-serious" | "serious";

export interface SafetyAnswers {
  canContributeToHazard: boolean;
  externalControlsEliminateHarm: boolean;
  worstHarm: Harm;
}

export function classifySoftware(a: SafetyAnswers): SafetyClass {
  if (!a.canContributeToHazard) return "A";
  if (a.externalControlsEliminateHarm) return "A";
  if (a.worstHarm === "serious") return "C";
  if (a.worstHarm === "non-serious") return "B";
  return "A";
}

export const classDeliverables: Record<SafetyClass, { summary: string; docs: string[] }> = {
  A: {
    summary: "No injury or damage to health is possible. Lightest documentation burden.",
    docs: [
      "Software development plan (5.1)",
      "Software requirements specification (5.2)",
      "Software system testing (5.7)",
      "Software release & configuration management (5.8, 8)",
      "Software maintenance plan (6)",
      "Risk management per ISO 14971 (7)",
      "Problem resolution process (9)",
    ],
  },
  B: {
    summary: "Non-serious injury is possible. Architecture and unit verification are required.",
    docs: [
      "Everything required for Class A",
      "Software architectural design (5.3)",
      "Software unit implementation & verification (5.5)",
      "Software integration & integration testing (5.6)",
      "SOUP identification and requirements",
      "Segregation of software items for risk control",
    ],
  },
  C: {
    summary: "Death or serious injury is possible. Full rigor at every level.",
    docs: [
      "Everything required for Class B",
      "Detailed design for each software unit (5.4)",
      "Additional unit acceptance criteria (5.5.4)",
      "Expanded verification of interfaces and boundary conditions",
      "Rigorous traceability: hazards → requirements → design → tests",
    ],
  },
};
