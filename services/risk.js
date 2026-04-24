export function detectRisk(exposure) {
  let portfolioHealth = "Balanced";
  let riskInsight = "Portfolio is reasonably diversified.";

  let highestSector = null;
  let highestExposure = 0;

  for (const sector in exposure) {
    if (exposure[sector] > highestExposure) {
      highestExposure = exposure[sector];
      highestSector = sector;
    }
  }

  if (highestExposure >= 12) {
    portfolioHealth = "Moderate Risk";
    riskInsight = `High concentration in ${highestSector} sector (${highestExposure}%) may increase volatility.`;
  }

  if (highestExposure >= 20) {
    portfolioHealth = "High Risk";
    riskInsight = `Very high concentration in ${highestSector} sector (${highestExposure}%) creates significant concentration risk.`;
  }

  return {
    portfolioHealth,
    riskInsight,
    highestSector,
    highestExposure,
  };
}
