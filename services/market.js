export function getSectorImpact(exposure, marketData, sectorNewsMap = {}) {
  const impacts = [];

  for (const sector in exposure) {
    const marketSector = marketData.sector_performance[sector];
    if (!marketSector) continue;

    const news = (sectorNewsMap[sector] || []).slice(0, 2);

    let causality = 0.2;
    let conflict = false; 

    if (news.length > 0) {
      const hasPositive = news.some((n) => n.sentiment === "POSITIVE");
      const hasNegative = news.some((n) => n.sentiment === "NEGATIVE");

      conflict = hasPositive && hasNegative; // 👈 move here

      if (marketSector.change_percent < 0 && hasNegative) causality = 1.0;
      else if (marketSector.change_percent > 0 && hasPositive) causality = 1.0;
      else if (!hasPositive && !hasNegative) causality = 0.2;
      else causality = 0.3;
    }

    const impactScore =
      Math.abs(marketSector.change_percent) * exposure[sector] * causality;

    impacts.push({
      sector,
      exposure: exposure[sector],
      change: marketSector.change_percent,
      sentiment: marketSector.sentiment,
      causality,
      impactScore,
      news,
      conflict,
    });
  }

  impacts.sort((a, b) => b.impactScore - a.impactScore);

  return impacts;
}
