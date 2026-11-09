import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  CheckSquare,
  FileText,
  BarChart3,
  Mail,
  Layers,
  Settings,
  Plus,
  Zap,
  Cpu,
  Activity,
  Bot
} from 'lucide-react';
import { SocialAccount } from '../types';

interface SidebarProps {
  activePillar: 'command_center' | 'operations' | 'intelligence';
  onSelectPillar: (pillar: 'command_center' | 'operations' | 'intelligence') => void;
  currentTab: string;
  onTabChange: (tab: string) => void;
  accounts: SocialAccount[];
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePillar,
  onSelectPillar,
  currentTab,
  onTabChange,
  accounts,
  isOpenMobile,
  onCloseMobile
}) => {
  const OPERATIONS_NAV = [
    { id: 'operations_overview', label: 'Visão Geral (Dashboard)', icon: LayoutDashboard },
    { id: 'planner', label: 'Planejador de Conteúdo', icon: Calendar },
    { id: 'studio', label: 'Estúdio Criativo IA', icon: Sparkles, badge: 'IA' },
    { id: 'calendar', label: 'Calendário Editorial', icon: Calendar },
    { id: 'approvals', label: 'Fila de Aprovação', icon: CheckSquare, badgeCount: 2 },
    { id: 'posts', label: 'Publicações Agendadas', icon: FileText },
    { id: 'analytics', label: 'Métricas & Analytics', icon: BarChart3 },
    { id: 'inbox', label: 'Caixa de Entrada', icon: Mail, badgeCount: 5 },
    { id: 'brand', label: 'Voz da Marca (Brand)', icon: Layers },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const PILLAR_ITEMS = [
    { id: 'command_center' as const, label: '1. Centro de Comando', icon: Bot, desc: 'Console de Agentes' },
    { id: 'operations' as const, label: '2. Central de Gerenciamento', icon: Activity, desc: 'Operações e Estúdio' },
    { id: 'intelligence' as const, label: '3. Central de Inteligência', icon: Cpu, desc: 'Modelos e Cérebro IA' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-slate-800 bg-[#070c1a]/95 backdrop-blur-xl flex flex-col justify-between p-3.5 transition-transform duration-300 lg:translate-x-0 overflow-y-auto ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-4">
          {/* Mobile Switcher for 3 Pillars */}
          <div className="md:hidden space-y-1 pb-3 border-b border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500 px-2 block">
              Módulos Principais
            </span>
            {PILLAR_ITEMS.map((pil) => (
              <button
                key={pil.id}
                onClick={() => {
                  onSelectPillar(pil.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full text-left p-2 rounded-xl text-xs font-bold transition-all ${
                  activePillar === pil.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {pil.label}
              </button>
            ))}
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {activePillar === 'command_center'
                ? 'Centro de Comando'
                : activePillar === 'intelligence'
                ? 'Infraestrutura de IA'
                : 'Operações de Mídia'}
            </div>

            {OPERATIONS_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                      : 'text-slate-400 hover:text-white hover:bg-[#0b1329]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.badge}
                    </span>
                  )}

                  {item.badgeCount !== undefined && (
                    <span className="w-4 h-4 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 flex items-center justify-center">
                      {item.badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Connected Accounts Section (Matching Image 2) */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Redes Conectadas
              </span>
              <button
                onClick={() => onTabChange('brand')}
                className="text-slate-400 hover:text-white p-0.5"
                title="Conectar Nova Rede"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              {accounts.slice(0, 3).map((acc) => (
                <div
                  key={acc.id}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-[#0b1329] text-xs text-slate-300 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="truncate">
                    <span className="font-semibold block leading-tight text-white">{acc.name}</span>
                    <span className="text-[10px] text-slate-500">{acc.handle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Your AI Credits Box (Matching Image 2) in Portuguese */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className="p-3 bg-[#0b1329] rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Seus Créditos de IA</span>
            </div>
            <div className="text-sm font-extrabold text-white">
              2.450 <span className="text-xs text-slate-500 font-normal">/ 5.000 usados</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[49%]" />
            </div>
            <span className="text-[10px] text-slate-500 block">
              Renova em 1 de Junho de 2026
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
