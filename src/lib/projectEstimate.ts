export const projectPresets = [
  { id: "discovery", label: "Technical discovery", description: "A bounded assessment, options, and delivery plan—not implementation.", low: 40, high: 80 },
  { id: "application", label: "Healthcare application", description: "A focused application increment with defined workflows—not a complete enterprise platform.", low: 240, high: 480 },
  { id: "device", label: "Medical device software", description: "A bounded software increment and its engineering evidence—not a complete device submission.", low: 400, high: 800 },
  { id: "cloud", label: "Cloud architecture & delivery", description: "A scoped architecture review and infrastructure increment—not ongoing hosting or operations.", low: 120, high: 240 },
] as const;

export const estimateExtras = [
  { id: "integration", label: "External system integration", detail: "One defined API or data interface; vendor access assumed.", low: 40, high: 100 },
  { id: "ai", label: "AI/ML evaluation work", detail: "A bounded model evaluation; usable data and a model assumed.", low: 80, high: 200 },
  { id: "evidence", label: "Additional regulated-product evidence", detail: "Additional documentation and traceability; excludes agency fees and clinical studies.", low: 80, high: 160 },
] as const;

export interface EstimateInputs {
  lowHours: number;
  highHours: number;
  hourlyRate: number;
  contingency: number;
  extras: readonly string[];
}

export function calculateProjectEstimate(input: EstimateInputs) {
  if (![input.lowHours, input.highHours, input.hourlyRate, input.contingency].every(Number.isFinite)
    || input.lowHours <= 0 || input.highHours < input.lowHours || input.highHours > 100000
    || input.hourlyRate <= 0 || input.hourlyRate > 10000 || input.contingency < 0 || input.contingency > 100) {
    throw new Error("Enter valid hours, a positive hourly rate, and a contingency from 0 to 100%.");
  }
  const selected = estimateExtras.filter(extra => input.extras.includes(extra.id));
  const lowHours = input.lowHours + selected.reduce((sum, extra) => sum + extra.low, 0);
  const highHours = input.highHours + selected.reduce((sum, extra) => sum + extra.high, 0);
  const lowLabor = lowHours * input.hourlyRate;
  const highLabor = highHours * input.hourlyRate;
  const lowReserve = lowLabor * input.contingency / 100;
  const highReserve = highLabor * input.contingency / 100;
  return { lowHours, highHours, lowLabor, highLabor, lowReserve, highReserve,
    lowTotal: lowLabor + lowReserve, highTotal: highLabor + highReserve, selected };
}