export type SocialPlatform = 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'facebook' | 'whatsapp';

export type ContentFormat = 'feed' | 'carousel' | 'reels_script' | 'thread' | 'story';

export type ContentTone = 'professional' | 'casual' | 'viral' | 'educational' | 'storytelling' | 'persuasive';

export type ContentGoal = 'engagement' | 'leads' | 'sales' | 'brand_awareness' | 'community';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  handle: string;
  name: string;
  avatarUrl: string;
  followers: number;
  engagementRate: number;
  connected: boolean;
}

export interface PostSlide {
  slideNumber: number;
  title: string;
  body: string;
  visualTip: string;
}

export interface ScriptSection {
  timeRange: string;
  visualAction: string;
  spokenAudio: string;
  onScreenText: string;
}

export interface TweetItem {
  tweetNumber: number;
  text: string;
}

export interface GeneratedPost {
  id: string;
  platform: SocialPlatform;
  contentType: ContentFormat;
  topic: string;
  headline: string;
  content: string;
  callToAction: string;
  hashtags: string[];
  visualPrompt?: string;
  slides?: PostSlide[];
  scriptSections?: ScriptSection[];
  threadTweets?: TweetItem[];
  estimatedReach: {
    score: number;
    peakHour: string;
    targetEmotion: string;
  };
  tips: string[];
  createdAt: string;
}

export interface ScheduledPost {
  id: string;
  platform: SocialPlatform;
  contentType: ContentFormat;
  topic: string;
  content: string;
  headline: string;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:mm
  status: 'scheduled' | 'pending_review' | 'approved' | 'draft' | 'published';
  hashtags: string[];
  thumbnailUrl?: string;
  likes?: number;
  comments?: number;
  reach?: number;
  slides?: PostSlide[];
  scriptSections?: ScriptSection[];
  threadTweets?: TweetItem[];
}

export interface ContentIdea {
  id: string;
  title: string;
  hook: string;
  format: string;
  pillar: 'Educação' | 'Entretenimento' | 'Inspiração' | 'Vendas' | 'Autoridade';
  engagementScore: number;
  overview: string;
  niche: string;
}

export interface CalendarPlanItem {
  day: string;
  time: string;
  platform: SocialPlatform;
  contentType: string;
  topic: string;
  hook: string;
  goal: string;
}

export interface BioOption {
  style: string;
  bio: string;
  cta: string;
  highlightNames: string[];
}

export interface BrandSettings {
  brandName: string;
  niche: string;
  tone: ContentTone;
  targetAudience: string;
  defaultHashtags: string;
  brandVoiceDescription: string;
  authorName: string;
  authorHandle: string;
}

// 1. Types for GYB AGENT (Centro de Comando)
export interface AgentCardData {
  id: string;
  name: string;
  category: string;
  status: 'RUNNING' | 'PAUSED' | 'STOPPED';
  icon: string;
  stats: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
    label3: string;
    val3: string;
  };
  currentAction: string;
}

// 2. Types for Central de Inteligência (OpenRouter / AI Infrastructure)
export interface AIModelInfo {
  id: string;
  name: string;
  subName: string;
  badgeLetter: string;
  badgeBg: string;
  badgeColor: string;
  latencyP50: string;
  latencyQuality: 'Good' | 'Fair' | 'Slow';
  costPer1MTokens: string;
  costTrend: string;
  availability: string;
  availabilityStatus: 'Excellent' | 'Good' | 'Degraded';
  score: number;
  providerType: 'Cloud' | 'Local (Ollama/vLLM)';
}

export interface FallbackChainStep {
  step: number;
  label: string;
  modelName: string;
  routingMode: 'Auto' | 'Strict' | 'Lowest Cost';
}
