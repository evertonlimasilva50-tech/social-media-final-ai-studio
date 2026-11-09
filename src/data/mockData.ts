import {
  SocialAccount,
  ScheduledPost,
  BrandSettings,
  AgentCardData,
  AIModelInfo,
  FallbackChainStep
} from '../types';

export const INITIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'acc-instagram',
    platform: 'instagram',
    handle: '@cybermagic.studio',
    name: 'Instagram (@cybermagic.studio)',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&h=200&q=80',
    followers: 48600,
    engagementRate: 5.4,
    connected: true,
  },
  {
    id: 'acc-facebook',
    platform: 'facebook',
    handle: 'Gyber Magic',
    name: 'Página Facebook (Gyber Magic)',
    avatarUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=200&h=200&q=80',
    followers: 18400,
    engagementRate: 4.1,
    connected: true,
  },
  {
    id: 'acc-linkedin',
    platform: 'linkedin',
    handle: 'Cyber Magic',
    name: 'Página LinkedIn (Cyber Magic)',
    avatarUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=200&h=200&q=80',
    followers: 24200,
    engagementRate: 6.8,
    connected: true,
  },
  {
    id: 'acc-twitter',
    platform: 'twitter',
    handle: '@cybermagic_ai',
    name: 'X (@cybermagic_ai)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    followers: 18900,
    engagementRate: 3.9,
    connected: true,
  },
  {
    id: 'acc-whatsapp',
    platform: 'whatsapp',
    handle: '+55 11 98877-6655',
    name: 'WhatsApp Business API',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&h=200&q=80',
    followers: 92400,
    engagementRate: 14.7,
    connected: true,
  },
];

export const INITIAL_AGENTS: AgentCardData[] = [
  {
    id: 'agent-1',
    name: 'Robô de Email Marketing',
    category: 'Automação de Marketing',
    status: 'RUNNING',
    icon: 'mail',
    stats: {
      label1: 'ENVIADOS',
      val1: '847',
      label2: 'TAXA ABERTURA',
      val2: '34.2%',
      label3: 'TAXA CLIQUES',
      val3: '12.8%'
    },
    currentAction: 'Enviando campanha personalizada para o segmento #A42...'
  },
  {
    id: 'agent-2',
    name: 'Gerador de Conteúdo',
    category: 'Criação de Conteúdo',
    status: 'RUNNING',
    icon: 'pen',
    stats: {
      label1: 'POSTS',
      val1: '28',
      label2: 'PALAVRAS',
      val2: '4.2K',
      label3: 'QUALIDADE',
      val3: '96%'
    },
    currentAction: 'Gerando conteúdo para mídias sociais da campanha Q4...'
  },
  {
    id: 'agent-3',
    name: 'Analisador de Dados Pro',
    category: 'Inteligência de Dados',
    status: 'RUNNING',
    icon: 'barChart',
    stats: {
      label1: 'REGISTROS',
      val1: '1.2M',
      label2: 'INSIGHTS',
      val2: '47',
      label3: 'PRECISÃO',
      val3: '99.8%'
    },
    currentAction: 'Processando análise de padrões de comportamento dos clientes...'
  },
  {
    id: 'agent-4',
    name: 'Suporte ao Cliente IA',
    category: 'Atendimento ao Cliente',
    status: 'RUNNING',
    icon: 'headphones',
    stats: {
      label1: 'CHAMADOS',
      val1: '156',
      label2: 'TEMPO MÉDIO',
      val2: '2.3m',
      label3: 'AVALIAÇÃO',
      val3: '4.8/5'
    },
    currentAction: 'Atendendo 12 chamados concorrentes de clientes...'
  },
  {
    id: 'agent-5',
    name: 'Gestor de Mídias Sociais',
    category: 'Redes Sociais',
    status: 'PAUSED',
    icon: 'share2',
    stats: {
      label1: 'POSTS',
      val1: '24',
      label2: 'ALCANCE',
      val2: '8.4K',
      label3: 'ENGAJAMENTO',
      val3: '412'
    },
    currentAction: 'Aguardando aprovação de conteúdo antes da publicação...'
  },
  {
    id: 'agent-6',
    name: 'Qualificador de Leads',
    category: 'Automação de Vendas',
    status: 'RUNNING',
    icon: 'userCheck',
    stats: {
      label1: 'LEADS',
      val1: '89',
      label2: 'QUALIFICADOS',
      val2: '67%',
      label3: 'OPORTUNIDADES',
      val3: 'R$ 142K'
    },
    currentAction: 'Pontuando e roteando novos leads de formulários do site...'
  }
];

