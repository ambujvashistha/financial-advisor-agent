import express from "express";
import dotenv from "dotenv";
import { loadJSON } from "./dataLoader.js";
import { getSectorExposure } from "./services/portfolio.js";
import { getSectorImpact } from "./services/market.js";
import { generateInsights } from "./services/reasoning.js";

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

  const portfolio = portfolios.portfolios.PORTFOLIO_001;

  const exposure = getSectorExposure(portfolio);
  const impacts = getSectorImpact(exposure, market);

  const insights = generateInsights(impacts);

  res.json(insights);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
