import React from 'react';
import {
  TrendingUp,
  Users,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Clock,
  Eye,
  CheckCircle2,
  Zap,
  BarChart3,
  Layers,
  ChevronRight,
  Activity,
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react';
import { SocialAccount, ScheduledPost, SocialPlatform } from '../types';
import { PLATFORM_CONFIG } from '../data/mockData';

interface DashboardViewProps {
  accounts: SocialAccount[];
  scheduledPosts: ScheduledPost[];
  onNavigate: (tab: string) => void;
  onSelectPostToEdit: (post: ScheduledPost) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  accounts,
  scheduledPosts,
  onNavigate,
  onSelectPostToEdit,
}) => {
  const totalFollowers = accounts.reduce((sum, a) => sum + a.followers, 0);
  const avgEngagement = (accounts.reduce((sum, a) => sum + a.engagementRate, 0) / (accounts.length || 1)).toFixed(1);
  const scheduledCount = scheduledPosts.filter((p) => p.status === 'scheduled').length;
  const publishedCount = scheduledPosts.filter((p) => p.status === 'published').length;

  const upcomingPosts = scheduledPosts
    .filter((p) => p.status === 'scheduled')
    .slice(0, 4);

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-indigo-500/30 p-6 md:p-8 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Social Media Master v2.4 • IA Gemini 3.8 Integrada</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Acelere sua Presença Digital com Inteligência Artificial
            </h1>
            <p className="text-sm text-indigo-200/90 leading-relaxed">
              Crie posts de alta retenção, gerencie carrosséis e roteiros para 5 redes simultaneamente e acompanhe o crescimento da sua audiência em tempo real.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('studio')}
              className="px-5 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm shadow-xl hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-indigo-600 group-hover:rotate-12 transition-transform" />
              <span>Criar Post com IA</span>
            </button>
            <button
              onClick={() => onNavigate('calendar')}
              className="px-4 py-3 rounded-xl bg-slate-950/60 hover:bg-slate-900 border border-white/20 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Ver Calendário</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Audiência Consolidada</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {(totalFollowers / 1000).toFixed(1)}k
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.2%
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">em 5 canais sincronizados</span>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Taxa Média de Engajamento</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">{avgEngagement}%</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +1.8%
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">benchmark do nicho: 2.3%</span>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Fila de Agendamento</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">{scheduledCount} posts</span>
            <span className="text-xs font-semibold text-sky-400">Ativos</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">{publishedCount} publicados neste ciclo</span>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Score de Autoridade & IA</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">96/100</span>
            <span className="text-xs font-semibold text-amber-400">Excelente</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Alta retenção algorítmica</span>
        </div>
      </div>

      {/* Main Section: Channels & Upcoming Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Connected Channels Overview (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                Canais Conectados & Performance
              </h3>
              <p className="text-xs text-slate-400">Resumo por rede social e engajamento ativo</p>
            </div>
            <button
              onClick={() => onNavigate('analytics')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>Ver Detalhes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {accounts.map((acc) => {
              const cfg = PLATFORM_CONFIG[acc.platform];
              return (
                <div
                  key={acc.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={acc.avatarUrl}
                        alt={acc.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                      <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${
                        acc.connected ? 'bg-emerald-500' : 'bg-slate-500'
                      }`} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{acc.name}</span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${cfg.bgBadge}`}>
                          {cfg.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{acc.handle}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <div className="text-xs font-bold text-white">
                        {(acc.followers / 1000).toFixed(1)}k
                      </div>
                      <span className="text-[10px] text-slate-400">Seguidores</span>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-emerald-400">
                        {acc.engagementRate}%
                      </div>
                      <span className="text-[10px] text-slate-400">Engajamento</span>
                    </div>

                    <button
                      onClick={() => onNavigate('studio')}
                      className="hidden sm:flex px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
                    >
                      Postar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Best Hours to Post Heatmap Preview */}
          <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Melhores Horários para Postar (Algoritmo IA)
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">Pico de Distribuição</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-center">
                <span className="text-[10px] text-slate-400 block">Instagram</span>
                <strong className="text-indigo-300 font-bold block mt-0.5">18:30 - 20:00</strong>
                <span className="text-[10px] text-emerald-400 font-medium">Ter / Qui / Dom</span>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                <span className="text-[10px] text-slate-400 block">LinkedIn</span>
                <strong className="text-blue-300 font-bold block mt-0.5">08:00 - 09:30</strong>
                <span className="text-[10px] text-emerald-400 font-medium">Seg / Qua / Sex</span>
              </div>
              <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-center">
                <span className="text-[10px] text-slate-400 block">TikTok</span>
                <strong className="text-cyan-300 font-bold block mt-0.5">19:45 - 22:00</strong>
                <span className="text-[10px] text-emerald-400 font-medium">Todos os dias</span>
              </div>
              <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-center">
                <span className="text-[10px] text-slate-400 block">X (Twitter)</span>
                <strong className="text-sky-300 font-bold block mt-0.5">12:00 - 14:00</strong>
                <span className="text-[10px] text-emerald-400 font-medium">Seg a Sex</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Scheduled Posts Queue (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-lg space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  Próximos Posts Agendados
                </h3>
                <p className="text-xs text-slate-400">Fila automática de publicação</p>
              </div>
              <button
                onClick={() => onNavigate('calendar')}
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                <span>Ver Todos</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {upcomingPosts.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  Nenhum post agendado. Use o estúdio criativo para planejar sua semana!
                </div>
              ) : (
                upcomingPosts.map((post) => {
                  const cfg = PLATFORM_CONFIG[post.platform];
                  return (
                    <div
                      key={post.id}
                      onClick={() => onSelectPostToEdit(post)}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80 transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${cfg.bgBadge}`}>
                          {cfg.name} • {post.contentType === 'carousel' ? 'Carrossel' : post.contentType === 'reels_script' ? 'Reels' : 'Post'}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{post.scheduledDate} às {post.scheduledTime}</span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {post.headline || post.topic}
                      </h4>

                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {post.content}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => onNavigate('studio')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Agendar Novo Conteúdo com IA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate('ideas')}
          className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900/40 border border-indigo-500/20 hover:border-indigo-500/50 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">Banco de Ideias Virais</h4>
          <p className="text-xs text-slate-400 mt-1">Gere 10 ganchos magnéticos e tópicos de alto engajamento no seu nicho.</p>
        </button>

        <button
          onClick={() => onNavigate('bio')}
          className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-900/40 border border-purple-500/20 hover:border-purple-500/50 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">Otimizador de Bio & Perfil</h4>
          <p className="text-xs text-slate-400 mt-1">Transforme seu perfil em um ímã de seguidores qualificados e clientes.</p>
        </button>

        <button
          onClick={() => onNavigate('calendar')}
          className="p-4 rounded-2xl bg-gradient-to-br from-sky-950/40 to-slate-900/40 border border-sky-500/20 hover:border-sky-500/50 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">Planejador Semanal 7 Dias</h4>
          <p className="text-xs text-slate-400 mt-1">Preencha sua semana inteira com estratégia editorial validada em 1 clique.</p>
        </button>

        <button
          onClick={() => onNavigate('brand')}
          className="p-4 rounded-2xl bg-gradient-to-br from-pink-950/40 to-slate-900/40 border border-pink-500/20 hover:border-pink-500/50 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">Voz da Marca (Brand Voice)</h4>
          <p className="text-xs text-slate-400 mt-1">Configure o tom de voz, regras de copywriting e personas da sua marca.</p>
        </button>
      </div>
    </div>
  );
};
