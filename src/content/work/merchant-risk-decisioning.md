---
title: "A decisioning service for merchant risk teams"
client: "Confidential"
industry: "Fintech"
year: 2024
role: "Backend architecture"
stack: ["TypeScript", "Node.js", "Postgres", "OpenTelemetry"]
tags: ["Backend", "Observability"]
summary: "A low-latency decisioning service that unified five risk-signal sources behind one API."
metrics:
  - label: "Decision path"
    value: "<300 ms"
  - label: "Sources unified"
    value: "5"
featured: true
order: 3
---

<!-- PLACEHOLDER case study — replace with real content -->

## Context

The merchant risk team was querying five separate signal sources at decision time, each with its own client library and latency profile. Decisions were slow, error handling was inconsistent, and adding a new signal source required changes across multiple services.

## Approach

Aurora designed a single decisioning service in TypeScript that owned all five integrations behind a unified API. Concurrent fan-out to each source kept end-to-end latency under 300 milliseconds. OpenTelemetry instrumentation gave the risk team full visibility into per-source latency and failure rates for the first time.

## Outcome

The decisioning service shipped and became the single integration point for all risk logic downstream. Decision latency was consistent and within target on the critical path. The observability layer surfaced two previously unknown source reliability issues within the first week of production traffic.
