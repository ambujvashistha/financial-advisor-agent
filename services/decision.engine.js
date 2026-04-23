export function derivePrimaryDriver(impacts) {
  const top = impacts[0];

  let cause = "Market movement";

  if (top.news && top.news.length > 0) {
    const alignedNews = top.news.find(
      (n) =>
        (top.change < 0 && n.sentiment === "NEGATIVE") ||
        (top.change > 0 && n.sentiment === "POSITIVE"),
    );

    if (alignedNews) {
      cause = alignedNews.headline;
    } else if (top.conflict) {
      cause = "Mixed signals in news";
    } else {
      cause = "Weak or unclear news signals";
    }
  }

  return {
    sector: top.sector,
    exposure: top.exposure,
    change: top.change,
    cause,
    impactScore: top.impactScore,
  };
}
