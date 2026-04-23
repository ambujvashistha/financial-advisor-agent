import express from "express";
import dotenv from "dotenv";
import { loadJSON } from "./dataLoader.js";

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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
