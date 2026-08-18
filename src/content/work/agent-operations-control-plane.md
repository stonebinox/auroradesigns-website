---
title: "An agent control plane for support operations"
client: "Confidential"
industry: "B2B SaaS"
year: 2025
role: "Forward-deployed engineering"
stack: ["TypeScript", "MCP", "Postgres", "Temporal"]
tags: ["AI agents", "Platform engineering"]
summary: "A control plane that let support teams run approved AI agents against four internal systems."
metrics:
  - label: "To production"
    value: "6 weeks"
  - label: "Systems connected"
    value: "4"
featured: true
order: 1
---

<!-- PLACEHOLDER case study — replace with real content -->

## Context

The support team relied on four separate internal systems to resolve escalations, with no unified interface. Manual handoffs between systems created delays and made consistent resolution difficult to scale across a growing customer base.

## Approach

Aurora embedded with the platform team to design a control plane built on the Model Context Protocol. Approved agent workflows were modelled as typed operations with explicit access policies, and Temporal handled durable execution across all four connected systems with full audit trails.

## Outcome

The control plane reached production in six weeks. Support teams could run approved agents from a single interface without switching contexts. Manual escalation steps were eliminated across the most common resolution paths, and every agent action was logged and attributable.
