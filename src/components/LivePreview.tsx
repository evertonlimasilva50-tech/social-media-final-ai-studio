import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  ThumbsUp,
  Repeat2,
  BarChart2,
  Send,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Music,
  Disc,
  Play,
  Volume2,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';
import { GeneratedPost, SocialAccount, SocialPlatform } from '../types';

interface LivePreviewProps {
  post: GeneratedPost;
  currentAccount?: SocialAccount;
  previewPlatform?: SocialPlatform;
  onPlatformChange?: (platform: SocialPlatform) => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  post,
  currentAccount,
  previewPlatform,
  onPlatformChange
}) => {
  const activePlatform = previewPlatform || post.platform;
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullText = `${post.headline ? post.headline + '\n\n' : ''}${post.content}\n\n${post.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const authorName = currentAccount?.name || 'Everton Silva';
  const authorHandle = currentAccount?.handle || '@everton_tech';
  const avatarUrl = currentAccount?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80';

  const slides = post.slides && post.slides.length > 0 ? post.slides : [
    { slideNumber: 1, title: post.headline || 'Destaque de Conteúdo', body: post.content.slice(0, 140) + '...', visualTip: 'Slide principal' }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900/80 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Top bar with platform selector tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Preview:</span>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {(['instagram', 'linkedin', 'twitter', 'tiktok', 'youtube'] as SocialPlatform[]).map((p) => {
              const isActive = activePlatform === p;
              return (
                <button
                  key={p}
                  onClick={() => onPlatformChange && onPlatformChange(p)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all capitalize ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {p === 'twitter' ? 'X' : p}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-all active:scale-95"
          title="Copiar texto formatado"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 flex items-center justify-center bg-radial from-slate-900 to-slate-950">
        {activePlatform === 'instagram' && (
          /* INSTAGRAM MOCKUP */
          <div className="w-full max-w-sm rounded-3xl bg-black border border-neutral-800 shadow-2xl text-white overflow-hidden font-sans">
            {/* Header */}
            <div className="flex items-center justify-between px-3.5 py-3 border-b border-neutral-900">
              <div className="flex items-center gap-2.5">
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                  <img
                    src={avatarUrl}
                    alt={authorName}
                    className="w-8 h-8 rounded-full object-cover border-2 border-black"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold leading-none">{authorHandle.replace('@', '')}</span>
                    <CheckCircle2 className="w-3 h-3 text-sky-500 fill-sky-500" />
                  </div>
                  <span className="text-[10px] text-neutral-400 block leading-tight">Áudio Original • IA Studio</span>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-neutral-400 cursor-pointer" />
            </div>

            {/* Media Body (Carousel or Feed Image) */}
            <div className="relative aspect-square w-full bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex flex-col justify-between p-6 select-none overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

              {post.contentType === 'carousel' ? (
                <>
                  <div className="flex items-center justify-between text-xs text-indigo-300 font-mono z-10">
                    <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Social Media Master
                    </span>
                    <span className="bg-black/50 px-2 py-0.5 rounded-full text-[11px] font-semibold text-white/90">
                      {activeSlide + 1}/{slides.length}
                    </span>
                  </div>

                  <div className="my-auto z-10 transition-all duration-300">
                    <h3 className="text-xl font-bold tracking-tight text-white mb-3 leading-snug drop-shadow-md">
                      {slides[activeSlide]?.title}
                    </h3>
                    <p className="text-sm text-slate-200 leading-relaxed font-normal">
                      {slides[activeSlide]?.body}
                    </p>
                    {slides[activeSlide]?.visualTip && (
                      <div className="mt-4 p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-amber-300/90 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>{slides[activeSlide]?.visualTip}</span>
                      </div>
                    )}
                  </div>

                  {/* Carousel navigation controls */}
                  <div className="flex items-center justify-between z-10 pt-2">
                    <button
                      onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
                      disabled={activeSlide === 0}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white disabled:opacity-20 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {slides.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === activeSlide ? 'w-5 bg-indigo-400' : 'w-1.5 bg-white/30'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1))}
                      disabled={activeSlide === slides.length - 1}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white disabled:opacity-20 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : post.contentType === 'reels_script' ? (
                <div className="flex flex-col items-center justify-center h-full text-center z-10">
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-1">Roteiro Reels / TikTok</span>
                  <p className="text-base font-bold text-white px-4 leading-tight">{post.headline || post.topic}</p>
                  <div className="mt-4 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 text-[11px] text-slate-300">
                    <Volume2 className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                    <span>0:55 • Áudio em alta</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-between h-full z-10">
                  <div className="flex items-center justify-between text-xs text-indigo-300">
                    <span className="bg-black/40 px-2 py-0.5 rounded-full border border-white/10 font-mono text-[10px]">
                      POST DO FEED
                    </span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="my-auto text-center px-4">
                    <p className="text-xl font-extrabold text-white leading-tight drop-shadow-md">
                      {post.headline || post.topic}
                    </p>
                    <p className="text-xs text-indigo-200/80 mt-2 line-clamp-3">
                      {post.callToAction}
                    </p>
                  </div>
                  <div className="text-[10px] text-center text-slate-400 font-mono">
                    {authorHandle}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="px-3.5 pt-3 pb-1 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="transition-transform active:scale-125"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isLiked ? 'text-rose-500 fill-rose-500' : 'text-white hover:text-neutral-300'
                    }`}
                  />
                </button>
                <MessageCircle className="w-6 h-6 text-white hover:text-neutral-300 cursor-pointer" />
                <Share2 className="w-5 h-5 text-white hover:text-neutral-300 cursor-pointer -rotate-12" />
              </div>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="transition-transform active:scale-125"
              >
                <Bookmark
                  className={`w-6 h-6 transition-colors ${
                    isSaved ? 'text-amber-400 fill-amber-400' : 'text-white hover:text-neutral-300'
                  }`}
                />
              </button>
            </div>

            {/* Likes summary */}
            <div className="px-3.5 py-1 text-xs font-semibold">
              {isLiked ? '1.483 curtidas' : '1.482 curtidas'}
            </div>

            {/* Caption */}
            <div className="px-3.5 pb-3 text-xs leading-relaxed">
              <span className="font-bold mr-1.5">{authorHandle.replace('@', '')}</span>
              <span className="text-neutral-200">
                {isExpanded ? post.content : post.content.slice(0, 120) + (post.content.length > 120 ? '...' : '')}
              </span>
              {post.content.length > 120 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-neutral-400 text-xs ml-1 font-medium hover:underline"
                >
                  {isExpanded ? 'menos' : 'mais'}
                </button>
              )}

              {/* Hashtags */}
              <div className="mt-2 flex flex-wrap gap-1 text-[11px] text-sky-400">
                {post.hashtags.map((h, i) => (
                  <span key={i} className="hover:underline cursor-pointer">{h}</span>
                ))}
              </div>

              <div className="mt-2 text-[10px] text-neutral-500 uppercase tracking-wider">
                HÁ 2 HORAS
              </div>
            </div>
          </div>
        )}

        {activePlatform === 'linkedin' && (
          /* LINKEDIN MOCKUP */
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl p-4 font-sans">
            {/* Header */}
            <div className="flex items-start justify-between pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={avatarUrl}
                  alt={authorName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white hover:text-blue-400 cursor-pointer">{authorName}</span>
                    <span className="text-xs text-slate-400">• 1º</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block line-clamp-1">
                    Estrategista de IA & Crescimento Digital | 24k seguidores
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <span>1 d</span>
                    <span>•</span>
                    <span>Editado</span>
                    <span>•</span>
                    <span>🌐</span>
                  </div>
                </div>
              </div>
              <MoreHorizontal className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
            </div>

            {/* Post Content */}
            <div className="text-xs text-slate-200 leading-relaxed space-y-2 whitespace-pre-line py-1">
              {isExpanded ? post.content : post.content.slice(0, 220) + (post.content.length > 220 ? '...' : '')}
            </div>
            {post.content.length > 220 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-400 text-xs font-semibold hover:underline mt-1 block"
              >
                {isExpanded ? 'Ver menos' : '...ver mais'}
              </button>
            )}

            {/* Visual Attachment (Carousel Document or Image Card) */}
            {post.contentType === 'carousel' && (
              <div className="mt-3 rounded-xl border border-slate-700 bg-slate-950 p-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span className="font-medium text-blue-400">Documento do Carrossel ({activeSlide + 1} de {slides.length})</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
                      disabled={activeSlide === 0}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1))}
                      disabled={activeSlide === slides.length - 1}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="py-6 text-center">
                  <h4 className="text-base font-bold text-white">{slides[activeSlide]?.title}</h4>
                  <p className="text-xs text-slate-300 mt-2 max-w-xs mx-auto">{slides[activeSlide]?.body}</p>
                </div>
              </div>
            )}

            {/* Hashtags */}
            <div className="mt-3 flex flex-wrap gap-1 text-xs text-blue-400">
              {post.hashtags.map((h, i) => (
                <span key={i} className="hover:underline cursor-pointer">{h}</span>
              ))}
            </div>

            {/* Metrics count */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 py-2.5 mt-2 border-b border-slate-800">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1">
                  <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white">👍</span>
                  <span className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[9px] text-white">❤️</span>
                  <span className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[9px] text-white">💡</span>
                </div>
                <span className="ml-1 font-medium">{isLiked ? '349' : '348'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>52 comentários</span>
                <span>•</span>
                <span>19 compartilhamentos</span>
              </div>
            </div>

            {/* LinkedIn Action Row */}
            <div className="flex items-center justify-between pt-2 px-1 text-xs text-slate-300 font-medium">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg hover:bg-slate-800 transition-colors ${
                  isLiked ? 'text-blue-400 font-bold' : ''
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-blue-400' : ''}`} />
                <span>Gostei</span>
              </button>
              <button className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg hover:bg-slate-800 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>Comentar</span>
              </button>
              <button className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg hover:bg-slate-800 transition-colors">
                <Repeat2 className="w-4 h-4" />
                <span>Compartilhar</span>
              </button>
              <button className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg hover:bg-slate-800 transition-colors">
                <Send className="w-4 h-4" />
                <span>Enviar</span>
              </button>
            </div>
          </div>
        )}

        {activePlatform === 'twitter' && (
          /* TWITTER / X MOCKUP */
          <div className="w-full max-w-md rounded-2xl bg-black border border-neutral-800 text-white shadow-2xl p-4 font-sans">
            <div className="flex items-start gap-3">
              <img
                src={avatarUrl}
                alt={authorName}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-sm font-bold truncate">{authorName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
                    <span className="text-xs text-neutral-500">{authorHandle}</span>
                    <span className="text-xs text-neutral-500">· 2h</span>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-neutral-500 hover:text-white cursor-pointer" />
                </div>

                {/* Tweet Body */}
                <div className="text-sm text-neutral-100 leading-normal mt-1 whitespace-pre-line">
                  {post.headline && (
                    <div className="font-bold text-white mb-2">{post.headline}</div>
                  )}
                  {post.content}
                </div>

                {/* Hashtags */}
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-sky-400">
                  {post.hashtags.map((h, i) => (
                    <span key={i} className="hover:underline cursor-pointer">{h}</span>
                  ))}
                </div>

                {/* Thread preview if available */}
                {post.threadTweets && post.threadTweets.length > 1 && (
                  <div className="mt-3 p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                      Fio Conectado (Tweet 2/{post.threadTweets.length}):
                    </span>
                    <p className="text-xs text-neutral-300">
                      {post.threadTweets[1]?.text}
                    </p>
                  </div>
                )}

                {/* Timestamp & Views */}
                <div className="text-xs text-neutral-500 mt-3 pt-2 border-t border-neutral-900 flex items-center gap-1">
                  <span>14:32</span>
                  <span>·</span>
                  <span>09 de Nov de 2026</span>
                  <span>·</span>
                  <span className="text-neutral-300 font-semibold">14,2 mil</span>
                  <span>Visualizações</span>
                </div>

                {/* Interaction icons */}
                <div className="flex items-center justify-between text-neutral-500 pt-3 border-t border-neutral-900 text-xs">
                  <button className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>28</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                    <Repeat2 className="w-4 h-4" />
                    <span>94</span>
                  </button>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      isLiked ? 'text-rose-500' : 'hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                    <span>{isLiked ? '413' : '412'}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                    <BarChart2 className="w-4 h-4" />
                    <span>14.2k</span>
                  </button>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`hover:text-sky-400 transition-colors ${isSaved ? 'text-sky-400' : ''}`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-sky-400' : ''}`} />
                  </button>
                  <button className="hover:text-sky-400 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePlatform === 'tiktok' && (
          /* TIKTOK MOCKUP */
          <div className="w-full max-w-[280px] h-[520px] rounded-[36px] bg-black border-4 border-neutral-800 text-white shadow-2xl relative overflow-hidden font-sans flex flex-col justify-between p-4">
            {/* Phone Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-neutral-900 rounded-full z-30" />

            {/* Video content background simulation */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-black z-0 flex flex-col justify-center items-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mb-4">
                <Play className="w-8 h-8 text-cyan-400 fill-cyan-400 translate-x-0.5" />
              </div>
              <h4 className="text-sm font-bold text-white drop-shadow-md">
                {post.headline || post.topic}
              </h4>
              <p className="text-[11px] text-cyan-200/80 mt-2 font-mono">
                {post.contentType === 'reels_script' ? 'ROTEIRO VIRAL ATIVO' : 'VÍDEO CURTO'}
              </p>
            </div>

            {/* Top Navigation */}
            <div className="flex items-center justify-center gap-4 text-xs font-semibold z-20 pt-4">
              <span className="text-neutral-400">Seguindo</span>
              <span className="text-white border-b-2 border-white pb-0.5">Para Você</span>
            </div>

            {/* Right Side Buttons */}
            <div className="absolute right-3 bottom-16 flex flex-col items-center gap-3 z-20">
              {/* Profile Avatar with follow badge */}
              <div className="relative mb-1">
                <img
                  src={avatarUrl}
                  alt={authorName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[10px] text-white font-bold">
                  +
                </div>
              </div>

              {/* Heart */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex flex-col items-center"
              >
                <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
                  <Heart className={`w-5 h-5 ${isLiked ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                </div>
                <span className="text-[10px] font-bold mt-0.5">{isLiked ? '34.2K' : '34.1K'}</span>
              </button>

              {/* Comments */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-bold mt-0.5">842</span>
              </div>

              {/* Bookmark */}
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex flex-col items-center"
              >
                <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'text-amber-400 fill-amber-400' : 'text-white'}`} />
                </div>
                <span className="text-[10px] font-bold mt-0.5">1.9K</span>
              </button>

              {/* Share */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-bold mt-0.5">520</span>
              </div>

              {/* Vinyl record spinning */}
              <div className="w-9 h-9 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center mt-2 animate-spin-slow">
                <Disc className="w-5 h-5 text-neutral-300" />
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="z-20 pr-12 text-left">
              <span className="text-xs font-bold block mb-1">{authorHandle}</span>
              <p className="text-[11px] text-neutral-200 line-clamp-2 leading-tight">
                {post.content}
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-white/90">
                <Music className="w-3 h-3 text-cyan-400" />
                <span className="truncate">Áudio Original • {authorName}</span>
              </div>
            </div>
          </div>
        )}

        {activePlatform === 'youtube' && (
          /* YOUTUBE SHORTS MOCKUP */
          <div className="w-full max-w-[280px] h-[520px] rounded-[36px] bg-neutral-950 border-4 border-neutral-800 text-white shadow-2xl relative overflow-hidden font-sans flex flex-col justify-between p-4">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-neutral-900 rounded-full z-30" />

            <div className="absolute inset-0 bg-gradient-to-b from-red-950/40 via-neutral-950 to-neutral-950 z-0 flex flex-col justify-center items-center p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center mb-3">
                <Play className="w-6 h-6 text-red-500 fill-red-500 translate-x-0.5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">Shorts</span>
              <h4 className="text-sm font-bold text-white mt-1 leading-snug">
                {post.headline || post.topic}
              </h4>
            </div>

            <div className="flex items-center justify-between z-20 pt-4">
              <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                ▶ Shorts
              </span>
              <MoreHorizontal className="w-4 h-4 text-white" />
            </div>

            <div className="absolute right-3 bottom-14 flex flex-col items-center gap-3.5 z-20">
              <div className="flex flex-col items-center">
                <ThumbsUp className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                <span className="text-[10px] font-medium mt-0.5">8.4K</span>
              </div>
              <div className="flex flex-col items-center">
                <MessageCircle className="w-5 h-5 text-white" />
                <span className="text-[10px] font-medium mt-0.5">431</span>
              </div>
              <div className="flex flex-col items-center">
                <Share2 className="w-5 h-5 text-white" />
                <span className="text-[10px] font-medium mt-0.5">Compartilhar</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-red-600/40 border border-red-500/60 flex items-center justify-center">
                <Music className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="z-20 pr-12 text-left">
              <div className="flex items-center gap-2 mb-2">
                <img src={avatarUrl} alt={authorName} className="w-6 h-6 rounded-full object-cover" />
                <span className="text-xs font-bold truncate">{authorHandle}</span>
                <button className="px-2.5 py-0.5 bg-red-600 text-white rounded-full text-[10px] font-bold">
                  Inscrever-se
                </button>
              </div>
              <p className="text-[11px] text-neutral-200 line-clamp-2 leading-tight">
                {post.content}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer info & estimated stats */}
      <div className="border-t border-slate-800 p-3 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Score de Engajamento: <strong className="text-emerald-400">{post.estimatedReach?.score || 94}/100</strong></span>
        </div>
        <div className="text-slate-400">
          Pico: <strong className="text-slate-200">{post.estimatedReach?.peakHour || '18:30'}</strong>
        </div>
      </div>
    </div>
  );
};
