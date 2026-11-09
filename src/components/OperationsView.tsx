import React, { useState } from 'react';
import {
  Calendar,
  TrendingUp,
  FileText,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
  Check,
  X,
  Send,
  Plus,
  Play,
  Share2,
  ThumbsUp,
  MessageCircle,
  Eye,
  Sliders,
  ArrowRight
} from 'lucide-react';
import { ScheduledPost, SocialPlatform, SocialAccount } from '../types';
import { INITIAL_SCHEDULED_POSTS, PLATFORM_CONFIG } from '../data/mockData';

interface OperationsViewProps {
  onOpenStudio: (topic?: string, platform?: SocialPlatform) => void;
  accounts: SocialAccount[];
}

export const OperationsView: React.FC<OperationsViewProps> = ({ onOpenStudio, accounts }) => {
  const [scheduledList, setScheduledList] = useState<ScheduledPost[]>(INITIAL_SCHEDULED_POSTS);
  const [platformFilter, setPlatformFilter] = useState<SocialPlatform | 'all'>('all');
  const [aiAssistantInput, setAiAssistantInput] = useState('');
  const [aiAssistantResponses, setAiAssistantResponses] = useState<string[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Approval queue items
  const approvalItems = scheduledList.filter((p) => p.status === 'pending_review');

  const handleApprove = (id: string) => {
    setScheduledList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'scheduled' } : p))
    );
  };

  const handleReject = (id: string) => {
    setScheduledList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSendAiPrompt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiAssistantInput.trim()) return;

    const userMsg = aiAssistantInput;
    setAiAssistantInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      setAiAssistantResponses((prev) => [
        ...prev,
        `💡 Ideia gerada para "${userMsg}":\n• Carrossel: 3 erros comuns e como a IA resolve na prática.\n• Reels/TikTok: Gancho de 3 segundos com quebra de padrão e retenção.`
      ]);
      setIsAiTyping(false);
    }, 800);
  };

  // 7 days column definition matching May 19 - May 25, 2026
  const DAYS = [
    { name: 'Seg 19', dateStr: '2026-05-19' },
    { name: 'Ter 20', dateStr: '2026-05-20' },
    { name: 'Qua 21', dateStr: '2026-05-21' },
    { name: 'Qui 22', dateStr: '2026-05-22' },
    { name: 'Sex 23', dateStr: '2026-05-23' },
    { name: 'Sáb 24', dateStr: '2026-05-24' },
    { name: 'Dom 25', dateStr: '2026-05-25' },
  ];

  const getPlatformIconBadge = (platform: SocialPlatform) => {
    switch (platform) {
      case 'instagram':
        return <span className="p-1 rounded-md bg-pink-500 text-white text-[9px] font-bold">IG</span>;
      case 'facebook':
        return <span className="p-1 rounded-md bg-blue-600 text-white text-[9px] font-bold">FB</span>;
      case 'linkedin':
        return <span className="p-1 rounded-md bg-blue-500 text-white text-[9px] font-bold">IN</span>;
      case 'twitter':
        return <span className="p-1 rounded-md bg-slate-800 text-white text-[9px] font-bold">X</span>;
      case 'whatsapp':
        return <span className="p-1 rounded-md bg-emerald-500 text-white text-[9px] font-bold">WA</span>;
      default:
        return <span className="p-1 rounded-md bg-indigo-500 text-white text-[9px] font-bold">IA</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Banner Greeting (Matching Image 2) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Bom dia, Equipe 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sua IA está pronta para planejar, criar e publicar conteúdos que aceleram sua marca.
          </p>
        </div>

        <button
          onClick={() => onOpenStudio()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>+ Criar com IA</span>
        </button>
      </div>

      {/* Top 4 KPI Metrics Cards (Matching Image 2) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-4 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Próximas Postagens</div>
              <div className="text-2xl font-extrabold text-white mt-1">24</div>
              <div className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                ↑ 20% vs últimos 7 dias
              </div>
            </div>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-4 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Engajamento (Esta Semana)</div>
              <div className="text-2xl font-extrabold text-white mt-1">8.7K</div>
              <div className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                ↑ 32% vs últimos 7 dias
              </div>
            </div>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-4 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Conteúdos Criados</div>
              <div className="text-2xl font-extrabold text-white mt-1">56</div>
              <div className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                ↑ 18% vs últimos 7 dias
              </div>
            </div>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileText className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-4 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Tempo Economizado</div>
              <div className="text-2xl font-extrabold text-white mt-1">16.5h</div>
              <div className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                ↑ 42% vs últimos 7 dias
              </div>
            </div>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar (Left 8 cols) + Right Analytics/Assistant (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Content Calendar & Pipeline */}
        <div className="lg:col-span-8 space-y-5">
          {/* Calendar Box (Matching Image 2) */}
          <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-2xl space-y-4">
            {/* Calendar Controls */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-bold text-white">Calendário de Conteúdo</h3>
                <div className="flex items-center gap-1 text-xs text-slate-400 bg-[#080d1e] px-2.5 py-1 rounded-lg border border-slate-800">
                  <button className="hover:text-white"><ChevronLeft className="w-3.5 h-3.5" /></button>
                  <span className="font-semibold text-slate-200">19 de Maio – 25 de Maio de 2026</span>
                  <button className="hover:text-white"><ChevronRight className="w-3.5 h-3.5" /></button>
                </div>
                <button className="px-2.5 py-1 rounded-lg bg-[#080d1e] text-slate-300 text-xs font-semibold border border-slate-800 hover:text-white">
                  Hoje
                </button>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value as any)}
                  className="bg-[#080d1e] border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1 focus:outline-none"
                >
                  <option value="all">Todas as Redes</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">X (Twitter)</option>
                </select>
                <button className="px-2.5 py-1 rounded-lg bg-[#080d1e] text-xs text-slate-300 border border-slate-800">
                  Semana ⌵
                </button>
              </div>
            </div>

            {/* 7 Days Grid Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
              {DAYS.map((day) => {
                const dayPosts = scheduledList.filter((p) => {
                  const matchesDay = p.scheduledDate === day.dateStr;
                  const matchesPlatform = platformFilter === 'all' || p.platform === platformFilter;
                  return matchesDay && matchesPlatform;
                });

                return (
                  <div
                    key={day.dateStr}
                    className="bg-[#080d1e]/80 border border-slate-900 rounded-xl p-2 min-h-[340px] flex flex-col justify-between space-y-2"
                  >
                    <div>
                      {/* Day Header */}
                      <div className="text-[11px] font-bold text-slate-400 border-b border-slate-900 pb-1 mb-2 text-center">
                        {day.name}
                      </div>

                      {/* Day Posts */}
                      <div className="space-y-2">
                        {dayPosts.map((post) => (
                          <div
                            key={post.id}
                            className="bg-[#0e172e] border border-slate-800/80 rounded-lg p-2 shadow-sm space-y-1.5 hover:border-slate-700 transition-all cursor-pointer group"
                            onClick={() => onOpenStudio(post.topic, post.platform)}
                          >
                            <div className="flex items-center justify-between text-[10px]">
                              <div className="flex items-center gap-1">
                                {getPlatformIconBadge(post.platform)}
                                <span className="text-slate-300 font-mono text-[9px]">{post.scheduledTime}</span>
                              </div>
                            </div>

                            {/* Thumbnail if present */}
                            {post.thumbnailUrl && (
                              <div className="relative aspect-video rounded-md overflow-hidden bg-slate-900">
                                <img
                                  src={post.thumbnailUrl}
                                  alt={post.headline}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                            )}

                            <div className="text-[10px] font-bold text-white line-clamp-2 leading-tight">
                              {post.headline}
                            </div>

                            <span
                              className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                                post.status === 'scheduled'
                                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                                  : post.status === 'pending_review'
                                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                  : 'bg-slate-700/30 text-slate-400 border border-slate-700/40'
                              }`}
                            >
                              {post.status === 'pending_review' ? 'Revisão Pendente' : post.status === 'scheduled' ? 'Agendado' : 'Rascunho'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenStudio(`Novo conteúdo para ${day.name}`)}
                      className="w-full py-1.5 text-[10px] font-semibold text-slate-500 hover:text-white border border-dashed border-slate-800 hover:border-slate-600 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bottom Add Content Button */}
            <div className="text-center pt-2">
              <button
                onClick={() => onOpenStudio()}
                className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Adicionar Conteúdo</span>
              </button>
            </div>
          </div>

          {/* Esteira de Produção de Conteúdo (Content Pipeline) */}
          <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-2xl space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Esteira de Produção de Conteúdo (Pipeline)</h4>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-center text-center">
              {/* Step 1 */}
              <div className="p-3 bg-[#080d1e] rounded-xl border border-slate-900">
                <span className="text-[10px] text-slate-400 font-semibold block">Geração de Ideias</span>
                <span className="text-xl font-extrabold text-white block mt-1">18</span>
              </div>

              {/* Step 2 */}
              <div className="p-3 bg-[#080d1e] rounded-xl border border-slate-900">
                <span className="text-[10px] text-slate-400 font-semibold block">Em Produção</span>
                <span className="text-xl font-extrabold text-indigo-400 block mt-1">12</span>
              </div>

              {/* Step 3 */}
              <div className="p-3 bg-[#080d1e] rounded-xl border border-slate-900">
                <span className="text-[10px] text-slate-400 font-semibold block">Pronto para Revisão</span>
                <span className="text-xl font-extrabold text-amber-400 block mt-1">7</span>
              </div>

              {/* Step 4 */}
              <div className="p-3 bg-[#080d1e] rounded-xl border border-slate-900">
                <span className="text-[10px] text-slate-400 font-semibold block">Aprovado</span>
                <span className="text-xl font-extrabold text-emerald-400 block mt-1">24</span>
              </div>

              {/* Step 5 */}
              <div className="p-3 bg-[#080d1e] rounded-xl border border-slate-900">
                <span className="text-[10px] text-slate-400 font-semibold block">Agendado</span>
                <span className="text-xl font-extrabold text-sky-400 block mt-1">24</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Performance + AI Assistant + Approval Queue (Matching Image 2) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Content Performance Card with Chart */}
          <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Desempenho de Conteúdo</span>
              <span className="text-slate-400 bg-[#080d1e] px-2 py-0.5 rounded border border-slate-800 text-[10px]">
                Esta Semana ⌵
              </span>
            </div>

            {/* Line chart visualization */}
            <div className="h-32 relative flex items-end justify-between pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100">
                {/* Reach Line (Blue) */}
                <path
                  d="M 10 80 Q 50 30, 100 45 T 200 20 T 290 15"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Engagement Line (Purple) */}
                <path
                  d="M 10 90 Q 50 60, 100 70 T 200 40 T 290 35"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Tooltip dot */}
                <circle cx="200" cy="20" r="4" fill="#3b82f6" />
                <rect x="180" y="2" width="40" height="15" rx="3" fill="#1e293b" />
                <text x="185" y="12" fill="#fff" fontSize="8" fontWeight="bold">12.4K</text>
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-900 pt-2 font-mono">
              <div className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-blue-500 inline-block" /> Alcance
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-purple-500 inline-block" /> Engajamento
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-emerald-500 inline-block" /> Cliques
              </div>
            </div>
          </div>

          {/* Assistente de IA (Beta) Box */}
          <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-2xl space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Assistente de IA</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  Beta
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#080d1e] rounded-xl border border-slate-900 text-xs text-slate-300 space-y-2">
              <p className="text-[11px] leading-relaxed">
                Aqui estão algumas ideias de conteúdo para esta semana desenhadas para máximo engajamento:
              </p>
              <ul className="space-y-1 text-[11px] text-slate-400">
                <li>• <strong>Carrossel:</strong> 5 hacks de produtividade com IA para marketing</li>
                <li>• <strong>Reels:</strong> Bastidores da rotina de um time criativo</li>
                <li>• <strong>Post:</strong> Análise de tendência com gancho magnético</li>
              </ul>

              {aiAssistantResponses.map((r, i) => (
                <div key={i} className="pt-2 border-t border-slate-800 text-[11px] text-indigo-200 whitespace-pre-line">
                  {r}
                </div>
              ))}

              <button
                onClick={() => onOpenStudio('5 hacks de produtividade com IA para marketing')}
                className="w-full py-1.5 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 rounded-lg hover:bg-indigo-500/10 transition-colors"
              >
                + Gerar Mais Ideias com IA
              </button>
            </div>

            {/* Input prompt */}
            <form onSubmit={handleSendAiPrompt} className="relative">
              <input
                type="text"
                value={aiAssistantInput}
                onChange={(e) => setAiAssistantInput(e.target.value)}
                placeholder="Pergunte algo à IA ou peça ideias..."
                className="w-full bg-[#080d1e] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 pr-9 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={isAiTyping || !aiAssistantInput.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 p-1"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Fila de Aprovação (Approval Queue Box) */}
          <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Fila de Aprovação</span>
              <span className="text-slate-400 text-[10px] hover:text-white cursor-pointer">Ver tudo</span>
            </div>

            <div className="space-y-2.5">
              {approvalItems.length === 0 ? (
                <div className="text-center py-4 text-slate-500 text-xs">
                  Todos os posts foram aprovados!
                </div>
              ) : (
                approvalItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#080d1e] rounded-xl border border-slate-900 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {item.thumbnailUrl && (
                        <img
                          src={item.thumbnailUrl}
                          alt={item.headline}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{item.headline}</div>
                        <span className="text-[10px] text-slate-400 block capitalize">
                          {item.platform} • {item.scheduledDate.slice(5)} {item.scheduledTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white transition-colors"
                        title="Aprovar Publicação"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors"
                        title="Rejeitar Publicação"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
