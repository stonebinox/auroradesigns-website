---
name: "OnlyJobs"
tagline: "AI job matching that explains itself."
status: "live"
url: "https://onlyjobs.app"
stack: ["TypeScript", "Next.js", "Tailwind", "MongoDB", "OpenAI"]
summary: "Scrapes 30+ job sources every day into a normalized index, scores every role against your profile, and generates a plain-language reason for each match — so you see why a role fits, not just that it did. Live in beta."
order: 1
---

OnlyJobs runs a daily multi-source scraper that collects listings from 30+ job boards and company career pages. Each listing is normalized into a shared schema: title, company, location, compensation, responsibilities, and required skills. Deduplication runs across sources so each unique role appears once.

The scoring layer takes a candidate profile — skills, experience level, preferences, and target role — and runs each normalized listing through an LLM ranking step. The model scores relevance across multiple dimensions and produces a structured output that drives the ranked feed. Alongside the score, it generates a short plain-language explanation tied to specific profile attributes, so candidates understand exactly why a role ranked where it did.

The system is deployed across Netlify (frontend), Render (API layer), and Fly.io (scraper workers), with MongoDB as the primary datastore. The scraper workers run on a scheduled interval with retry logic and source-health monitoring.
