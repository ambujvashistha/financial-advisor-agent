export function calculatePortfolioPnL(impacts) {
  let totalPnL = 0;

  impacts.forEach((sector) => {
    totalPnL += (sector.exposure * sector.change) / 100;
  });

  return Number(totalPnL.toFixed(2));
}
