import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Clock,
  Filter,
  Layers,
  Video,
  FileText,
  AlignLeft,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Download
} from 'lucide-react';
import { ScheduledPost, SocialPlatform, ContentFormat } from '../types';
import { PLATFORM_CONFIG } from '../data/mockData';
import { apiCalendarPlan } from '../services/api';

interface CalendarViewProps {
  scheduledPosts: ScheduledPost[];
  onAddPost: (post: ScheduledPost) => void;
  onDeletePost: (id: string) => void;
  onOpenStudioWithTopic: (topic: string, platform?: SocialPlatform) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  scheduledPosts,
  onAddPost,
  onDeletePost,
  onOpenStudioWithTopic
}) => {
  const [platformFilter, setPlatformFilter] = useState<SocialPlatform | 'all'>('all');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  // Simple current week generation (Monday to Sunday)
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 is Sunday
  const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const mondayDate = new Date(today);
  mondayDate.setDate(today.getDate() + mondayOffset);

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(mondayDate);
    d.setDate(mondayDate.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('pt-BR', { weekday: 'short' });
    const dayNumber = d.getDate();
    return { dateStr, dayName, dayNumber, fullDate: d };
  });

  const filteredPosts = scheduledPosts.filter((p) => {
    if (platformFilter === 'all') return true;
    return p.platform === platformFilter;
  });

  const handleAutoFillWeek = async () => {
    setIsGeneratingPlan(true);
    try {
      const plan = await apiCalendarPlan('Inteligência Artificial e Negócios Digitais', 7);
      
      // Map generated plan items to the current week days
      plan.forEach((item, index) => {
        const targetDay = weekDays[index % weekDays.length];
        const newPost: ScheduledPost = {
          id: 'auto-plan-' + Date.now() + '-' + index,
          platform: item.platform,
          contentType: (item.contentType.toLowerCase().includes('carrossel')
            ? 'carousel'
            : item.contentType.toLowerCase().includes('reels') || item.contentType.toLowerCase().includes('shorts')
            ? 'reels_script'
            : item.contentType.toLowerCase().includes('thread')
            ? 'thread'
            : 'feed') as ContentFormat,
          topic: item.topic,
          headline: item.hook,
          content: `${item.hook}\n\nNeste post, vamos explorar as melhores práticas sobre ${item.topic}.\n\nCompartilhe sua opinião nos comentários! 👇`,
          scheduledDate: targetDay.dateStr,
          scheduledTime: item.time,
          status: 'scheduled',
          hashtags: [`#${item.platform}`, '#SocialMediaMaster', '#PlanejamentoSemanal', '#ConteudoEstrategico'],
        };
        onAddPost(newPost);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleExportCalendar = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(scheduledPosts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `cronograma-social-media-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <CalendarIcon className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Calendário Editorial</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Planeje, visualize e automatize a distribuição semanal e mensal de posts por rede social.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCalendar}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar JSON</span>
          </button>

          <button
            onClick={handleAutoFillWeek}
            disabled={isGeneratingPlan}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 rounded-xl shadow-lg shadow-sky-600/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 text-amber-300 ${isGeneratingPlan ? 'animate-spin' : ''}`} />
            <span>{isGeneratingPlan ? 'Preenchendo com IA...' : 'Preencher Semana com IA'}</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-2xl backdrop-blur-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filtro:
          </span>
          <button
            onClick={() => setPlatformFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              platformFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Todas as Redes
          </button>
          {(['instagram', 'linkedin', 'twitter', 'tiktok', 'youtube'] as SocialPlatform[]).map((p) => {
            const isSelected = platformFilter === p;
            return (
              <button
                key={p}
                onClick={() => setPlatformFilter(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {p === 'twitter' ? 'X' : p}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-400 font-medium">
          {filteredPosts.length} posts agendados no período
        </div>
      </div>

      {/* Weekly Visual Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {weekDays.map((day) => {
          const dayPosts = filteredPosts.filter((p) => p.scheduledDate === day.dateStr);
          const isToday = day.dateStr === today.toISOString().split('T')[0];

          return (
            <div
              key={day.dateStr}
              className={`rounded-2xl border p-3 min-h-[380px] flex flex-col justify-between transition-all backdrop-blur-xl ${
                isToday
                  ? 'bg-slate-900/90 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700/80'
              }`}
            >
              <div>
                {/* Day Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      {day.dayName}
                    </span>
                    <span className={`text-base font-extrabold ${isToday ? 'text-indigo-400' : 'text-slate-200'}`}>
                      {day.dayNumber}
                    </span>
                  </div>

                  {isToday && (
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                      Hoje
                    </span>
                  )}
                </div>

                {/* Day Posts List */}
                <div className="space-y-2">
                  {dayPosts.map((post) => {
                    const cfg = PLATFORM_CONFIG[post.platform];
                    return (
                      <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-600 hover:bg-slate-900 transition-all cursor-pointer space-y-1.5 shadow-sm group"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${cfg.bgBadge}`}>
                            {cfg.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5 text-slate-500" />
                            {post.scheduledTime}
                          </span>
                        </div>

                        <h5 className="text-[11px] font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                          {post.headline || post.topic}
                        </h5>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add to this day button */}
              <button
                onClick={() => onOpenStudioWithTopic(`Novo post estratégico para ${day.dayName}`)}
                className="w-full mt-3 py-2 rounded-xl border border-dashed border-slate-800 hover:border-slate-600 text-slate-500 hover:text-slate-300 hover:bg-slate-800/40 text-[11px] font-medium transition-all flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Adicionar</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${PLATFORM_CONFIG[selectedPost.platform].bgBadge}`}>
                  {PLATFORM_CONFIG[selectedPost.platform].name}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedPost.scheduledDate} às {selectedPost.scheduledTime}
                </span>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                {selectedPost.headline || selectedPost.topic}
              </h3>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
                {selectedPost.content}
              </div>
            </div>

            {selectedPost.hashtags && selectedPost.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1 text-[11px] text-sky-400">
                {selectedPost.hashtags.map((h, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">{h}</span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  onDeletePost(selectedPost.id);
                  setSelectedPost(null);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remover do Calendário</span>
              </button>

              <button
                onClick={() => {
                  onOpenStudioWithTopic(selectedPost.topic, selectedPost.platform);
                  setSelectedPost(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Editar no Estúdio IA</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
