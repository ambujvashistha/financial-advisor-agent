# AI Portfolio Intelligence Agent

AI Portfolio Intelligence Agent is a financial portfolio analysis system built to simulate how an institutional market reasoning engine explains portfolio movement using market data, sector exposure, news causality, risk signals, and portfolio intelligence.

The system combines a Node.js backend reasoning engine with a production-ready Next.js frontend dashboard to create an end-to-end financial advisor experience.

It is designed to answer one core question:

Why did this portfolio move?

Instead of only showing numbers, the system provides reasoning, confidence scoring, sector impact analysis, top drivers, portfolio health evaluation, and actionable recommendations.

The goal of this project is not just visualization, but explainable financial intelligence.

---

# Problem Statement

Traditional portfolio dashboards show data but fail to explain the reason behind portfolio movement.

Investors often see:

* Portfolio gain or loss
* Sector allocation
* Market performance

but they do not get:

* Root cause analysis
* News-driven explanations
* Sector causality detection
* Risk intelligence
* Clear recommendations

This project solves that by building an AI-powered reasoning engine that converts raw financial data into understandable portfolio intelligence.

---

# Core Features

## Portfolio Profile Selection

Users can select between multiple portfolio profiles:

* Conservative
* Balanced
* Aggressive

Each profile represents a different investment strategy and risk appetite.

Every portfolio has different sector concentration, volatility level, and exposure patterns which directly affect the reasoning output.

---

## AI-Powered Analysis Engine

The backend performs a complete reasoning flow:

* Portfolio exposure calculation
* Sector mapping
* Market movement analysis
* News causality detection
* Conflict detection
* Impact score calculation
* Top driver identification
* Portfolio health evaluation
* Risk recommendation generation
* AI summary generation

This creates a complete institutional-style reasoning pipeline instead of simple portfolio reporting.

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

This makes the system more reliable and explainable.

---

## Top Driver Detection

The engine identifies the strongest reason behind portfolio movement using:

* highest exposure
* strongest market movement
* strongest causal confirmation
* strongest impact score

This becomes the main explanation shown to the user as the Primary Impact Driver.

---

## Portfolio Health Evaluation

The system classifies overall health into:

* Low Risk
* Moderate Risk
* High Risk

based on:

* concentration risk
* sector dependency
* volatility exposure
* diversification quality

This allows users to understand structural portfolio weakness beyond simple returns.

---

## Portfolio PnL Intelligence

The system also calculates estimated portfolio movement using weighted impact and exposure.

Instead of showing only raw values, it provides portfolio movement explanation connected to actual market reasoning.

This improves decision-making clarity.

---

## Institutional Frontend Dashboard

The frontend provides:

* professional portfolio dashboard
* AI loading simulation
* reasoning timeline
* portfolio health cards
* confidence score visualization
* portfolio PnL cards
* top driver breakdown
* sector impact matrix
* related market news insights
* recommendation summary

The interface is designed to resemble a real institutional financial terminal rather than a simple student project UI.

---

# Data Flow

The system follows a structured financial reasoning pipeline.

Portfolio Selection
↓
Portfolio Exposure Calculation
↓
Sector Mapping
↓
Market Performance Analysis
↓
News Mapping to Sectors
↓
Causality Detection
↓
Conflict Detection
↓
Impact Score Calculation
↓
Primary Driver Identification
↓
Risk Detection
↓
Recommendation Generation
↓
Portfolio PnL Calculation
↓
AI Summary Generation
↓
Frontend Dashboard Response

Every stage contributes to the final explanation shown to the user.

---

# Backend Code Flow

The main orchestration happens inside:

index.js → /analyze route

This route acts as the reasoning engine controller.

Execution flow:

1. Portfolio is selected using portfolioId
2. Holdings are converted into sector exposure
3. Market data is mapped against those sectors
4. News events are attached to relevant sectors
5. Causality confidence is calculated
6. Conflict detection validates false signals
7. Impact score is generated for each sector
8. Primary impact driver is selected
9. Portfolio health is evaluated
10. Recommendation is generated
11. Portfolio PnL is calculated
12. AI summary is generated
13. Final JSON response is sent to frontend

This architecture keeps every responsibility modular and scalable.

---

# API Endpoints

## Main Analysis Route

GET /analyze

This is the primary production endpoint used by the frontend.

It returns:

* portfolio health
* risk insight
* recommendation
* portfolio PnL
* AI summary
* main reason
* confidence score
* top driver
* exposure data
* impact matrix
* insights

---

## Additional Routes

GET /test
GET /exposure
GET /impact
GET /insights
GET /ai-insights

These routes are used for testing, debugging, and modular validation of individual reasoning stages.

---

# Tech Stack

## Backend

* Node.js
* Express.js
* JavaScript
* JSON Data Modeling
* Modular Service Architecture

## Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Shadcn UI

## Deployment

* Render for backend deployment
* Vercel for frontend deployment

---

# Project Structure

financial-advisor-agent

data
├── portfolios.json
├── market_data.json
├── news_data.json
├── mutual_funds.json
├── historical_data.json
└── sector_mapping.json

services
├── portfolio.js
├── market.js
├── news.js
├── reasoning.js
├── llmReasoning.js
├── risk.js
├── recommendation.js
├── pnl.js
└── decision.engine.js

frontend
└── src
├── app
├── components
└── lib

index.js
dataLoader.js
package.json
README.md

---

# Deployment Architecture

Frontend → Vercel
↓
API Calls
↓
Backend → Render
↓
Financial Reasoning Engine
↓
JSON Data + Portfolio Intelligence

The frontend and backend are deployed independently for production-ready scalability.

---

# What Makes This Project Strong

This project is not a CRUD app.

It is a reasoning-based financial system focused on explainability.

It demonstrates:

* backend architecture design
* production deployment
* API integration
* modular service architecture
* financial domain reasoning
* causal analysis
* risk intelligence
* real-world product thinking

It is built like an actual deployable product, not just an academic submission.

---

# Future Improvements

Possible production upgrades include:

* live market API integration
* real mutual fund ingestion
* authentication and user portfolios
* portfolio upload support
* alert engine for risk triggers
* AI-powered historical trend forecasting
* investor recommendation scoring
* portfolio rebalance suggestions

This creates a strong path from academic prototype to real financial product.

---

# Final Thought

This project answers a simple but powerful question:

Why did this portfolio move?

That explanation is often more valuable than the movement itself.

AI Portfolio Intelligence Agent is built around that idea.
