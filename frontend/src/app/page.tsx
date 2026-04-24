"use client";

import React, { useState } from 'react';
import { 
  Activity, 
  BarChart3, 
  BrainCircuit, 
  Briefcase, 
  ChevronRight, 
  CircleDollarSign, 
  LineChart, 
  Loader2, 
  Network, 
  Newspaper, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingDown, 
  TrendingUp, 
  Zap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const portfolios = [
  {
    id: 'conservative',
    name: 'Conservative',
    size: '$5.2M',
    topSector: 'FMCG',
    volatility: 'Low',
    risk: 'Defensive',
    characteristics: 'Capital preservation focus'
  },
  {
    id: 'balanced',
    name: 'Balanced',
    size: '$12.8M',
    topSector: 'Diversified',
    volatility: 'Medium',
    risk: 'Moderate',
    characteristics: 'Risk-adjusted growth'
  },
  {
    id: 'aggressive',
    name: 'Aggressive',
    size: '$8.4M',
    topSector: 'Technology',
    volatility: 'High',
    risk: 'Aggressive',
    characteristics: 'Maximal alpha generation'
  }
];

const loadingSteps = [
  "Loading portfolio holdings...",
  "Calculating sector exposure...",
  "Evaluating market performance...",
  "Mapping relevant news events...",
  "Running causal reasoning engine...",
  "Generating portfolio risk analysis...",
  "Creating recommendations...",
  "Finalizing advisor summary..."
];

export default function Dashboard() {
  const [selectedProfile, setSelectedProfile] = useState('aggressive');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisData(null);
    setError(null);
    setLoadingStepIdx(0);

    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingStepIdx(i);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      const portfolioMapping: Record<string, string> = {
        conservative: 'PORTFOLIO_003',
        balanced: 'PORTFOLIO_001',
        aggressive: 'PORTFOLIO_002'
      };
      const backendId = portfolioMapping[selectedProfile] || 'PORTFOLIO_001';
      
      const res = await fetch(
  "https://financial-advisor-agent-wrqf.onrender.com/analyze",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
)

      if (!res.ok) throw new Error('Failed to fetch analysis data');
      const data = await res.json();
      setAnalysisData(data);
    } catch (err) {
      console.error(err);
      setError('System integration error: Unable to connect to Reasoning Engine.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 selection:bg-primary/30">
      {/* 1. Hero Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <BrainCircuit className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold tracking-tight text-lg leading-tight">AI Portfolio Intelligence Agent</h1>
              <p className="text-xs text-muted-foreground">Institutional Market Reasoning Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              Engine Online
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10 space-y-12">
        {/* Header Text */}
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight mb-3">Portfolio Assessment</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Explain portfolio movement using market data, sector exposure, news causality, and AI reasoning. Select a profile below to initialize the agent.
          </p>
        </div>

        {/* 2. Portfolio Profile Selection */}
        <section className="space-y-5">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Target Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {portfolios.map(p => (
              <Card 
                key={p.id}
                className={`relative cursor-pointer transition-all duration-200 overflow-hidden group ${
                  selectedProfile === p.id 
                    ? 'border-primary shadow-[0_0_15px_rgba(47,120,255,0.15)] bg-primary/5' 
                    : 'hover:border-primary/50 hover:bg-muted/30'
                }`}
                onClick={() => {
                  setSelectedProfile(p.id);
                  setAnalysisData(null);
                }}
              >
                {selectedProfile === p.id && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                )}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">{p.name}</CardTitle>
                      <CardDescription>{p.characteristics}</CardDescription>
                    </div>
                    <Briefcase className={`w-5 h-5 ${selectedProfile === p.id ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mt-4">
                    <div>
                      <div className="text-muted-foreground mb-1 text-xs uppercase tracking-wider">Size</div>
                      <div className="font-medium text-foreground">{p.size}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1 text-xs uppercase tracking-wider">Top Sector</div>
                      <div className="font-medium text-foreground">{p.topSector}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1 text-xs uppercase tracking-wider">Volatility</div>
                      <div className="font-medium text-foreground">{p.volatility}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1 text-xs uppercase tracking-wider">Risk Level</div>
                      <div className="font-medium text-foreground">{p.risk}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. Analyze Button */}
        {!analysisData && !isAnalyzing && (
          <div className="flex justify-center py-10 animate-in fade-in zoom-in duration-500">
            <Button 
              size="lg" 
              className="px-10 py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(47,120,255,0.3)] hover:shadow-[0_0_30px_rgba(47,120,255,0.5)] transition-all"
              onClick={handleAnalyze}
            >
              <Zap className="mr-2 w-5 h-5" />
              Analyze Portfolio
            </Button>
          </div>
        )}

        {/* 4. AI Agent Loading Experience */}
        {isAnalyzing && (
          <div className="py-16 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="w-16 h-16 bg-background border border-primary/30 rounded-2xl flex items-center justify-center relative z-10">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-xl font-medium text-foreground">{loadingSteps[loadingStepIdx]}</h3>
              <p className="text-sm text-muted-foreground font-mono">Agent ID: PRT-7X-99 • Processing Request</p>
            </div>

            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground font-mono mb-1">
                <span>Progress</span>
                <span>{Math.round(((loadingStepIdx + 1) / loadingSteps.length) * 100)}%</span>
              </div>
              <Progress value={((loadingStepIdx + 1) / loadingSteps.length) * 100} className="h-1.5" />
            </div>
          </div>
        )}

        {error && (
          <Card className="border-destructive/50 bg-destructive/5 animate-in fade-in">
            <CardContent className="py-6 flex items-center gap-3 text-destructive">
              <ShieldAlert className="w-5 h-5" />
              <span className="font-medium">{error}</span>
            </CardContent>
          </Card>
        )}

        {analysisData && !isAnalyzing && (
          <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700 fade-in">
            
            {/* 10. AI Agent Timeline */}
            <div className="w-full bg-muted/20 border border-border/50 rounded-lg p-4">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-border/50" />
                {["Portfolio", "Exposure", "Market", "News", "Reasoning", "Decision"].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center border-4 border-background ring-2 ring-primary/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-background" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Executive AI Summary */}
            <Card className="border-primary/30 shadow-[0_0_30px_rgba(47,120,255,0.05)] bg-gradient-to-br from-background to-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
              <CardHeader className="pb-3 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Executive AI Summary</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Synthesis</h4>
                    <p className="text-lg leading-relaxed text-foreground/90 font-medium">{analysisData.summary || "No summary available."}</p>
                  </div>
                  <div className="bg-background/60 p-4 rounded-lg border border-border/50">
                    <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Network className="w-4 h-4" /> Root Causality
                    </h4>
                    <p className="text-sm text-muted-foreground">{analysisData.mainReason || "N/A"}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-background/50 rounded-xl border border-border/40 p-6 text-center">
                  <div className="relative mb-3">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="44" className="stroke-muted fill-none stroke-[4]" />
                      <circle cx="48" cy="48" r="44" className="stroke-primary fill-none stroke-[4]" strokeDasharray="276" strokeDashoffset={276 - (276 * analysisData.confidence)} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold tracking-tighter">{(analysisData.confidence * 100).toFixed(0)}</span>
                      <span className="text-lg font-medium text-muted-foreground ml-0.5">%</span>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">AI Confidence Level</span>
                </div>
              </CardContent>
            </Card>

            {/* 6. Portfolio Health Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-card/50">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-primary/10 rounded-md text-primary">
                      <Activity className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Portfolio Health</p>
                    <p className={`text-2xl font-semibold tracking-tight ${analysisData.portfolioHealth === 'Critical' ? 'text-destructive' : 'text-emerald-500'}`}>
                      {analysisData.portfolioHealth}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-primary/10 rounded-md text-primary">
                      <LineChart className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Portfolio PnL</p>
                    <div className={`flex items-center gap-2 text-2xl font-semibold tracking-tight ${analysisData.portfolioPnL >= 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                      {analysisData.portfolioPnL >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      {analysisData.portfolioPnL > 0 ? '+' : ''}{analysisData.portfolioPnL}%
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-primary/10 rounded-md text-primary">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Risk Insight</p>
                    <p className="text-lg font-medium leading-tight line-clamp-2">{analysisData.riskInsight}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-emerald-500/5 border-emerald-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-emerald-500/20 rounded-md text-emerald-500">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-emerald-500/70 uppercase tracking-wider font-semibold">Recommendation</p>
                    <p className="text-lg font-semibold text-emerald-500 leading-tight">{analysisData.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* 8. Sector Breakdown Table */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/40">
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      Sector Breakdown Matrix
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-muted/30">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="font-semibold text-xs tracking-wider uppercase">Sector</TableHead>
                          <TableHead className="font-semibold text-xs tracking-wider uppercase text-right">Exposure</TableHead>
                          <TableHead className="font-semibold text-xs tracking-wider uppercase text-right">Change</TableHead>
                          <TableHead className="font-semibold text-xs tracking-wider uppercase text-center">Sentiment</TableHead>
                          <TableHead className="font-semibold text-xs tracking-wider uppercase text-right">Causality</TableHead>
                          <TableHead className="font-semibold text-xs tracking-wider uppercase text-right">Impact</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analysisData.impacts?.map((item: any, idx: number) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{item.sector}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{(item.exposure * 100).toFixed(0)}%</TableCell>
                            <TableCell className={`text-right font-medium ${item.change_percent >= 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                              {item.change_percent >= 0 ? '+' : ''}{item.change_percent}%
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline" className={`
                                ${item.sentiment === 'positive' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5' : 
                                  item.sentiment === 'negative' ? 'border-destructive/30 text-destructive bg-destructive/5' : 
                                  'border-amber-500/30 text-amber-500 bg-amber-500/5'}
                              `}>
                                {item.sentiment}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground font-mono">{item.causality?.toFixed(2) || '-'}</TableCell>
                            <TableCell className="text-right font-medium">{item.impactScore?.toFixed(2) || '-'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* 9. Insights + News Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-muted-foreground" />
                    Market Signals & Insights
                  </h3>
                  <div className="grid gap-4">
                    {analysisData.insights?.map((insight: any, idx: number) => (
                      <Card key={idx} className="bg-card/50 hover:bg-muted/20 transition-colors border-border/60">
                        <CardContent className="p-5 flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {insight.sentiment === 'positive' ? (
                              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center border border-destructive/20">
                                <TrendingDown className="w-4 h-4 text-destructive" />
                              </div>
                            )}
                          </div>
                          <div className="space-y-3 w-full">
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">{insight.insight || "Sector movement observed"}</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">{insight.reasoning || "Causal reasoning derived from market metrics."}</p>
                            </div>
                            
                            {insight.relatedNews && insight.relatedNews.length > 0 && (
                              <div className="bg-background/80 rounded-lg border border-border/50 p-3 space-y-2">
                                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                  <CircleDollarSign className="w-3 h-3" /> Related Market News
                                </div>
                                {insight.relatedNews.map((news: any, nIdx: number) => (
                                  <div key={nIdx} className="flex flex-col gap-0.5">
                                    <span className="text-sm font-medium text-primary hover:underline cursor-pointer">{news.headline}</span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-2">
                                      {news.source} 
                                      <span className="w-1 h-1 rounded-full bg-border" /> 
                                      <span className={news.sentiment === 'positive' ? 'text-emerald-500' : 'text-destructive'}>
                                        {news.sentiment}
                                      </span>
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* 7. Top Driver Section */}
                {analysisData.topDriver && (
                  <Card className="border-primary/40 bg-gradient-to-b from-primary/10 to-background shadow-lg">
                    <CardHeader className="pb-2">
                      <CardDescription className="uppercase tracking-wider font-bold text-primary flex items-center gap-2 text-xs">
                        <Zap className="w-3.5 h-3.5 fill-primary/20" />
                        Primary Impact Driver
                      </CardDescription>
                      <CardTitle className="text-2xl mt-1">{analysisData.topDriver.sector}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="p-4 bg-background/60 rounded-lg border border-border/50 flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Market Move</span>
                        <div className={`text-3xl font-bold tracking-tight ${analysisData.topDriver.change_percent >= 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                          {analysisData.topDriver.change_percent >= 0 ? '+' : ''}{analysisData.topDriver.change_percent}%
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Exposure</span>
                          <p className="font-semibold text-foreground text-lg">{(analysisData.topDriver.exposure * 100).toFixed(0)}%</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Impact Score</span>
                          <p className="font-semibold text-foreground text-lg">{analysisData.topDriver.impactScore?.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border/40">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Root Cause Headline</span>
                        <p className="text-sm font-medium italic text-foreground border-l-2 border-primary pl-3">
                          "{analysisData.insights?.[0]?.relatedNews?.[0]?.headline || "Strong earnings beat market expectations leading to positive institutional momentum."}"
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="bg-card/40 border-dashed">
                  <CardContent className="p-6 text-center text-sm text-muted-foreground space-y-2">
                    <ShieldCheck className="w-8 h-8 mx-auto text-muted-foreground/50 mb-2" />
                    <p>Analysis driven by real-time market data and advanced causal reasoning models.</p>
                    <p className="text-xs opacity-70">Model Ver: 4.1.0-institutional</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 11. Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground pb-8">
        <p className="flex items-center justify-center gap-2">
          <BrainCircuit className="w-4 h-4" />
          AI Portfolio Intelligence Agent • Institutional Grade Analytics Pipeline
        </p>
      </footer>
    </div>
  );
}
