import express from "express";
import dotenv from "dotenv";
import { loadJSON } from "./dataLoader.js";
import { getSectorExposure } from "./services/portfolio.js";
import { getSectorImpact } from "./services/market.js";
import { generateInsights } from "./services/reasoning.js";
import { mapNewsToSectors, attachNewsToInsights } from "./services/news.js";
import { generateAIInsights } from "./services/llmReasoning.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Server running");
});

app.get("/test", (req, res) => {
  const market = loadJSON("./data/market_data.json");

  res.json({
    marketSentiment: market.indices.NIFTY50.sentiment,
    bankSectorChange: market.sector_performance.BANKING.change_percent,
  });
});

app.get("/exposure", (req, res) => {
  const portfolios = loadJSON("./data/portfolios.json");

  const portfolio = portfolios.portfolios.PORTFOLIO_001;

  const exposure = getSectorExposure(portfolio);

  res.json(exposure);
});

app.get("/impact", (req, res) => {
  const market = loadJSON("./data/market_data.json");
  const portfolios = loadJSON("./data/portfolios.json");

  const portfolio = portfolios.portfolios.PORTFOLIO_001;

  const exposure = getSectorExposure(portfolio);
  const impacts = getSectorImpact(exposure, market);

  res.json(impacts);
});

app.get("/insights", (req, res) => {
  const market = loadJSON("./data/market_data.json");
  const portfolios = loadJSON("./data/portfolios.json");
  const news = loadJSON("./data/news_data.json");

  const portfolio = portfolios.portfolios.PORTFOLIO_001;

  const exposure = getSectorExposure(portfolio);
  const impacts = getSectorImpact(exposure, market);

  let insights = generateInsights(impacts);

  const sectorNewsMap = mapNewsToSectors(news);
  insights = attachNewsToInsights(insights, sectorNewsMap);

  res.json(insights);
});

app.get("/analyze", async (req, res) => {
  const market = loadJSON("./data/market_data.json");
  const portfolios = loadJSON("./data/portfolios.json");
  const news = loadJSON("./data/news_data.json");

  const portfolio = portfolios.portfolios.PORTFOLIO_001;

  const exposure = getSectorExposure(portfolio);

  const sectorNewsMap = mapNewsToSectors(news);

  const impacts = getSectorImpact(exposure, market, sectorNewsMap);

  let insights = generateInsights(impacts);
  insights = attachNewsToInsights(insights, sectorNewsMap);

  const ai = await generateAIInsights(impacts);

  const topDriver = impacts[0];

  const confidence =
    impacts.reduce((sum, s) => sum + s.causality, 0) / impacts.length;

  res.json({
    summary: ai.summary,
    mainReason: ai.main_reason,
    confidence: Number(confidence.toFixed(2)),
    topDriver,
    exposure,
    impacts,
    insights,
  });
});

app.get("/ai-insights", async (req, res) => {
  const market = loadJSON("./data/market_data.json");
  const portfolios = loadJSON("./data/portfolios.json");

  const portfolio = portfolios.portfolios.PORTFOLIO_001;

  const exposure = getSectorExposure(portfolio);
  const impacts = getSectorImpact(exposure, market);

  const aiInsights = await generateAIInsights(impacts);

  res.json({
    aiInsights,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
