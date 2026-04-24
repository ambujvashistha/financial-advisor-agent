# AI Portfolio Intelligence Agent

AI Portfolio Intelligence Agent is a financial portfolio analysis system built to simulate how an institutional market reasoning engine explains portfolio movement using market data, sector exposure, news causality, risk signals, and portfolio intelligence.

The system combines a Node.js backend reasoning engine with a production-ready Next.js frontend dashboard to create an end-to-end financial advisor experience.

It is designed to answer one core question:

Why did this portfolio move?

Instead of only showing numbers, the system provides reasoning, confidence scoring, sector impact analysis, top drivers, portfolio health evaluation, and actionable recommendations.

---

# Problem Statement

Traditional portfolio dashboards show data but fail to explain the reason behind portfolio movement.

Investors often see:

- Portfolio gain or loss
- Sector allocation
- Market performance

but they do not get:

- Root cause analysis
- News-driven explanations
- Sector causality detection
- Risk intelligence
- Clear recommendations

This project solves that by building an AI-powered reasoning engine that converts raw financial data into understandable portfolio intelligence.

---

# Core Features

## Portfolio Profile Selection

Users can select between multiple portfolio profiles:

- Conservative
- Balanced
- Aggressive

Each profile represents a different investment strategy and risk appetite.

---

## AI-Powered Analysis Engine

The backend performs complete reasoning flow:

- Portfolio exposure calculation
- Sector mapping
- Market movement analysis
- News causality detection
- Conflict detection
- Impact score calculation
- Top driver identification
- Portfolio health evaluation
- Risk recommendation generation

---

## Causal Reasoning System

The system does not blindly trust market movement.

It verifies whether market movement is actually supported by relevant positive or negative news.

This helps avoid false signals and improves reasoning confidence.

Example:

Technology sector rising + positive earnings news  
→ strong causal confidence

Technology sector rising + negative news  
→ conflict detected

---

## Top Driver Detection

The engine identifies the strongest reason behind portfolio movement:

- highest exposure
- strongest market movement
- strongest causal confirmation

This becomes the main explanation shown to the user.

---

## Portfolio Health Evaluation

The system classifies overall health:

- Low Risk
- Moderate Risk
- High Risk

based on concentration risk, volatility, and sector dependency.

---

## Institutional Frontend Dashboard

The frontend provides:

- professional portfolio dashboard
- AI loading simulation
- reasoning timeline
- portfolio health cards
- top driver breakdown
- sector impact table
- news insights section
- recommendation summary

designed like a real institutional financial terminal.

---

# Tech Stack

## Backend

- Node.js
- Express.js
- JavaScript
- JSON Data Modeling

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI

## Deployment

- Render (Backend)
- Vercel (Frontend)

---

# Project Structure

```text
financial-advisor-agent
│
├── data
│   ├── portfolios.json
│   ├── market_data.json
│   ├── news_data.json
│   ├── mutual_funds.json
│   ├── historical_data.json
│   └── sector_mapping.json
│
├── services
│   ├── portfolio.js
│   ├── market.js
│   ├── news.js
│   ├── reasoning.js
│   ├── llmReasoning.js
│   ├── risk.js
│   ├── recommendation.js
│   ├── pnl.js
│   └── decision.engine.js
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   └── lib
│
├── index.js
├── package.json
└── README.md