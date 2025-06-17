<p align="center">
  <a href="https://skedy.io/">
    <img width="200" src="https://skedy.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FSkedyLogo.038dc846.png&w=1080&q=75" alt="Skedy Logo">
  </a>
</p>

<h3 align="center">
  Skedy is an AI WhatsApp agent that helps service businesses with quoting, booking, and calendar management
</h3>



<p align="center">
 The best way to save costs in customer service and have higher customer service ratings.
</p>

<p align="center">
  <a href="#features"><strong>Reduce costs</strong></a> ·
  <a href="#demo"><strong>Instant Customer Service</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Any language</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Customisable</strong></a> ·
  <a href="#feedback-and-issues"><strong>Scalable</strong></a>
</p>
<br/>

## Features

  - AI WhatsApp agent 24/7
  - Booking management from whatsapp or from a website
  - Uber-like dynamic quoting
  - Calendar Management

## Demo

You can view a fully working demo at [skedy.io](https://skedy.io/).

## Multi-Intent Refactor

The codebase is being restructured to support multiple intents per user message and a more flexible conversation flow.  Phase 1 introduces a new module skeleton under `src/agent` which will house the future architecture:

```
src/agent/
  preprocessor/        // normalizes incoming text
  context/             // stores conversation history
  intent-classifier/   // detects multiple intents
  state-manager/       // tracks active goals and slots
  tasks/               // intent specific handlers
  llm-response/        // combines outputs using LLM
  whatsapp-renderer/   // formats responses for WhatsApp
```

These folders currently contain placeholder implementations and will be expanded in later phases.
