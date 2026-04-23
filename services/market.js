export function getSectorImpact(exposure, marketData) {
  const impacts = [];

  for (const sector in exposure) {
    const marketSector = marketData.sector_performance[sector];

    if (!marketSector) continue;

    impacts.push({
      sector,
      exposure: exposure[sector],
      change: marketSector.change_percent,
      sentiment: marketSector.sentiment,
    });
  }

  return impacts;
}
