# Architecture rules

- Keep tools as dedicated pages under `src/pages/tools`, registered in the app and Tools hub, so each can be delivered independently.
- Keep assessment questions and scoring in pure modules under `src/lib` with adjacent Bun tests so guidance can be verified independently of presentation.
- AI readiness is an anonymous, in-memory self-assessment, not a compliance determination; do not transmit or persist answers without an explicit requirement.
- Keep the HIPAA cloud checklist content in a shared JSON source for the web tool and prebuilt PDF; regenerate the public download with `scripts/generate-hipaa-checklist.py` when content changes to avoid drift.
- HIPAA checklist selections are in-memory review tracking, not compliance scoring; serve the blank PDF from `public/downloads` without transmitting visitor answers.
- Keep template descriptions and outlines in a shared catalog; regenerate editable DOCX/CSV files in `public/downloads/templates` with `scripts/generate-templates.py` when content changes so previews and downloads stay aligned.
- Keep clearance-roadmap milestones and progress logic in a pure module; review marks track reading in memory only and never represent FDA authorization or completed development.