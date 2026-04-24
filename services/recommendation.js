export function generateRecommendation(primaryDriver, riskData) {
  const { portfolioHealth, highestSector } = riskData;

  if (portfolioHealth === "High Risk") {
    return `Consider reducing exposure in ${highestSector} and reallocating to defensive sectors like FMCG or Pharmaceuticals for better diversification.`;
  }

  if (primaryDriver.change < 0) {
    return `Monitor ${primaryDriver.sector} closely and consider reducing short-term overexposure if negative sentiment continues.`;
  }

  if (primaryDriver.change > 0) {
    return `Current allocation in ${primaryDriver.sector} is performing well. Maintain balanced exposure and avoid over-concentration.`;
  }

  return `Maintain diversification and continue monitoring sector-level news for early risk signals.`;
}
