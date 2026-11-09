import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Video,
  FileText,
  AlignLeft,
  Calendar,
  Copy,
  Check,
  Send,
  Lightbulb,
  Sliders,
  Image,
  RefreshCw,
  Hash,
  Clock,
  ArrowRight
} from 'lucide-react';
import {
  GeneratedPost,
  SocialPlatform,
  ContentFormat,
  ContentTone,
  ContentGoal,
  SocialAccount,
  ScheduledPost
} from '../types';
import { apiGeneratePost } from '../services/api';
import { PLATFORM_CONFIG } from '../data/mockData';
import { LivePreview } from './LivePreview';

interface StudioViewProps {
  currentAccount?: SocialAccount;
  onSchedulePost: (post: ScheduledPost) => void;
  onPostGenerated?: (post: GeneratedPost) => void;
  initialTopic?: string;
}

export const StudioView: React.FC<StudioViewProps> = ({
  currentAccount,
  onSchedulePost,
  onPostGenerated,
  initialTopic = ''
}) => {
  const [platform, setPlatform] = useState<SocialPlatform>(currentAccount?.platform || 'instagram');
  const [contentType, setContentType] = useState<ContentFormat>('carousel');
  const [topic, setTopic] = useState(initialTopic || '5 Estratégias de Crescimento nas Redes Sociais usando IA');
  const [tone, setTone] = useState<ContentTone>('viral');
  const [goal, setGoal] = useState<ContentGoal>('engagement');
  const [targetAudience, setTargetAudience] = useState('Empreendedores, criadores de conteúdo e profissionais do marketing');
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeVisualPrompt, setIncludeVisualPrompt] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const [activeTab, setActiveTab] = useState<'copy' | 'slides' | 'script' | 'thread' | 'visual' | 'tips'>('copy');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  // Quick suggestions for rapid ideation
  const QUICK_TOPICS = [
    '5 Ferramentas de IA para Criadores',
    'O maior erro de posicionamento nas redes',
    'Como criei um sistema de 10 posts semanais',
    'Framework de 3 etapas para vender sem parecer vendedor',
    'Mitos sobre o algoritmo que você deve ignorar'
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setLoadingStep('Analisando tendências de audiência...');

    const timer1 = setTimeout(() => setLoadingStep('Criando gancho magnético e estrutura...'), 600);
    const timer2 = setTimeout(() => setLoadingStep('Otimizando formato para o algoritmo...'), 1200);

    try {
      const result = await apiGeneratePost({
        platform,
        contentType,
        topic,
        tone,
        goal,
        targetAudience,
        includeHashtags,
        includeVisualPrompt,
      });

      setGeneratedPost(result);
      if (onPostGenerated) onPostGenerated(result);

      if (result.contentType === 'carousel') setActiveTab('slides');
      else if (result.contentType === 'reels_script') setActiveTab('script');
      else if (result.contentType === 'thread') setActiveTab('thread');
      else setActiveTab('copy');
    } catch (err) {
      console.error(err);
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleScheduleCurrent = () => {
    if (!generatedPost) return;
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const dateStr = today.toISOString().split('T')[0];

    const newScheduled: ScheduledPost = {
      id: 'sched-' + Date.now(),
      platform: generatedPost.platform,
      contentType: generatedPost.contentType,
      topic: generatedPost.topic,
      headline: generatedPost.headline,
      content: generatedPost.content,
      scheduledDate: dateStr,
      scheduledTime: '18:30',
      status: 'scheduled',
      hashtags: generatedPost.hashtags,
      slides: generatedPost.slides,
      scriptSections: generatedPost.scriptSections,
      threadTweets: generatedPost.threadTweets,
    };

    onSchedulePost(newScheduled);
    setScheduleSuccess(true);
    setTimeout(() => setScheduleSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Estúdio Criativo com IA</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Gere posts de alto impacto, carrosséis estruturados, roteiros para Reels e threads no X em segundos.
          </p>
        </div>

        {generatedPost && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleScheduleCurrent}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                scheduleSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 active:scale-95'
              }`}
            >
              {scheduleSuccess ? <Check className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
              {scheduleSuccess ? 'Agendado com Sucesso!' : 'Agendar no Calendário'}
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Form on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: CONTROLS & GENERATOR (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Configuration Card */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-xl space-y-5">
            {/* Platform Selection */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
                1. Escolha a Plataforma
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(['instagram', 'linkedin', 'twitter', 'tiktok', 'youtube', 'facebook'] as SocialPlatform[]).map((p) => {
                  const cfg = PLATFORM_CONFIG[p];
                  const isSelected = platform === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlatform(p)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                        isSelected
                          ? `${cfg.bgBadge} border-indigo-500 ring-2 ring-indigo-500/30 scale-[1.02]`
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-sm font-bold capitalize">{p === 'twitter' ? 'X' : p}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Format Selection */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
                2. Formato do Conteúdo
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'carousel' as ContentFormat, name: 'Carrossel', icon: Layers, desc: '5-7 slides de valor' },
                  { id: 'feed' as ContentFormat, name: 'Post Feed', icon: AlignLeft, desc: 'Legenda + Gancho' },
                  { id: 'reels_script' as ContentFormat, name: 'Roteiro de Vídeo', icon: Video, desc: 'Reels / Shorts / TikTok' },
                  { id: 'thread' as ContentFormat, name: 'Fio / Thread', icon: FileText, desc: 'Sequência conectada' },
                ].map((item) => {
                  const isSelected = contentType === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setContentType(item.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-indigo-600/15 border-indigo-500 text-white ring-1 ring-indigo-500/50'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                      <span className="text-xs font-bold block">{item.name}</span>
                      <span className="text-[10px] text-slate-400 block">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Topic Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  3. Tema / Ideia Principal
                </label>
                <span className="text-[11px] text-indigo-400 flex items-center gap-1 font-medium">
                  <Lightbulb className="w-3 h-3" /> Sugestões rápidas abaixo
                </span>
              </div>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: Como usar IA para economizar 10 horas por semana na criação de conteúdo..."
                rows={3}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
              />

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {QUICK_TOPICS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTopic(item)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 text-slate-300 hover:text-white transition-colors"
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone & Goal Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Tom de Voz
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as ContentTone)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="viral">Viral & Alto Impacto 🔥</option>
                  <option value="professional">Profissional & Corporativo 💼</option>
                  <option value="educational">Educativo & Didático 📚</option>
                  <option value="storytelling">Storytelling & Narrativo 📖</option>
                  <option value="persuasive">Persuasivo & Vendas 🎯</option>
                  <option value="casual">Descontraído & Leve ☕</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Objetivo Principal
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as ContentGoal)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="engagement">Maximizar Engajamento & Comentários</option>
                  <option value="leads">Capturar Leads & Contatos</option>
                  <option value="sales">Gerar Vendas Diretas</option>
                  <option value="brand_awareness">Autoridade & Reconhecimento de Marca</option>
                  <option value="community">Fortalecer Comunidade</option>
                </select>
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                Público Alvo
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Ex: Criadores de conteúdo, gerentes de produto, agências..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap items-center gap-4 pt-1 border-t border-slate-800/80 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeHashtags}
                  onChange={(e) => setIncludeHashtags(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/30"
                />
                <span>Hashtags categorizadas</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeVisualPrompt}
                  onChange={(e) => setIncludeVisualPrompt(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/30"
                />
                <span>Prompt para imagem/vídeo IA</span>
              </label>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !topic.trim()}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>{loadingStep || 'Gerando com Inteligência Artificial...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Gerar Postagem de Alta Performance</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Result Breakdown Tabs */}
          {generatedPost && (
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  <button
                    onClick={() => setActiveTab('copy')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'copy'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    Texto & Legenda
                  </button>

                  {generatedPost.slides && generatedPost.slides.length > 0 && (
                    <button
                      onClick={() => setActiveTab('slides')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        activeTab === 'slides'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Slides ({generatedPost.slides.length})
                    </button>
                  )}

                  {generatedPost.scriptSections && generatedPost.scriptSections.length > 0 && (
                    <button
                      onClick={() => setActiveTab('script')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        activeTab === 'script'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      Roteiro Cronometrado
                    </button>
                  )}

                  {generatedPost.threadTweets && generatedPost.threadTweets.length > 0 && (
                    <button
                      onClick={() => setActiveTab('thread')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        activeTab === 'thread'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Fio do X ({generatedPost.threadTweets.length})
                    </button>
                  )}

                  {generatedPost.visualPrompt && (
                    <button
                      onClick={() => setActiveTab('visual')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        activeTab === 'visual'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <Image className="w-3.5 h-3.5" />
                      Prompt Visual
                    </button>
                  )}

                  <button
                    onClick={() => setActiveTab('tips')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'tips'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    Dicas & Métricas
                  </button>
                </div>

                <button
                  onClick={() => handleCopy(generatedPost.content, 'full')}
                  className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  {copiedSection === 'full' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSection === 'full' ? 'Copiado!' : 'Copiar Legenda'}
                </button>
              </div>

              {/* Tab 1: Copy / Text */}
              {activeTab === 'copy' && (
                <div className="space-y-4">
                  {generatedPost.headline && (
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                        Gancho da Primeira Linha
                      </span>
                      <p className="text-sm font-semibold text-white">{generatedPost.headline}</p>
                    </div>
                  )}

                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Texto Principal Formatado
                    </span>
                    <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                      {generatedPost.content}
                    </div>
                  </div>

                  {generatedPost.hashtags && generatedPost.hashtags.length > 0 && (
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                          <Hash className="w-3 h-3 text-sky-400" />
                          Hashtags Selecionadas
                        </span>
                        <button
                          onClick={() => handleCopy(generatedPost.hashtags.join(' '), 'tags')}
                          className="text-[11px] text-sky-400 hover:underline"
                        >
                          {copiedSection === 'tags' ? 'Copiadas!' : 'Copiar Tags'}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {generatedPost.hashtags.map((h, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-300 border border-sky-500/20"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Carousel Slides */}
              {activeTab === 'slides' && generatedPost.slides && (
                <div className="space-y-3">
                  {generatedPost.slides.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px]">
                            {s.slideNumber}
                          </span>
                          {s.title}
                        </span>
                        <button
                          onClick={() => handleCopy(`${s.title}\n\n${s.body}`, `slide-${idx}`)}
                          className="text-[11px] text-slate-400 hover:text-white"
                        >
                          {copiedSection === `slide-${idx}` ? 'Copiado!' : 'Copiar'}
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{s.body}</p>
                      {s.visualTip && (
                        <div className="mt-2 text-[11px] text-amber-300/80 flex items-center gap-1.5 bg-amber-500/5 px-2.5 py-1 rounded-lg border border-amber-500/15">
                          <Sparkles className="w-3 h-3 shrink-0" />
                          <span>Dica Visual: {s.visualTip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Reels / TikTok Script */}
              {activeTab === 'script' && generatedPost.scriptSections && (
                <div className="space-y-3">
                  {generatedPost.scriptSections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-mono font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {sec.timeRange}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">Bloco {idx + 1}</span>
                      </div>
                      <div className="text-xs text-slate-200">
                        <strong className="text-indigo-300">Fala / Áudio:</strong> "{sec.spokenAudio}"
                      </div>
                      <div className="text-xs text-slate-400">
                        <strong className="text-slate-300">Ação Visual:</strong> {sec.visualAction}
                      </div>
                      {sec.onScreenText && (
                        <div className="text-[11px] text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                          Texto na tela: <strong>{sec.onScreenText}</strong>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: Twitter Thread */}
              {activeTab === 'thread' && generatedPost.threadTweets && (
                <div className="space-y-3">
                  {generatedPost.threadTweets.map((tw, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-sky-400">Tweet {tw.tweetNumber} / {generatedPost.threadTweets?.length}</span>
                        <button
                          onClick={() => handleCopy(tw.text, `tw-${idx}`)}
                          className="text-[11px] text-slate-400 hover:text-white"
                        >
                          {copiedSection === `tw-${idx}` ? 'Copiado!' : 'Copiar'}
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">{tw.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 5: Visual Prompt */}
              {activeTab === 'visual' && generatedPost.visualPrompt && (
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                      <Image className="w-4 h-4" />
                      Prompt Pronto para Midjourney / Imagen / DALL-E
                    </span>
                    <button
                      onClick={() => handleCopy(generatedPost.visualPrompt || '', 'vis-prompt')}
                      className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      {copiedSection === 'vis-prompt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedSection === 'vis-prompt' ? 'Copiado!' : 'Copiar Prompt'}
                    </button>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 font-mono leading-relaxed border border-slate-800">
                    {generatedPost.visualPrompt}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    💡 Cole este prompt em qualquer gerador de imagem para obter criativos estéticos em 4K.
                  </p>
                </div>
              )}

              {/* Tab 6: Tips & Predictions */}
              {activeTab === 'tips' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Potencial Viral</span>
                      <div className="text-lg font-bold text-emerald-400 mt-0.5">
                        {generatedPost.estimatedReach?.score || 94}/100
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Melhor Horário</span>
                      <div className="text-xs font-bold text-indigo-300 mt-1">
                        {generatedPost.estimatedReach?.peakHour || '18:30 às 20:00'}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Emoção Alvo</span>
                      <div className="text-xs font-bold text-amber-300 mt-1 truncate">
                        {generatedPost.estimatedReach?.targetEmotion || 'Curiosidade'}
                      </div>
                    </div>
                  </div>

                  {generatedPost.tips && generatedPost.tips.length > 0 && (
                    <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold text-slate-300 block mb-2">Recomendações de Distribuição:</span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {generatedPost.tips.map((t, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-indigo-400 font-bold">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: LIVE SIMULATOR / PREVIEW (5 cols) */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                Simulador Multi-Plataforma
              </span>
              <span className="text-[11px] text-slate-500">Preview Pixel-Perfect</span>
            </div>

            <LivePreview
              post={
                generatedPost || {
                  id: 'preview-initial',
                  platform,
                  contentType,
                  topic,
                  headline: topic,
                  content: `Se você quer se destacar no ${platform} em 2026, você não precisa de mais posts diários.\n\nVocê precisa de clareza estratégica e de ganchos que prendam a atenção nos primeiros 3 segundos.\n\nQual destas prioridades tem sido o maior desafio para você hoje? Comente abaixo! 👇`,
                  callToAction: 'Salve este post para consultar mais tarde!',
                  hashtags: [`#${platform}`, '#SocialMediaMaster', '#Crescimento', '#IA'],
                  estimatedReach: { score: 94, peakHour: '18:30', targetEmotion: 'Curiosidade' },
                  tips: ['Poste no horário de pico', 'Responda comentários nas primeiras 2h'],
                  createdAt: new Date().toISOString()
                }
              }
              currentAccount={currentAccount}
              previewPlatform={platform}
              onPlatformChange={(p) => setPlatform(p)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
