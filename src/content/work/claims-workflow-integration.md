---
title: "Claims workflows connected without a platform rewrite"
client: "Confidential"
industry: "Insurance"
year: 2025
role: "Forward-deployed engineering"
stack: ["Python", "FastAPI", "Kafka", "Postgres"]
tags: ["Integrations", "Backend systems"]
summary: "Event-driven integration that automated three claims workflows across legacy systems."
metrics:
  - label: "Workflows automated"
    value: "3"
  - label: "Saved per release"
    value: "2 days"
featured: false
order: 2
---

<!-- PLACEHOLDER case study — replace with real content -->

## Context

Three high-volume claims workflows required manual coordination between a legacy mainframe and two newer processing systems. Each release cycle included two days of manual data reconciliation, creating a recurring bottleneck and a source of processing errors.

## Approach

Aurora embedded with the operations engineering team and designed a Kafka-based event bridge that sat between the existing systems without requiring changes to the mainframe. FastAPI services handled translation and routing, with Postgres tracking workflow state and providing a reconciliation audit log.

## Outcome

All three workflows automated successfully without touching the legacy platform. The two-day manual reconciliation step was eliminated from each release cycle. The event-driven architecture also gave the team a foundation for connecting additional systems without further integration work.
