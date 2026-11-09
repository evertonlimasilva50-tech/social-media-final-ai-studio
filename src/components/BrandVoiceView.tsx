import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  Shield,
  Save,
  Check,
  Building,
  AtSign,
  User,
  Hash,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { BrandSettings, SocialAccount, ContentTone } from '../types';

interface BrandVoiceViewProps {
  settings: BrandSettings;
  onSaveSettings: (settings: BrandSettings) => void;
  accounts: SocialAccount[];
}

export const BrandVoiceView: React.FC<BrandVoiceViewProps> = ({
  settings,
  onSaveSettings,
  accounts,
}) => {
  const [formData, setFormData] = useState<BrandSettings>(settings);
  const [bannedWords, setBannedWords] = useState('urgente, imperdível, não perca tempo, clique aqui agora');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400">
            <Sliders className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">Voz da Marca (Brand Voice) & Identidade</h1>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Ensine a IA a escrever exatamente com o tom, valores e estilo autêntico da sua marca.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand Core Identity */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Building className="w-4 h-4 text-indigo-400" />
            Identidade do Criador ou Negócio
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                Nome da Marca ou Projeto
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                Nicho de Atuação
              </label>
              <input
                type="text"
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                Nome do Autor / Porta-voz
              </label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                @ Handle Principal
              </label>
              <input
                type="text"
                value={formData.authorHandle}
                onChange={(e) => setFormData({ ...formData, authorHandle: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>
        </div>

        {/* Tone and Voice Instructions */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <MessageSquare className="w-4 h-4 text-purple-400" />
            Tom de Voz Padrão & Instruções da IA
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Tom Padrão Preferencial
            </label>
            <select
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value as ContentTone })}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
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
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Diretrizes de Voz da Marca (Brand Voice)
            </label>
            <textarea
              value={formData.brandVoiceDescription}
              onChange={(e) => setFormData({ ...formData, brandVoiceDescription: e.target.value })}
              rows={3}
              placeholder="Descreva a personalidade da sua marca..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Público Alvo Detalhado
            </label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              placeholder="Ex: Profissionais liberais, gestores de tráfego, criadores de conteúdo..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Hashtags Oficiais da Marca
            </label>
            <input
              type="text"
              value={formData.defaultHashtags}
              onChange={(e) => setFormData({ ...formData, defaultHashtags: e.target.value })}
              placeholder="#SuaMarca #SeuNicho #HashtagOficial"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-400 flex items-center gap-1 block mb-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              Palavras ou Expressões Proibidas (Blacklist)
            </label>
            <input
              type="text"
              value={bannedWords}
              onChange={(e) => setBannedWords(e.target.value)}
              placeholder="palavras separadas por vírgula..."
              className="w-full bg-slate-950/80 border border-rose-500/30 rounded-xl px-4 py-2.5 text-xs text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-400">
            {isSaved && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Diretrizes salvas com sucesso!
              </span>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Diretrizes de Marca</span>
          </button>
        </div>
      </form>
    </div>
  );
};
