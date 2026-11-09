import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  Bell,
  CheckCircle2,
  Menu,
  Shield,
  Activity,
  Cpu,
  Layers,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import { SocialAccount } from '../types';
import { PLATFORM_CONFIG } from '../data/mockData';

interface HeaderProps {
  activePillar: 'command_center' | 'operations' | 'intelligence';
  onSelectPillar: (pillar: 'command_center' | 'operations' | 'intelligence') => void;
  accounts: SocialAccount[];
  currentAccount: SocialAccount;
  onSelectAccount: (account: SocialAccount) => void;
  onOpenQuickPost: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePillar,
  onSelectPillar,
  accounts,
  currentAccount,
  onSelectAccount,
  onOpenQuickPost,
  onToggleSidebar,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cfg = PLATFORM_CONFIG[currentAccount.platform];

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-800 bg-[#070c1a]/95 backdrop-blur-xl px-4 md:px-6 flex items-center justify-between">
      {/* Left: Brand Identity + Mobile Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center">
            <div className="w-full h-full bg-[#070c1a] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5 leading-none">
              {activePillar === 'command_center' ? (
                <>GYB <span className="text-indigo-400">AGENT</span></>
              ) : activePillar === 'operations' ? (
                <>Cyber <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Magic</span></>
              ) : (
                <>Open<span className="text-sky-400">Router</span> / Cérebro</>
              )}
            </span>
            <span className="text-[10px] text-slate-500 block font-mono leading-tight mt-0.5">
              SOCIAL MEDIA MASTER
            </span>
          </div>
        </div>
      </div>

      {/* Center: The 3 Core Pillars Switcher (Matching User Request) */}
      <div className="hidden md:flex items-center gap-1 bg-[#0b1329] p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => onSelectPillar('command_center')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activePillar === 'command_center'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>1. Centro de Comando</span>
        </button>

        <button
          onClick={() => onSelectPillar('operations')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activePillar === 'operations'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>2. Central de Gerenciamento</span>
        </button>

        <button
          onClick={() => onSelectPillar('intelligence')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activePillar === 'intelligence'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>3. Central de Inteligência</span>
        </button>
      </div>

      {/* Right: Operational Status + Account Selector + Profile */}
      <div className="flex items-center gap-3">
        {/* All Systems Operational Badge in PT-BR */}
        <div className="hidden xl:flex items-center gap-3 text-xs text-slate-300 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-400">Todos os Sistemas Operacionais</span>
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-mono text-[11px]">Disponibilidade: 99,94%</span>
        </div>

        {/* Notification Bell */}
        <button
          title="Notificações e Alertas"
          className="relative p-2 rounded-xl bg-[#0b1329] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
            7
          </span>
        </button>

        {/* Connected Account Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#0b1329] border border-slate-800 hover:border-slate-700 transition-all text-left"
          >
            <div className="relative">
              <img
                src={currentAccount.avatarUrl}
                alt={currentAccount.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-700"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-slate-950" />
            </div>

            <div className="hidden sm:block text-xs">
              <div className="font-bold text-white flex items-center gap-1 leading-tight">
                <span>{currentAccount.handle}</span>
                <CheckCircle2 className="w-3 h-3 text-sky-400 fill-sky-400" />
              </div>
              <span className="text-[10px] text-slate-400 block leading-none">
                {cfg.name} • {(currentAccount.followers / 1000).toFixed(1)}k
              </span>
            </div>

            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0b1329] border border-slate-800 shadow-2xl p-2 z-50 animate-fade-in space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800/80 mb-1">
                Contas Conectadas ({accounts.length})
              </div>

              {accounts.map((acc) => {
                const accCfg = PLATFORM_CONFIG[acc.platform];
                const isCurrent = acc.id === currentAccount.id;
                return (
                  <button
                    key={acc.id}
                    onClick={() => {
                      onSelectAccount(acc);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                      isCurrent
                        ? 'bg-indigo-600/15 border border-indigo-500/30 text-white'
                        : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={acc.avatarUrl}
                        alt={acc.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div>
                        <span className="text-xs font-bold block leading-tight text-white">{acc.handle}</span>
                        <span className="text-[10px] text-slate-400 block">{accCfg.name}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      {(acc.followers / 1000).toFixed(1)}k
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
