---
name: "OnlyMoney"
tagline: "An AI-native personal finance system."
status: "private"
stack: ["TypeScript", "Vite", "MongoDB", "Claude", "OpenAI (voice)", "Electron"]
summary: "Ingests connected financial accounts through data connectors, normalizes them into event pipelines, and runs a governed analysis layer that flags anomalies, evaluates rules, and surfaces patterns with traceable, AI-assisted explanations. In private beta; browser and desktop apps planned."
order: 2
---

The ingestion layer connects to financial accounts through a set of data connectors. Each connector produces a normalized stream of financial events in a shared schema, abstracting away the structural differences between providers. Events flow into a pipeline that handles deduplication, ordering, and schema enforcement before they reach the storage layer.

On top of the normalized event stream, a policy and rules engine evaluates configurable conditions: categorization rules, threshold conditions, and anomaly detection. Anomaly detection compares incoming event patterns against historical baselines and flags deviations for review. The rules engine is declarative — conditions and actions are defined separately from the evaluation runtime.

The analysis layer uses Claude for structured reasoning over account data and OpenAI's voice interface for spoken queries and summaries. Both integrations are governed: the models receive a bounded, curated view of account state rather than raw access, and their outputs include traceable citations so every conclusion can be traced back to specific events or rules that produced it.

The desktop client is built with Electron, sharing a TypeScript codebase with the browser app. Both targets are in active development as part of the private beta.