export const INITIAL_AI_MODELS: AIModelInfo[] = [
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    subName: 'gemini-3.8-flash (Google)',
    badgeLetter: '✦',
    badgeBg: 'bg-emerald-500/20',
    badgeColor: 'text-emerald-400',
    latencyP50: '410 ms',
    latencyQuality: 'Good',
    costPer1MTokens: '$0.15',
    costTrend: '↘ 40%',
    availability: '99.9%',
    availabilityStatus: 'Excellent',
    score: 9.6,
    providerType: 'Cloud'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    subName: 'gpt-4o (OpenAI)',
    badgeLetter: 'G',
    badgeBg: 'bg-emerald-900/40',
    badgeColor: 'text-emerald-400',
    latencyP50: '742 ms',
    latencyQuality: 'Good',
    costPer1MTokens: '$2.50',
    costTrend: '↘ 12%',
    availability: '99.9%',
    availabilityStatus: 'Excellent',
    score: 9.3,
    providerType: 'Cloud'
  },
  {
    id: 'claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    subName: 'claude-3.5-sonnet (Anthropic)',
    badgeLetter: 'C',
    badgeBg: 'bg-amber-900/40',
    badgeColor: 'text-amber-400',
    latencyP50: '812 ms',
    latencyQuality: 'Fair',
    costPer1MTokens: '$3.00',
    costTrend: '↘ 5%',
    availability: '99.7%',
    availabilityStatus: 'Excellent',
    score: 8.7,
    providerType: 'Cloud'
  },
  {
    id: 'llama-3.1-70b',
    name: 'Llama 3.1 70B',
    subName: 'llama-3.1-70b (Meta / Ollama)',
    badgeLetter: 'L',
    badgeBg: 'bg-blue-900/40',
    badgeColor: 'text-blue-400',
    latencyP50: '588 ms',
    latencyQuality: 'Good',
    costPer1MTokens: '$0.80',
    costTrend: '↘ 8%',
    availability: '99.5%',
    availabilityStatus: 'Excellent',
    score: 8.1,
    providerType: 'Local (Ollama/vLLM)'
  },
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2',
    subName: 'mistral-large-2 (Mistral / vLLM)',
    badgeLetter: 'M',
    badgeBg: 'bg-purple-900/40',
    badgeColor: 'text-purple-400',
    latencyP50: '623 ms',
    latencyQuality: 'Good',
    costPer1MTokens: '$0.70',
    costTrend: '↘ 3%',
    availability: '99.4%',
    availabilityStatus: 'Excellent',
    score: 7.8,
    providerType: 'Local (Ollama/vLLM)'
  }
];

export const INITIAL_FALLBACK_CHAIN: FallbackChainStep[] = [
  { step: 1, label: 'Modelo Principal', modelName: 'Gemini 3.8 Flash (Nativo)', routingMode: 'Auto' },
  { step: 2, label: 'Primeiro Reserva', modelName: 'GPT-4o', routingMode: 'Auto' },
  { step: 3, label: 'Segundo Reserva', modelName: 'Claude 3.5 Sonnet', routingMode: 'Auto' },
  { step: 4, label: 'Contingência Final', modelName: 'Llama 3.1 70B (Ollama / Local)', routingMode: 'Auto' },
];

export const INITIAL_BRAND_SETTINGS: BrandSettings = {
  brandName: 'Cyber Magic Studio',
  niche: 'Inteligência Artificial & Automação de Mídias',
  tone: 'viral',
  targetAudience: 'Empreendedores, criadores de conteúdo e profissionais de tecnologia',
  defaultHashtags: '#CyberMagic #SocialMediaMaster #InteligenciaArtificial #MarketingDigital',
  brandVoiceDescription: 'Voz moderna, visionária, orientada a dados e frameworks de alta retenção no mercado brasileiro.',
  authorName: 'Alex Johnson',
  authorHandle: '@cybermagic.studio',
};

