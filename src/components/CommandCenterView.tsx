import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Play,
  Pause,
  Square,
  BarChart2,
  Mail,
  PenTool,
  BarChart3,
  Headphones,
  Share2,
  UserCheck,
  RotateCw,
  LayoutGrid,
  List,
  AlertTriangle,
  FileText,
  Activity,
  Cpu,
  Server,
  Zap,
  ChevronRight
} from 'lucide-react';
import { AgentCardData } from '../types';
import { INITIAL_AGENTS } from '../data/mockData';

export const CommandCenterView: React.FC = () => {
  const [agents, setAgents] = useState<AgentCardData[]>(INITIAL_AGENTS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [rightTab, setRightTab] = useState<'activity' | 'alerts' | 'logs'>('activity');
  const [selectedAgentDetails, setSelectedAgentDetails] = useState<AgentCardData | null>(null);

  const toggleAgentPause = (id: string) => {
    setAgents((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'RUNNING' ? 'PAUSED' : 'RUNNING';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const stopAgent = (id: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'STOPPED' } : a))
    );
  };

  const getAgentIcon = (icon: string) => {
    switch (icon) {
      case 'mail':
        return <Mail className="w-5 h-5 text-indigo-400" />;
      case 'pen':
        return <PenTool className="w-5 h-5 text-pink-400" />;
      case 'barChart':
        return <BarChart3 className="w-5 h-5 text-emerald-400" />;
      case 'headphones':
        return <Headphones className="w-5 h-5 text-amber-400" />;
      case 'share2':
        return <Share2 className="w-5 h-5 text-sky-400" />;
      case 'userCheck':
        return <UserCheck className="w-5 h-5 text-purple-400" />;
      default:
        return <Zap className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getAgentBg = (icon: string) => {
    switch (icon) {
      case 'mail':
        return 'bg-indigo-600/20 border-indigo-500/30';
      case 'pen':
        return 'bg-pink-600/20 border-pink-500/30';
      case 'barChart':
        return 'bg-emerald-600/20 border-emerald-500/30';
      case 'headphones':
        return 'bg-amber-600/20 border-amber-500/30';
      case 'share2':
        return 'bg-sky-600/20 border-sky-500/30';
      case 'userCheck':
        return 'bg-purple-600/20 border-purple-500/30';
      default:
        return 'bg-indigo-600/20 border-indigo-500/30';
    }
  };

  return (
    <div className="space-y-6 pb-12 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Breadcrumb & Subtitle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="text-white">GYB AGENT</span>
          <span>&gt;</span>
          <span className="text-indigo-400">Console de Monitoramento</span>
        </div>
      </div>

      {/* Top 5 KPI Cards Row (Matching Image 1) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Metric 1 */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-4 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight">12</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                AGENTES ATIVOS
              </div>
              <div className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                ↑ 3 em relação a ontem
              </div>
            </div>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-4 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight">2.847</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                TAREFAS CONCLUÍDAS
              </div>
              <div className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                ↑ 18% de aumento
              </div>
            </div>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-4 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight">1,8s</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                TEMPO MÉDIO RESPOSTA
              </div>
              <div className="text-[11px] font-semibold text-amber-400 mt-0.5">
                ↓ 24% mais rápido
              </div>
            </div>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-4 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight">R$ 34,2K</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                RETORNO (ROI) HOJE
              </div>
              <div className="text-[11px] font-semibold text-purple-400 mt-0.5">
                ↑ R$ 8.4K a mais
              </div>
            </div>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-4 shadow-xl col-span-2 sm:col-span-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight">98,6%</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                TAXA DE SUCESSO
              </div>
              <div className="text-[11px] font-semibold text-cyan-400 mt-0.5">
                ↑ +0,4%
              </div>
            </div>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Agents (Left 8 cols) + Monitoring Console (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Active Agents List / Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white tracking-tight uppercase">
              AGENTES ATIVOS ({agents.length})
            </h2>

            <div className="flex items-center bg-[#0e172e] p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grade</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'list' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Lista</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all space-y-4"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${getAgentBg(agent.icon)}`}>
                      {getAgentIcon(agent.icon)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">{agent.name}</h3>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        {agent.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                      agent.status === 'RUNNING'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : agent.status === 'PAUSED'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {agent.status === 'RUNNING' ? 'EM EXECUÇÃO' : agent.status === 'PAUSED' ? 'PAUSADO' : 'PARADO'}
                  </span>
                </div>

                {/* 3 Metric Columns */}
                <div className="grid grid-cols-3 gap-2 bg-[#080d1e] rounded-xl p-3 border border-slate-900 text-center">
                  <div>
                    <div className="text-base font-extrabold text-white">{agent.stats.val1}</div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                      {agent.stats.label1}
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-white">{agent.stats.val2}</div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                      {agent.stats.label2}
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-white">{agent.stats.val3}</div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                      {agent.stats.label3}
                    </div>
                  </div>
                </div>

                {/* Current Action / Progress */}
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <RotateCw className={`w-3.5 h-3.5 text-indigo-400 shrink-0 ${agent.status === 'RUNNING' ? 'animate-spin' : ''}`} />
                  <span className="truncate">{agent.currentAction}</span>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center gap-2 pt-1 border-t border-slate-800/70 text-xs">
                  <button
                    onClick={() => toggleAgentPause(agent.id)}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#0e172e] hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {agent.status === 'RUNNING' ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pausar</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Retomar</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedAgentDetails(agent)}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#0e172e] hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Detalhes</span>
                  </button>

                  <button
                    onClick={() => stopAgent(agent.id)}
                    className="py-1.5 px-3 rounded-lg bg-[#0e172e] hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 font-medium flex items-center justify-center gap-1 transition-colors"
                    title="Parar Agente"
                  >
                    <Square className="w-3 h-3" />
                    <span>Parar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Monitoring Console Sidebar (Matching Image 1) */}
        <div className="lg:col-span-4 bg-[#0b1329] border border-slate-800/90 rounded-2xl p-5 shadow-2xl space-y-5">
          {/* Tabs: Atividades / Alertas / Registros */}
          <div className="grid grid-cols-3 gap-1 bg-[#080d1e] p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setRightTab('activity')}
              className={`py-1.5 rounded-lg font-bold transition-all ${
                rightTab === 'activity' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Atividades
            </button>
            <button
              onClick={() => setRightTab('alerts')}
              className={`py-1.5 rounded-lg font-bold transition-all ${
                rightTab === 'alerts' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Alertas (1)
            </button>
            <button
              onClick={() => setRightTab('logs')}
              className={`py-1.5 rounded-lg font-bold transition-all ${
                rightTab === 'logs' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Registros
            </button>
          </div>

          {/* Task Completion Rate (Last 24h) with mini bar chart */}
          <div className="bg-[#080d1e] rounded-xl p-4 border border-slate-900 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Taxa de Conclusão de Tarefas</span>
              <span className="text-[10px] text-slate-400">Últimas 24h</span>
            </div>

            <div className="h-16 flex items-end justify-between gap-2 pt-2">
              {[45, 65, 80, 50, 95, 70, 88].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    style={{ height: `${val}%` }}
                    className="w-full rounded-t-md bg-gradient-to-t from-indigo-700 to-purple-500 shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recursos do Sistema */}
          <div className="bg-[#080d1e] rounded-xl p-4 border border-slate-900 space-y-3.5">
            <span className="text-xs font-bold text-white block">Recursos do Sistema</span>

            {/* CPU */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Uso de CPU
                </span>
                <span className="font-bold text-white">47%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[47%]" />
              </div>
            </div>

            {/* Memory */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-purple-400" /> Memória RAM
                </span>
                <span className="font-bold text-white">62%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-[62%]" />
              </div>
            </div>

            {/* API Quota */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-sky-400" /> Cota da API
                </span>
                <span className="font-bold text-white">28%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full w-[28%]" />
              </div>
            </div>
          </div>

          {/* Feed Activity Stream */}
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-[#080d1e] border border-slate-900 flex items-start gap-3">
              <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Tarefa Concluída</div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Gerador de Conteúdo criou novo rascunho de postagem
                </p>
                <span className="text-[10px] text-slate-500 mt-1 block">Agora mesmo</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#080d1e] border border-slate-900 flex items-start gap-3">
              <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Campanha Enviada</div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Robô de Email Marketing disparou 247 emails
                </p>
                <span className="text-[10px] text-slate-500 mt-1 block">Agora mesmo</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#080d1e] border border-slate-900 flex items-start gap-3">
              <div className="p-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Aguardando Aprovação</div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Gestor de Mídias Sociais enfileirou 3 publicações para revisão
                </p>
                <span className="text-[10px] text-slate-500 mt-1 block">Há 5 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Details Modal */}
      {selectedAgentDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-[#0b1329] border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${getAgentBg(selectedAgentDetails.icon)}`}>
                  {getAgentIcon(selectedAgentDetails.icon)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedAgentDetails.name}</h3>
                  <span className="text-xs text-slate-400">{selectedAgentDetails.category}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedAgentDetails(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#080d1e] rounded-xl border border-slate-900">
                <span className="text-slate-400 block mb-1">Ação Atual em Execução:</span>
                <span className="font-mono text-indigo-300">{selectedAgentDetails.currentAction}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-[#080d1e] rounded-xl border border-slate-900">
                  <div className="text-lg font-extrabold text-white">{selectedAgentDetails.stats.val1}</div>
                  <div className="text-[10px] text-slate-400">{selectedAgentDetails.stats.label1}</div>
                </div>
                <div className="p-3 bg-[#080d1e] rounded-xl border border-slate-900">
                  <div className="text-lg font-extrabold text-white">{selectedAgentDetails.stats.val2}</div>
                  <div className="text-[10px] text-slate-400">{selectedAgentDetails.stats.label2}</div>
                </div>
                <div className="p-3 bg-[#080d1e] rounded-xl border border-slate-900">
                  <div className="text-lg font-extrabold text-white">{selectedAgentDetails.stats.val3}</div>
                  <div className="text-[10px] text-slate-400">{selectedAgentDetails.stats.label3}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedAgentDetails(null)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
