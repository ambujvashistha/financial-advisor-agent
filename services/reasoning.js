export function generateInsights(impacts) {
  const insights = [];

  impacts.forEach((sector) => {
    
    if (sector.change < -1 && sector.exposure > 3) {
      insights.push({
        type: "NEGATIVE",
        sector: sector.sector,
        message: `${sector.sector} sector declined ${sector.change}% impacting portfolio due to ${sector.exposure}% exposure`,
        confidence: "HIGH",
      });
    }
    else if (sector.change > 1 && sector.exposure > 3) {
      insights.push({
        type: "POSITIVE",
        sector: sector.sector,
        message: `${sector.sector} sector gained ${sector.change}% contributing positively to portfolio`,
        confidence: "MEDIUM",
      });
    }
  });

  return insights;
}
