import React, { useState, useEffect } from 'react';
import {
  INITIAL_ACCOUNTS,
  INITIAL_SCHEDULED_POSTS,
  INITIAL_BRAND_SETTINGS
} from './data/mockData';
import {
  SocialAccount,
  ScheduledPost,
  BrandSettings,
  SocialPlatform,
  GeneratedPost
} from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CommandCenterView } from './components/CommandCenterView';
import { OperationsView } from './components/OperationsView';
import { IntelligenceView } from './components/IntelligenceView';
import { StudioView } from './components/StudioView';
import { CalendarView } from './components/CalendarView';
import { IdeasView } from './components/IdeasView';
import { BioOptimizerView } from './components/BioOptimizerView';
import { AnalyticsView } from './components/AnalyticsView';
import { BrandVoiceView } from './components/BrandVoiceView';
import { NewPostModal } from './components/NewPostModal';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function App() {
  const [activePillar, setActivePillar] = useState<'command_center' | 'operations' | 'intelligence'>('command_center');

  const [accounts, setAccounts] = useState<SocialAccount[]>(() => {
    const saved = localStorage.getItem('smm_accounts');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
  });

  const [currentAccount, setCurrentAccount] = useState<SocialAccount>(accounts[0]);

  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(() => {
    const saved = localStorage.getItem('smm_scheduled_posts');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULED_POSTS;
  });

  const [brandSettings, setBrandSettings] = useState<BrandSettings>(() => {
    const saved = localStorage.getItem('smm_brand_settings');
    return saved ? JSON.parse(saved) : INITIAL_BRAND_SETTINGS;
  });

  const [currentTab, setCurrentTab] = useState<string>('operations_overview');
  const [isQuickPostOpen, setIsQuickPostOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [studioInitialTopic, setStudioInitialTopic] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('smm_scheduled_posts', JSON.stringify(scheduledPosts));
  }, [scheduledPosts]);

  useEffect(() => {
    localStorage.setItem('smm_brand_settings', JSON.stringify(brandSettings));
  }, [brandSettings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddScheduledPost = (post: ScheduledPost) => {
    setScheduledPosts((prev) => [post, ...prev]);
    showToast(`Post "${post.headline || post.topic}" agendado com sucesso!`);
  };

  const handleDeleteScheduledPost = (id: string) => {
    setScheduledPosts((prev) => prev.filter((p) => p.id !== id));
    showToast('Post removido do calendário.');
  };

  const handleOpenStudioWithTopic = (topic?: string, platform?: SocialPlatform) => {
    if (topic) setStudioInitialTopic(topic);
    if (platform) {
      const acc = accounts.find((a) => a.platform === platform);
      if (acc) setCurrentAccount(acc);
    }
    setActivePillar('operations');
    setCurrentTab('studio');
  };

  return (
    <div className="min-h-screen bg-[#070c1a] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-indigo-500 selection:text-white">
      {/* Top Application Header */}
      <Header
        activePillar={activePillar}
        onSelectPillar={(pillar) => {
          setActivePillar(pillar);
          if (pillar === 'operations') setCurrentTab('operations_overview');
        }}
        accounts={accounts}
        currentAccount={currentAccount}
        onSelectAccount={setCurrentAccount}
        onOpenQuickPost={() => setIsQuickPostOpen(true)}
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Main Body with Sidebar + Dynamic View */}
      <div className="flex-1 flex">
        <Sidebar
          activePillar={activePillar}
          onSelectPillar={(pil) => {
            setActivePillar(pil);
            if (pil === 'operations') setCurrentTab('operations_overview');
          }}
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            setActivePillar('operations');
          }}
          accounts={accounts}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic View Content */}
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Pillar 1: GYB AGENT - Centro de Comando (Image 1) */}
          {activePillar === 'command_center' && (
            <CommandCenterView />
          )}

          {/* Pillar 2: Cyber Magic - Central de Gerenciamento (Image 2) & Operations */}
          {activePillar === 'operations' && (
            <>
              {currentTab === 'operations_overview' && (
                <OperationsView
                  onOpenStudio={handleOpenStudioWithTopic}
                  accounts={accounts}
                />
              )}

              {currentTab === 'studio' && (
                <StudioView
                  currentAccount={currentAccount}
                  onSchedulePost={handleAddScheduledPost}
                  initialTopic={studioInitialTopic}
                />
              )}

              {currentTab === 'calendar' && (
                <CalendarView
                  scheduledPosts={scheduledPosts}
                  onAddPost={handleAddScheduledPost}
                  onDeletePost={handleDeleteScheduledPost}
                  onOpenStudioWithTopic={handleOpenStudioWithTopic}
                />
              )}

              {currentTab === 'planner' && (
                <IdeasView
                  onUseIdeaInStudio={handleOpenStudioWithTopic}
                />
              )}

              {currentTab === 'analytics' && (
                <AnalyticsView
                  accounts={accounts}
                />
              )}

              {currentTab === 'brand' && (
                <BrandVoiceView
                  settings={brandSettings}
                  onSaveSettings={(s) => {
                    setBrandSettings(s);
                    showToast('Diretrizes de marca atualizadas com sucesso!');
                  }}
                  accounts={accounts}
                />
              )}

              {currentTab === 'inbox' && (
                <BioOptimizerView
                  currentAccount={currentAccount}
                />
              )}

              {currentTab === 'approvals' && (
                <OperationsView
                  onOpenStudio={handleOpenStudioWithTopic}
                  accounts={accounts}
                />
              )}

              {currentTab === 'posts' && (
                <CalendarView
                  scheduledPosts={scheduledPosts}
                  onAddPost={handleAddScheduledPost}
                  onDeletePost={handleDeleteScheduledPost}
                  onOpenStudioWithTopic={handleOpenStudioWithTopic}
                />
              )}

              {currentTab === 'settings' && (
                <BrandVoiceView
                  settings={brandSettings}
                  onSaveSettings={(s) => {
                    setBrandSettings(s);
                    showToast('Configurações salvas!');
                  }}
                  accounts={accounts}
                />
              )}
            </>
          )}

          {/* Pillar 3: OpenRouter / Central de Inteligência (Image 3) */}
          {activePillar === 'intelligence' && (
            <IntelligenceView />
          )}
        </main>
      </div>

      {/* Quick New Post Modal */}
      <NewPostModal
        isOpen={isQuickPostOpen}
        onClose={() => setIsQuickPostOpen(false)}
        accounts={accounts}
        currentAccount={currentAccount}
        onPostScheduled={handleAddScheduledPost}
        onNavigateToStudioWithTopic={(topic, platform) => {
          handleOpenStudioWithTopic(topic, platform);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0b1329] border border-slate-700 shadow-2xl text-xs font-semibold text-white animate-fade-in backdrop-blur-xl">
          <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 text-sm"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
