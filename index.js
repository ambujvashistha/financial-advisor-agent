import express from "express";
import dotenv from "dotenv";
import { loadJSON } from "./dataLoader.js";
import { getSectorExposure } from "./services/portfolio.js";


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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