export const INITIAL_SCHEDULED_POSTS: ScheduledPost[] = [
  {
    id: 'p-1',
    platform: 'instagram',
    contentType: 'carousel',
    topic: '5 Tendências de Design para Ficar de Olho em 2026',
    headline: '5 Tendências de Design para 2026',
    content: 'O mercado visual está mudando velozmente. Aqui estão os 5 padrões estéticos que mais convertem no feed.',
    scheduledDate: '2026-05-19',
    scheduledTime: '10:00',
    status: 'scheduled',
    hashtags: ['#TendenciasDesign', '#CyberMagic', '#Visual'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'p-2',
    platform: 'facebook',
    contentType: 'feed',
    topic: 'Bastidores do Nosso Processo Criativo',
    headline: 'Bastidores do Nosso Processo Criativo',
    content: 'Já se perguntou como um fluxo de agentes autônomos opera na prática? Dê uma espiada nos bastidores.',
    scheduledDate: '2026-05-20',
    scheduledTime: '11:00',
    status: 'scheduled',
    hashtags: ['#Bastidores', '#CriatividadeIA'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'p-3',
    platform: 'linkedin',
    contentType: 'carousel',
    topic: '3 Maneiras como os Dados Melhoram Decisões de Marketing',
    headline: '3 Maneiras como os Dados Melhoram Decisões de Marketing',
    content: 'Pare de adivinhar o que funciona. Deixe a análise preditiva em tempo real guiar seus pilares editoriais.',
    scheduledDate: '2026-05-21',
    scheduledTime: '10:30',
    status: 'scheduled',
    hashtags: ['#Dados', '#Lideranca', '#Marketing'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'p-4',
    platform: 'facebook',
    contentType: 'feed',
    topic: 'Destaque do Novo Projeto Autônomo',
    headline: 'Destaque do Novo Projeto Autônomo',
    content: 'Orgulho em anunciar o lançamento do nosso fluxo autônomo de agentes sociais.',
    scheduledDate: '2026-05-22',
    scheduledTime: '11:30',
    status: 'pending_review',
    hashtags: ['#Inovacao', '#AgentesIA'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'p-5',
    platform: 'instagram',
    contentType: 'carousel',
    topic: 'Casos de Sucesso de Clientes',
    headline: 'Casos de Sucesso de Clientes',
    content: 'Como nossos clientes reduziram o tempo de publicação em 78% em menos de 30 dias.',
    scheduledDate: '2026-05-23',
    scheduledTime: '10:00',
    status: 'draft',
    hashtags: ['#EstudoDeCaso', '#Resultados'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'p-6',
    platform: 'instagram',
    contentType: 'feed',
    topic: 'Reset de Domingo: Planejar, Descansar e Vencer',
    headline: 'Reset de Domingo: Planejar, Descansar e Vencer',
    content: 'Prepare sua mente e sua grade de posts para a semana mais produtiva do seu ano.',
    scheduledDate: '2026-05-25',
    scheduledTime: '18:00',
    status: 'scheduled',
    hashtags: ['#PlanejamentoSemanal', '#Foco'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'p-7',
    platform: 'linkedin',
    contentType: 'feed',
    topic: 'Por que a Estratégia de Marca Gera Crescimento a Longo Prazo',
    headline: 'ESTRATÉGIA DE MARCA: Crescimento a Longo Prazo',
    content: 'Táticas vencem trimestres; estratégias constroem impérios.',
    scheduledDate: '2026-05-19',
    scheduledTime: '13:30',
    status: 'scheduled',
    hashtags: ['#Branding', '#Estrategia'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'p-8',
    platform: 'instagram',
    contentType: 'reels_script',
    topic: 'Como a IA Está Mudando a Criação de Conteúdo',
    headline: 'IA: Como a IA Está Mudando a Criação de Conteúdo',
    content: 'A economia dos criadores nunca mais será a mesma. Entenda o porquê:',
    scheduledDate: '2026-05-20',
    scheduledTime: '16:00',
    status: 'scheduled',
    hashtags: ['#Criadores', '#Futuro'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'p-9',
    platform: 'instagram',
    contentType: 'feed',
    topic: 'Vibes do Escritório: Quarta-feira Produtiva ✨',
    headline: 'Vibes do Escritório: Quarta-feira Produtiva ✨',
    content: 'Colaborando em modelo híbrido com nosso time autônomo de agentes de IA.',
    scheduledDate: '2026-05-21',
    scheduledTime: '14:00',
    status: 'scheduled',
    hashtags: ['#Cultura', '#TrabalhoRemoto'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'p-10',
    platform: 'linkedin',
    contentType: 'carousel',
    topic: '5 Dicas de Conteúdo que Realmente Funcionam',
    headline: 'DICAS: 5 Dicas de Conteúdo que Realmente Funcionam',
    content: 'Frameworks validados em mais de 50.000 publicações no mercado brasileiro.',
    scheduledDate: '2026-05-22',
    scheduledTime: '15:00',
    status: 'pending_review',
    hashtags: ['#Crescimento', '#Dicas'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'p-11',
    platform: 'facebook',
    contentType: 'feed',
    topic: 'Perguntas & Respostas: Deixe sua Dúvida',
    headline: 'PERGUNTAS & RESPOSTAS: Tire Suas Dúvidas',
    content: 'Deixe suas perguntas abaixo e nossa equipe responderá tudo em tempo real.',
    scheduledDate: '2026-05-23',
    scheduledTime: '16:30',
    status: 'draft',
    hashtags: ['#PerguntasERespostas', '#Comunidade'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'p-12',
    platform: 'linkedin',
    contentType: 'feed',
    topic: 'Motivação de Fim de Semana: Continue Construindo',
    headline: 'MOTIVAÇÃO: Continue Construindo',
    content: 'A consistência é a força multiplicadora do sucesso profissional.',
    scheduledDate: '2026-05-24',
    scheduledTime: '11:00',
    status: 'scheduled',
    hashtags: ['#Consistencia', '#Sucesso'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80'
  }
];

export const PLATFORM_CONFIG = {
  instagram: {
    name: 'Instagram',
    color: '#E1306C',
    bgBadge: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    bgButton: 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:via-pink-500 hover:to-amber-400',
    iconColor: 'text-pink-400',
    formats: ['feed', 'carousel', 'reels_script', 'story'] as const,
  },
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    bgBadge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    bgButton: 'bg-indigo-600 hover:bg-indigo-500',
    iconColor: 'text-indigo-400',
    formats: ['feed', 'carousel'] as const,
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0A66C2',
    bgBadge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    bgButton: 'bg-blue-600 hover:bg-blue-500',
    iconColor: 'text-blue-400',
    formats: ['feed', 'carousel'] as const,
  },
  twitter: {
    name: 'X (Twitter)',
    color: '#1DA1F2',
    bgBadge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    bgButton: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700',
    iconColor: 'text-sky-400',
    formats: ['feed', 'thread'] as const,
  },
  tiktok: {
    name: 'TikTok',
    color: '#00F2FE',
    bgBadge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    bgButton: 'bg-gradient-to-r from-cyan-500 to-rose-500 hover:from-cyan-400 hover:to-rose-400',
    iconColor: 'text-cyan-400',
    formats: ['reels_script'] as const,
  },
  whatsapp: {
    name: 'WhatsApp',
    color: '#25D366',
    bgBadge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    bgButton: 'bg-emerald-600 hover:bg-emerald-500',
    iconColor: 'text-emerald-400',
    formats: ['feed'] as const,
  },
  youtube: {
    name: 'YouTube Shorts',
    color: '#FF0000',
    bgBadge: 'bg-red-500/10 text-red-400 border-red-500/20',
    bgButton: 'bg-red-600 hover:bg-red-500',
    iconColor: 'text-red-400',
    formats: ['reels_script', 'feed'] as const,
  }
};
