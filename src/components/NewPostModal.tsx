import React, { useState } from 'react';
import {
  Sparkles,
  X,
  RefreshCw,
  Send,
  Calendar,
  Layers,
  AlignLeft,
  Video,
  FileText
} from 'lucide-react';
import { SocialAccount, SocialPlatform, ContentFormat, ContentTone, ScheduledPost } from '../types';
import { apiGeneratePost } from '../services/api';
import { PLATFORM_CONFIG } from '../data/mockData';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: SocialAccount[];
  currentAccount: SocialAccount;
  onPostScheduled: (post: ScheduledPost) => void;
  onNavigateToStudioWithTopic: (topic: string, platform: SocialPlatform) => void;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  accounts,
  currentAccount,
  onPostScheduled,
  onNavigateToStudioWithTopic,
}) => {
  if (!isOpen) return null;

  const [platform, setPlatform] = useState<SocialPlatform>(currentAccount.platform);
  const [contentType, setContentType] = useState<ContentFormat>('carousel');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<ContentTone>('viral');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateAndSchedule = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);

    try {
      const generated = await apiGeneratePost({
        platform,
        contentType,
        topic,
        tone,
        includeHashtags: true,
        includeVisualPrompt: true,
      });

      const today = new Date();
      today.setDate(today.getDate() + 1);
      const dateStr = today.toISOString().split('T')[0];

      const newScheduled: ScheduledPost = {
        id: 'modal-sched-' + Date.now(),
        platform: generated.platform,
        contentType: generated.contentType,
        topic: generated.topic,
        headline: generated.headline,
        content: generated.content,
        scheduledDate: dateStr,
        scheduledTime: '18:30',
        status: 'scheduled',
        hashtags: generated.hashtags,
        slides: generated.slides,
        scriptSections: generated.scriptSections,
        threadTweets: generated.threadTweets,
      };

      onPostScheduled(newScheduled);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenInStudio = () => {
    onNavigateToStudioWithTopic(topic, platform);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 text-slate-100 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">Criar Post Rápido com IA</h3>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4">
          {/* Platform */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Rede Social</label>
            <div className="grid grid-cols-5 gap-1.5">
              {(['instagram', 'linkedin', 'twitter', 'tiktok', 'youtube'] as SocialPlatform[]).map((p) => {
                const isSelected = platform === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`p-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                        : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {p === 'twitter' ? 'X' : p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Format */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Formato</label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'carousel' as ContentFormat, label: 'Carrossel' },
                { id: 'feed' as ContentFormat, label: 'Post Feed' },
                { id: 'reels_script' as ContentFormat, label: 'Reels/Shorts' },
                { id: 'thread' as ContentFormat, label: 'Thread' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setContentType(f.id)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all border ${
                    contentType === f.id
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Tema / Ideia</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Como triplicar visualizações com 3 dicas práticas..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
            />
          </div>

          {/* Tone */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Tom de Voz</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as ContentTone)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <option value="viral">Viral & Alto Impacto 🔥</option>
              <option value="professional">Profissional & Corporativo 💼</option>
              <option value="educational">Educativo & Didático 📚</option>
              <option value="storytelling">Storytelling & Narrativo 📖</option>
              <option value="persuasive">Persuasivo & Vendas 🎯</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-2">
          <button
            type="button"
            onClick={handleOpenInStudio}
            className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Abrir no Estúdio Completo →
          </button>

          <button
            type="button"
            onClick={handleGenerateAndSchedule}
            disabled={isLoading || !topic.trim()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 active:scale-95"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Gerando com IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Gerar & Agendar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
