import React, { useState } from 'react';
import {
  UserCheck,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  RefreshCw,
  Link,
  Target,
  ArrowRight,
  Sliders
} from 'lucide-react';
import { BioOption, SocialAccount } from '../types';
import { apiOptimizeBio } from '../services/api';

interface BioOptimizerViewProps {
  currentAccount?: SocialAccount;
}

export const BioOptimizerView: React.FC<BioOptimizerViewProps> = ({ currentAccount }) => {
  const [niche, setNiche] = useState('Inteligência Artificial, Growth e Criação de Conteúdo');
  const [currentBio, setCurrentBio] = useState(
    'Estrategista de IA e Mídias Digitais.\nAjudando criadores e marcas a acelerarem resultados com automação.\nBaixe o guia gratuito abaixo 👇'
  );
  const [targetAudience, setTargetAudience] = useState('Criadores de conteúdo, agências e profissionais liberais');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [options, setOptions] = useState<BioOption[]>([
    {
      style: 'Autoridade & Resultados',
      bio: `🚀 +500k pessoas impactadas com conteúdo de IA e Growth\n📈 Ajudo marcas a escalarem engajamento sem depender da sorte\n💡 Frameworks validados e sem promessas vazias\n👇 Desbloqueie o material completo:`,
      cta: 'Acessar Treinamento Gratuito',
      highlightNames: ['Resultados', 'Comece Aqui', 'Depoimentos', 'Ferramentas']
    },
    {
      style: 'Viral & Conexão de Comunidade',
      bio: `✨ O segredo da criação de conteúdo sem burnout\n🧠 Dicas práticas de 5 minutos todos os dias\n🔥 Junte-se a mais de 45.000 criadores conscientes\n👇 Faça parte da nossa comunidade exclusiva:`,
      cta: 'Entrar no Grupo VIP',
      highlightNames: ['Dicas Rápidas', 'Bastidores', 'Q&A', 'Comunidade']
    },
    {
      style: 'Alta Conversão & Vendas',
      bio: `🎯 Escale sua presença digital em até 30 dias com IA\n💼 Consultoria e aceleração para criadores e empresas\n⚡ Vagas abertas para a nova turma de mentoria\n👇 Garanta sua vaga com condição especial:`,
      cta: 'Agendar Sessão Estratégica',
      highlightNames: ['Serviços', 'Casos de Sucesso', 'Metodologia', 'FAQ']
    }
  ]);

  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  const handleOptimize = async () => {
    if (!niche.trim()) return;
    setIsLoading(true);
    try {
      const result = await apiOptimizeBio({
        niche,
        currentBio,
        targetAudience
      });
      setOptions(result);
      setActivePreviewIndex(0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyBio = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const activeBio = options[activePreviewIndex] || options[0];
  const avatarUrl = currentAccount?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80';
  const handleName = currentAccount?.handle || '@everton_tech';

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <UserCheck className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">Otimizador de Biografia & Perfil</h1>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Sua biografia é sua página de captura #1. Otimize sua proposta de valor e converta visitantes em seguidores e clientes em 3 segundos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: FORM & OPTIONS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Configuration Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                Nicho / Especialidade
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Ex: Consultor Financeiro, Criador de Conteúdo IA, Nutricionista..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                Biografia Atual (opcional para análise)
              </label>
              <textarea
                value={currentBio}
                onChange={(e) => setCurrentBio(e.target.value)}
                rows={3}
                placeholder="Cole sua bio atual aqui..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                Público Alvo Desejado
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Ex: Pequenos e médios empresários que querem vender mais..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <button
              onClick={handleOptimize}
              disabled={isLoading || !niche.trim()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Otimizando Biografia com IA...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Gerar 3 Propostas de Alta Conversão</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Proposals */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">
              Propostas de Bio Geradas ({options.length})
            </h3>

            {options.map((opt, idx) => {
              const isSelected = activePreviewIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActivePreviewIndex(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer backdrop-blur-xl space-y-3 ${
                    isSelected
                      ? 'bg-purple-950/20 border-purple-500/60 ring-1 ring-purple-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      {opt.style}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyBio(opt.bio, idx);
                        }}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIndex === idx ? 'Copiada!' : 'Copiar Bio'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                    {opt.bio}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <div className="flex items-center gap-1 text-[11px] text-indigo-400">
                      <Link className="w-3.5 h-3.5" />
                      <span>Chamada do Link: <strong>{opt.cta}</strong></span>
                    </div>

                    <span className="text-[10px] text-slate-500">
                      {isSelected ? '✓ Visualizando no Mockup' : 'Clique para visualizar'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE PROFILE BIO MOCKUP (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              Simulador de Perfil ao Vivo
            </span>
            <span className="text-[11px] text-purple-400 font-semibold">{activeBio.style}</span>
          </div>

          {/* Instagram Profile Mockup Card */}
          <div className="rounded-3xl bg-black border border-neutral-800 shadow-2xl p-5 text-white font-sans space-y-4">
            {/* Profile Top Row */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold flex items-center gap-1">
                {handleName.replace('@', '')}
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
              </span>
              <span className="text-xs text-neutral-400">⋯</span>
            </div>

            {/* Avatar & Stats */}
            <div className="flex items-center justify-between gap-4">
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                <img
                  src={avatarUrl}
                  alt="Perfil"
                  className="w-16 h-16 rounded-full object-cover border-2 border-black"
                />
              </div>

              <div className="flex-1 flex justify-around text-center">
                <div>
                  <div className="text-sm font-bold">148</div>
                  <div className="text-[10px] text-neutral-400">publicações</div>
                </div>
                <div>
                  <div className="text-sm font-bold">48,6 mil</div>
                  <div className="text-[10px] text-neutral-400">seguidores</div>
                </div>
                <div>
                  <div className="text-sm font-bold">392</div>
                  <div className="text-[10px] text-neutral-400">seguindo</div>
                </div>
              </div>
            </div>

            {/* Bio Body */}
            <div className="space-y-1.5 text-xs leading-relaxed">
              <div className="font-bold text-sm">Everton Silva | Tech & IA</div>
              <div className="text-neutral-400 text-[11px]">Criador de conteúdo digital</div>
              <div className="whitespace-pre-line text-neutral-100 pt-1">
                {activeBio.bio}
              </div>

              {/* Link */}
              <div className="flex items-center gap-1 text-sky-400 font-medium text-xs pt-1 hover:underline cursor-pointer">
                <Link className="w-3 h-3" />
                <span>linktr.ee/everton_tech</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button className="py-1.5 rounded-lg bg-neutral-800 text-xs font-bold text-white hover:bg-neutral-700 transition-colors">
                Seguir
              </button>
              <button className="py-1.5 rounded-lg bg-neutral-800 text-xs font-bold text-white hover:bg-neutral-700 transition-colors">
                Mensagem
              </button>
            </div>

            {/* Highlights Circles */}
            {activeBio.highlightNames && activeBio.highlightNames.length > 0 && (
              <div className="pt-3 border-t border-neutral-900">
                <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block mb-2">
                  Destaques Recomendados:
                </span>
                <div className="flex items-center gap-3 overflow-x-auto py-1">
                  {activeBio.highlightNames.map((name, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1 shrink-0">
                      <div className="w-12 h-12 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center text-base">
                        ⭐
                      </div>
                      <span className="text-[10px] text-neutral-300 truncate max-w-[50px]">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
