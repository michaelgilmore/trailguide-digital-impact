export const clearanceStages = [
  {
    id: "define", title: "Define the product & regulatory path", summary: "Start with intended use, claims, users, and the evidence your product will need.",
    activities: ["Document intended use, indications, target users, patient population, clinical setting, and proposed claims.", "Assess device status, classification, jurisdictions, and potential pathway with qualified regulatory advisors. Consider FDA interaction when key questions remain."],
    deliverables: ["Intended-use and claims baseline", "Regulatory strategy and evidence gaps", "Initial stakeholder and clinical workflow map"],
    gate: "The team has an agreed scope and a justified regulatory strategy; unresolved questions have owners.",
    ai: "Define the model’s role in clinical decisions, human oversight, target population, and limits of use.",
    tool: { label: "AI/ML readiness check", href: "/tools/ai-ml-readiness" },
  },
  {
    id: "plan", title: "Plan the lifecycle & quality system", summary: "Build quality and traceability into your plan, not into a last-minute document sprint.",
    activities: ["Determine applicable quality-system obligations, standards, and software safety classification. FDA’s QMSR became effective February 2, 2026; assess applicability rather than assuming every software product has identical obligations.", "Assign owners, review gates, configuration management, supplier oversight, and problem-resolution processes."],
    deliverables: ["Software development and maintenance plans", "Risk-management plan and safety-class rationale", "Quality-system and supplier responsibility map"],
    gate: "Applicable lifecycle activities, responsibilities, records, and review criteria are defined.",
    ai: "Define dataset and model versioning, data governance, training controls, and update responsibilities.",
    tool: { label: "IEC 62304 safety class quiz", href: "/tools/iec-62304-safety-class" },
  },
  {
    id: "design", title: "Specify requirements, risks & architecture", summary: "Turn user needs into testable requirements and defensible design decisions.",
    activities: ["Analyze foreseeable hazards, cybersecurity threats, privacy obligations, usability risks, and interfaces. Define controls and measurable acceptance criteria.", "Document architecture, data flows, third-party software/SOUP, segregation where needed, and links between risks, requirements, and design."],
    deliverables: ["Software requirements and architecture", "Risk analysis and cybersecurity evidence plan", "Traceability baseline and verification criteria"],
    gate: "Requirements are testable, controls have verification plans, and critical design risks are addressed.",
    ai: "Prespecify clinically meaningful metrics, evaluation cohorts, subgroup analyses, leakage controls, and performance thresholds.",
    tool: { label: "Planning and traceability templates", href: "/tools/templates" },
  },
  {
    id: "build", title: "Implement & integrate under control", summary: "Keep the code, configuration, and evidence aligned as the product evolves.",
    activities: ["Implement with review, controlled baselines, automated checks, unit and integration verification, and change-impact assessment.", "Track dependencies, vulnerabilities, anomalies, risk-control implementation, and evidence appropriate to the product and its obligations."],
    deliverables: ["Controlled software and configuration baseline", "Unit and integration verification records", "Dependency inventory, anomaly log, and updated traceability"],
    gate: "The integrated baseline is reproducible, risk controls are implemented, and known issues are assessed.",
    ai: "Record training configurations and dataset provenance; lock model versions and keep independent evaluation data separate.",
    tool: { label: "Cloud safeguard checklist", href: "/tools/hipaa-cloud-checklist" },
  },
  {
    id: "validate", title: "Verify, validate & assemble evidence", summary: "Demonstrate that the product meets requirements and its intended use.",
    activities: ["Execute system verification and appropriate validation, including usability, cybersecurity, and clinical evaluation as applicable.", "Review traceability, deviations, unresolved anomalies, residual risks, and the evidence supporting claims. Clinical studies are not universally required; determine the appropriate evidence for your product."],
    deliverables: ["Verification and validation reports", "Clinical/performance evidence and usability results as applicable", "Risk-control verification and release-readiness review"],
    gate: "Acceptance criteria are met or deviations are justified, and remaining risks and limitations are reviewed.",
    ai: "Evaluate the locked model independently, report uncertainty and subgroup/site performance, and investigate clinically significant failure modes.",
    tool: { label: "AI evaluation plan template", href: "/tools/templates" },
  },
  {
    id: "submit", title: "Submit & respond, when required", summary: "Organize a coherent submission around your pathway and supporting evidence.",
    activities: ["Determine the required submission content and FDA software documentation level; this is distinct from the IEC 62304 software safety class.", "Submit through the applicable process, coordinate responses, and control changes during review. A 510(k) may receive clearance, a De Novo request may be granted, and a PMA may receive approval. Some devices are exempt from premarket submission, subject to applicable limits and other obligations."],
    deliverables: ["Pathway-appropriate submission and labeling", "Software documentation and supporting evidence package", "Review correspondence and response/change log"],
    gate: "The applicable regulatory outcome and any conditions are documented before marketing activities that require authorization.",
    ai: "Describe model development and evaluation evidence, limitations, and update strategy; assess whether a predetermined change control plan is appropriate.",
    tool: { label: "Discuss your submission plan", href: "/contact" },
  },
  {
    id: "maintain", title: "Release, monitor & manage changes", summary: "Patient impact depends on a controlled release and a sustainable lifecycle.",
    activities: ["Complete release approvals, deployment checks, labeling/training, support readiness, and relevant registration/listing obligations.", "Monitor complaints, safety signals, vulnerabilities, and operational performance. Assess reporting obligations and whether changes require additional verification or a new submission."],
    deliverables: ["Approved release baseline and deployment records", "Monitoring, incident response, and maintenance arrangements", "Change-impact assessments and postmarket records"],
    gate: "Owners can detect problems, respond, roll back where appropriate, and evaluate changes before release.",
    ai: "Monitor drift and real-world performance, investigate subgroup effects, and control model updates within the applicable regulatory strategy.",
    tool: { label: "Review cloud operations", href: "/tools/hipaa-cloud-checklist" },
  },
] as const;

export function roadmapProgress(reviewedIds: readonly string[]) {
  const reviewed = new Set(reviewedIds);
  const count = clearanceStages.filter(stage => reviewed.has(stage.id)).length;
  const next = clearanceStages.find(stage => !reviewed.has(stage.id));
  return { count, total: clearanceStages.length, next };
}