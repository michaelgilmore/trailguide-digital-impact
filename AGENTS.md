# Architecture rules

- Keep tools as dedicated pages under `src/pages/tools`, registered in the app and Tools hub, so each can be delivered independently.
- Keep assessment questions and scoring in pure modules under `src/lib` with adjacent Bun tests so guidance can be verified independently of presentation.
- AI readiness is an anonymous, in-memory self-assessment, not a compliance determination; do not transmit or persist answers without an explicit requirement.