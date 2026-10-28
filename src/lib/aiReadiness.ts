export type ReadinessAnswer = 0 | 1 | 2;

export const readinessQuestions = [
  {
    id: "intended-use", title: "Intended use & clinical context",
    question: "How clearly have you defined what your AI will do and who will use it?",
    detail: "Include the patient population, setting, user, and role in clinical decisions.",
    action: "Document intended use, target users, patient population, clinical setting, and foreseeable misuse before selecting a model.",
  },
  {
    id: "data", title: "Data quality & access",
    question: "How ready is your data for development and evaluation?",
    detail: "Consider access rights, provenance, label quality, missing data, and representative populations.",
    action: "Audit data rights, provenance, label quality, and population coverage; separate training, tuning, and test data to prevent leakage.",
  },
  {
    id: "validation", title: "Clinical & technical validation",
    question: "Do you have a validation plan tied to the intended use?",
    detail: "Include meaningful performance targets, independent evaluation, and relevant clinical evidence.",
    action: "Define acceptance criteria, independent test cohorts, clinical endpoints, and an evidence plan appropriate to the intended use.",
  },
  {
    id: "bias", title: "Bias & generalizability",
    question: "Have you planned how to evaluate performance across patient groups and sites?",
    detail: "Consider age, sex, race and ethnicity where appropriate, disease severity, and care settings.",
    action: "Specify subgroup and site-level evaluations, minimum sample sizes, and a plan to address material performance differences.",
  },
  {
    id: "risk", title: "Patient safety & human oversight",
    question: "Have you addressed unsafe outputs and the role of human review?",
    detail: "Consider errors, uncertainty, automation bias, escalation, and safe fallback behavior.",
    action: "Analyze potential harms, define human oversight and escalation, and test uncertainty handling and safe fallback behavior.",
  },
  {
    id: "regulatory", title: "Regulatory & quality planning",
    question: "Have you assessed applicable requirements and the evidence you will need?",
    detail: "Consider whether the product is a medical device, relevant jurisdictions, and quality-system needs.",
    action: "Assess device status and applicable jurisdictions with qualified advisors, then map development records and evidence to relevant requirements.",
  },
  {
    id: "privacy", title: "Privacy & security",
    question: "Have you planned safeguards for patient data and model access?",
    detail: "Consider applicable privacy obligations, vendor agreements, access controls, and threat modeling.",
    action: "Map sensitive-data flows, assess applicable privacy obligations and vendor agreements, and define access controls and security testing.",
  },
  {
    id: "operations", title: "Deployment & lifecycle monitoring",
    question: "Do you have a plan to monitor, update, and roll back the model?",
    detail: "Include drift, performance changes, incident response, versioning, and change control.",
    action: "Define monitoring thresholds, accountable owners, incident response, rollback, and controlled model updates; assess whether a change-control plan is applicable.",
  },
] as const;

export function assessReadiness(answers: readonly ReadinessAnswer[]) {
  if (answers.length !== readinessQuestions.length || answers.some(a => a !== 0 && a !== 1 && a !== 2)) {
    throw new Error("Answer every readiness question before viewing results.");
  }
  const score = Math.round(answers.reduce<number>((sum, answer) => sum + answer, 0) / (readinessQuestions.length * 2) * 100);
  const stage = score < 50 ? "Build your foundation" : score < 80 ? "Close the gaps" : "Advance your evidence";
  const gaps = readinessQuestions.map((question, index) => ({ ...question, answer: answers[index] }))
    .filter(question => question.answer < 2)
    .sort((a, b) => a.answer - b.answer);
  return { score, stage, gaps };
}