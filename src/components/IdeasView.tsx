import React, { useState } from 'react';
import {
  Lightbulb,
  Sparkles,
  Zap,
  Layers,
  Video,
  FileText,
  AlignLeft,
  ArrowRight,
  Copy,
  Check,
  TrendingUp,
  Bookmark,
  RefreshCw
} from 'lucide-react';
import { ContentIdea, SocialPlatform } from '../types';
import { apiGenerateIdeas } from '../services/api';

interface IdeasViewProps {
  onUseIdeaInStudio: (topic: string, platform?: SocialPlatform) => void;
}

export const IdeasView: React.FC<IdeasViewProps> = ({ onUseIdeaInStudio }) => {
  const [niche, setNiche] = useState('Inteligência Artificial e Negócios Digitais');
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | 'all'>('all');
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [ideas, setIdeas] = useState<ContentIdea[]>([
    {
      id: 'seed-1',
      niche: 'Inteligência Artificial',
      title: 'Os 5 erros que você comete ao tentar criar conteúdo com IA',
      hook: 'Pare de usar a IA assim se você quer engajamento real e não textos genéricos...',
      format: 'Carrossel',
      pillar: 'Educação',
      engagementScore: 98,
      overview: 'Mostra o contraste entre prompts superficiais e frameworks avançados de copywriting com exemplos visuais.'
    },
    {
      id: 'seed-2',
      niche: 'Inteligência Artificial',
      title: 'Como economizei 20 horas semanais automatizando meu fluxo de postagens',
      hook: 'Em 2024 eu passava 4 horas por dia no Canva e no bloco de notas. Hoje levo 25 minutos:',
      format: 'Artigo LinkedIn',
      pillar: 'Autoridade',
      engagementScore: 94,
      overview: 'Storytelling detalhando ferramentas, rotina matinal e o template de aprovação.'
    },
    {
      id: 'seed-3',
      niche: 'Inteligência Artificial',
      title: 'A ferramenta gratuita que 99% dos criadores não conhecem',
      hook: 'Não pague ferramentas caras antes de testar esta opção que poucos revelam:',
      format: 'Reels / Vídeo Curto',
      pillar: 'Inspiração',
      engagementScore: 96,
      overview: 'Vídeo dinâmico de 45 segundos demonstrando a ferramenta na prática.'
    },
    {
      id: 'seed-4',
      niche: 'Inteligência Artificial',
      title: 'O framework de 3 etapas para validar tópicos virais antes de postar',
      hook: 'Se você quer parar de adivinhar o que vai viralizar, use esta fórmula matemática:',
      format: 'Thread X',
      pillar: 'Educação',
      engagementScore: 92,
      overview: 'Fio técnico com fontes de dados, métricas de retenção e passo a passo replicável.'
    },
    {
      id: 'seed-5',
      niche: 'Inteligência Artificial',
      title: 'Bastidores: Quanto custa manter um estúdio de mídia com IA',
      hook: 'A transparência que ninguém mostra: abrindo os números do meu negócio digital...',
      format: 'Post Único',
      pillar: 'Autoridade',
      engagementScore: 95,
      overview: 'Post autêntico com divisão percentual de custos, ferramentas pagas vs gratuitas.'
    },
    {
      id: 'seed-6',
      niche: 'Inteligência Artificial',
      title: 'Checklist: 7 coisas para revisar antes de apertar em publicar',
      hook: 'Salve este checklist de 60 segundos para nunca mais postar algo que o algoritmo vai punir:',
      format: 'Carrossel',
      pillar: 'Vendas',
      engagementScore: 97,
      overview: 'Carrossel altamente salvável com checklist visual para cada rede.'
    }
  ]);

  const [copiedHookId, setCopiedHookId] = useState<string | null>(null);

  const PROVEN_HOOKS = [
    { id: 'h1', text: 'Se você quer alcançar [Resultado] em 2026, pare de fazer [Erro comum] imediatamente.', type: 'Quebra de Padrão' },
    { id: 'h2', text: 'Eu analisei 100 [Exemplos] de sucesso. Aqui estão os 3 padrões que quase ninguém percebeu:', type: 'Curadoria & Dados' },
    { id: 'h3', text: 'A maioria das pessoas te diz para fazer [X]. Mas quem realmente tem resultados faz [Y]:', type: 'Contraste Ousado' },
    { id: 'h4', text: '3 ferramentas que parecem ilegais de tão boas para quem trabalha com [Nicho]:', type: 'Curiosidade Viral' },
    { id: 'h5', text: 'Se eu tivesse que começar do absoluto zero em [Área] hoje, este seria meu plano de 30 dias:', type: 'Framework & Autoridade' },
  ];

  const handleGenerate = async () => {
    if (!niche.trim()) return;
    setIsLoading(true);
    try {
      const result = await apiGenerateIdeas(
        niche,
        selectedPlatform === 'all' ? undefined : selectedPlatform,
        6
      );
      setIdeas(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredIdeas = ideas.filter((idea) => {
    if (selectedPillar === 'all') return true;
    return idea.pillar === selectedPillar;
  });

  const handleCopyHook = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHookId(id);
    setTimeout(() => setCopiedHookId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Lightbulb className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Banco de Ideias & Estratégia</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Gere ideias ilimitadas de conteúdo com ganchos magnéticos, frameworks e pilares estratégicos de engajamento.
          </p>
        </div>
      </div>

      {/* Generator Control Box */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-8">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Qual é o seu nicho ou tema central?
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Ex: Marketing Digital, Finanças Pessoais, Nutrição Esportiva, Inteligência Artificial..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="md:col-span-4">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !niche.trim()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Minerando Ideias com IA...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Gerar Ideias Virais</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Pillar Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-800">
          <span className="text-xs font-semibold text-slate-400 mr-1">Filtrar por Pilar:</span>
          {['all', 'Educação', 'Autoridade', 'Inspiração', 'Vendas', 'Entretenimento'].map((p) => {
            const isSelected = selectedPillar === p;
            return (
              <button
                key={p}
                onClick={() => setSelectedPillar(p)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {p === 'all' ? 'Todos os Pilares' : p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Ideas Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIdeas.map((idea) => (
          <div
            key={idea.id}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between group shadow-lg backdrop-blur-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {idea.pillar}
                </span>

                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{idea.engagementScore}% Potencial</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Formato: {idea.format}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {idea.title}
                </h3>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                  Gancho de Abertura:
                </span>
                <p className="text-xs text-slate-200 italic leading-relaxed">
                  "{idea.hook}"
                </p>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {idea.overview}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleCopyHook(idea.hook, idea.id)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                {copiedHookId === idea.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHookId === idea.id ? 'Gancho Copiado!' : 'Copiar Gancho'}</span>
              </button>

              <button
                onClick={() => onUseIdeaInStudio(idea.title)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>Criar com IA</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Proven Viral Hook Templates Vault */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Cofre de Ganchos Virais Validados
            </h3>
            <p className="text-xs text-slate-400">Estruturas psicológicas de alta retenção para a primeira linha ou 3 primeiros segundos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PROVEN_HOOKS.map((hook) => (
            <div
              key={hook.id}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                  {hook.type}
                </span>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  "{hook.text}"
                </p>
              </div>

              <button
                onClick={() => handleCopyHook(hook.text, hook.id)}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all shrink-0"
                title="Copiar estrutura"
              >
                {copiedHookId === hook.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
