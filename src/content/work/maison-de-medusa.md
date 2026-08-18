---
title: "A booking platform and AI operations layer for a boutique wellness studio"
client: "Maison de Medusa"
industry: "Boutique wellness"
year: 2026
role: "Forward-deployed engineering"
stack: ["TypeScript", "Vite", "Tailwind", "Claude", "MongoDB"]
tags: ["AI agents", "Booking systems", "Internal tooling"]
summary: "The full customer-facing website plus an admin platform for bookings and operations, with an AI layer the team runs by plain chat — managing 90+ members with a single admin instead of a larger ops team."
metrics:
  - label: "Members managed"
    value: "90+"
  - label: "Ops team"
    value: "1 admin + AI"
url: "https://maisondemedusa.com"
featured: false
order: 1
---

## Context

Maison de Medusa is a luxury Reformer Pilates studio and European tea room in Bangalore, run by a small team across four instructors and a six-person cafe side. Coordinating instructor schedules, member and class bookings, slot management, payments, client messaging, and cafe operations needed more than a patchwork of off-the-shelf tools.

## Approach

Aurora embedded and built the whole system: the customer-facing website and an admin dashboard that handles instructor bookings, member bookings, and slot management. On top of it runs Medusa AI, a Claude-powered assistant the team drives in plain chat — to manage clients, take internal actions, and read internal operations, supply-chain, and billing trends. It ties together the tools the business already runs on: Razorpay for payments, the WhatsApp API for client communication, Zomato and Swiggy for the cafe, and Meta for marketing. The stack is TypeScript, Vite, and Tailwind on the front, MongoDB for data, and Claude for the AI layer, hosted on Netlify and Render.

## Outcome

The platform is live and in daily use. One admin, working alongside Medusa AI, manages 90+ members, four instructors, and a six-person cafe team — work that would otherwise have meant hiring a larger operations team. Bookings and operations run from one place, and the team handles client and internal actions conversationally instead of navigating dashboards.
