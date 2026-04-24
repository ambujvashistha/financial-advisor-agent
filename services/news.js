export function mapNewsToSectors(newsData) {
  const sectorNewsMap = {};

  newsData.news.forEach((article) => {
    const sectors = article.entities?.sectors || [];

    sectors.forEach((sector) => {
      if (!sectorNewsMap[sector]) {
        sectorNewsMap[sector] = [];
      }

      sectorNewsMap[sector].push({
        headline: article.headline,
        sentiment: article.sentiment,
        scope: article.entities?.stocks?.length ? "STOCK" : "SECTOR",
      });
    });
  });

  return sectorNewsMap;
}

export function attachNewsToInsights(insights, sectorNewsMap) {
  return insights.map((insight) => {
    const relatedNews = sectorNewsMap[insight.sector] || [];

    return {
      ...insight,
      news: relatedNews.slice(0, 2),
    };
  });
}
