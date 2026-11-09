import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  Sparkles,
  ArrowUpRight,
  Clock,
  Award,
  Layers,
  Heart,
  MessageCircle,
  Share2,
  Bookmark
} from 'lucide-react';
import { SocialAccount, SocialPlatform } from '../types';
import { PLATFORM_CONFIG } from '../data/mockData';

interface AnalyticsViewProps {
  accounts: SocialAccount[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ accounts }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<SocialPlatform | 'all'>('all');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Sample performance data
  const WEEKLY_REACH = [
    { day: 'Seg', reach: 24200, height: 65 },
    { day: 'Ter', reach: 38400, height: 95 },
    { day: 'Qua', reach: 29100, height: 75 },
    { day: 'Qui', reach: 41200, height: 100 },
    { day: 'Sex', reach: 33500, height: 82 },
    { day: 'Sáb', reach: 19800, height: 50 },
    { day: 'Dom', reach: 36400, height: 90 },
  ];

  const FORMAT_EFFICIENCY = [
    { format: 'Vídeos Curtos (Reels / TikTok)', rate: '8.7%', bar: 92, color: 'bg-rose-500' },
    { format: 'Carrosséis Educativos (Instagram / LinkedIn)', rate: '7.2%', bar: 78, color: 'bg-indigo-500' },
    { format: 'Threads / Fios no X', rate: '5.4%', bar: 60, color: 'bg-sky-500' },
    { format: 'Post Único com Imagem', rate: '3.6%', bar: 40, color: 'bg-amber-500' },
  ];

  const TOP_POSTS = [
    {
      title: '5 Ferramentas de IA para Criadores em 2026',
      platform: 'instagram' as SocialPlatform,
      reach: '54.2K',
      likes: '3.420',
      saves: '1.240',
      shares: '890',
      conversion: '9.4%'
    },
    {
      title: 'Por que parei de postar diariamente e tripliquei o faturamento',
      platform: 'linkedin' as SocialPlatform,
      reach: '41.8K',
      likes: '1.890',
      saves: '760',
      shares: '340',
      conversion: '8.1%'
    },
    {
      title: 'Roteiro Rápido: O Hack de 3 Segundos para Viralizar',
      platform: 'tiktok' as SocialPlatform,
      reach: '98.6K',
      likes: '14.2K',
      saves: '4.890',
      shares: '1.920',
      conversion: '11.2%'
    },
    {
      title: 'A anatomia da thread perfeita no X',
      platform: 'twitter' as SocialPlatform,
      reach: '28.4K',
      likes: '840',
      saves: '420',
      shares: '210',
      conversion: '6.5%'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Analytics & Métricas em Tempo Real</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Auditoria completa de retenção, alcance orgânico e conversão por plataforma.
          </p>
        </div>

        {/* Time range selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeRange === r
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {r === '7d' ? 'Últimos 7 dias' : r === '30d' ? 'Últimos 30 dias' : 'Últimos 90 dias'}
            </button>
          ))}
        </div>
      </div>

      {/* Network Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
        <button
          onClick={() => setSelectedNetwork('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            selectedNetwork === 'all'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Visão Consolidada
        </button>
        {(['instagram', 'linkedin', 'tiktok', 'twitter', 'youtube'] as SocialPlatform[]).map((p) => {
          const isSelected = selectedNetwork === p;
          return (
            <button
              key={p}
              onClick={() => setSelectedNetwork(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {p === 'twitter' ? 'X (Twitter)' : p}
            </button>
          );
        })}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Alcance Único Total</span>
            <Eye className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">219.2K</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">vs período anterior</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Impressões Brutas</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">894.6K</span>
            <span className="text-xs font-semibold text-indigo-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24.1%
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Distribuição viral contínua</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Engajamentos Ativos</span>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">48.9K</span>
            <span className="text-xs font-semibold text-rose-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12.3%
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Curtidas, comentários e salvamentos</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Cliques na Bio / CTA</span>
            <MousePointerClick className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">4.120</span>
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +31.8%
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Taxa de conversão: 8.4%</span>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reach Trends Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Trajetória de Alcance Diário</h3>
              <p className="text-xs text-slate-400">Picos de entrega nos dias com carrosséis e reels</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              Pico: Quinta-feira (41.2k)
            </span>
          </div>

          <div className="pt-6 pb-2">
            <div className="h-48 flex items-end justify-between gap-2 px-2">
              {WEEKLY_REACH.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {(item.reach / 1000).toFixed(1)}k
                  </span>
                  <div
                    style={{ height: `${item.height}%` }}
                    className="w-full max-w-[40px] rounded-t-xl bg-gradient-to-t from-indigo-600 via-purple-600 to-emerald-400 group-hover:brightness-125 transition-all shadow-lg"
                  />
                  <span className="text-xs font-bold text-slate-400 mt-1">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Format Efficiency (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-lg space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Eficiência por Formato</h3>
              <p className="text-xs text-slate-400">Taxa de retenção e engajamento médio</p>
            </div>

            <div className="space-y-4 mt-4">
              {FORMAT_EFFICIENCY.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-200">{item.format}</span>
                    <span className="text-emerald-400 font-bold">{item.rate}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      style={{ width: `${item.bar}%` }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <span>
              <strong>Insight da IA:</strong> Seus carrosséis no LinkedIn têm 3.4x mais comentários quando você inclui um checklist de 5 itens no slide final.
            </span>
          </div>
        </div>
      </div>

      {/* Top Performing Posts Leaderboard */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">Posts Campeões de Audiência</h3>
              <p className="text-xs text-slate-400">Os conteúdos que mais trouxeram seguidores e cliques no mês</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Post & Rede</th>
                <th className="py-3 px-3">Alcance</th>
                <th className="py-3 px-3">Curtidas</th>
                <th className="py-3 px-3">Salvamentos</th>
                <th className="py-3 px-3">Compartilhamentos</th>
                <th className="py-3 px-4 rounded-r-xl">Conversão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {TOP_POSTS.map((post, idx) => {
                const cfg = PLATFORM_CONFIG[post.platform];
                return (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 ${cfg.bgBadge}`}>
                          {cfg.name}
                        </span>
                        <span className="font-semibold text-white line-clamp-1 max-w-xs">{post.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-white">{post.reach}</td>
                    <td className="py-3.5 px-3 text-rose-400 font-semibold">{post.likes}</td>
                    <td className="py-3.5 px-3 text-amber-400 font-semibold">{post.saves}</td>
                    <td className="py-3.5 px-3 text-sky-400 font-semibold">{post.shares}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">{post.conversion}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
