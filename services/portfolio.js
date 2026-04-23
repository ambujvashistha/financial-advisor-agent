export function getSectorExposure(portfolio) {
  const exposure = {};

  portfolio.holdings.stocks.forEach((stock) => {
    if (!exposure[stock.sector]) {
      exposure[stock.sector] = 0;
    }

    exposure[stock.sector] += stock.weight_in_portfolio;
  });

  return exposure;
}
