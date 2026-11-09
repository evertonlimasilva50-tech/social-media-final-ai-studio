import { GoogleGenAI } from '@google/genai';

// Initialize Gemini client according to AI Studio guidelines
export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export interface GeneratePostRequest {
  platform: 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'facebook';
  contentType: 'feed' | 'carousel' | 'reels_script' | 'thread' | 'story';
  topic: string;
  tone: 'professional' | 'casual' | 'viral' | 'educational' | 'storytelling' | 'persuasive';
  targetAudience?: string;
  goal?: 'engagement' | 'leads' | 'sales' | 'brand_awareness' | 'community';
  includeHashtags?: boolean;
  includeVisualPrompt?: boolean;
  brandVoice?: string;
  language?: string;
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

export interface GeneratedPostResponse {
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
}

export async function generateSocialPost(params: GeneratePostRequest): Promise<GeneratedPostResponse> {
  const ai = getGeminiClient();

  const prompt = `
Você é o "Social Media Master AI", o mais renomado estrategista de redes sociais, copywriter viral e gestor de crescimento digital do mundo.
Crie um conteúdo completo e de altíssimo impacto para a seguinte configuração:

- Plataforma Alvo: ${params.platform.toUpperCase()}
- Formato de Conteúdo: ${params.contentType}
- Tema / Assunto: "${params.topic}"
- Tom de Voz: ${params.tone}
- Público Alvo: ${params.targetAudience || 'Profissionais, criadores e entusiastas do nicho'}
- Objetivo Principal: ${params.goal || 'Engajamento e autoridade'}
- Voz de Marca: ${params.brandVoice || 'Autêntica, moderna e orientada a resultados'}
- Idioma: Português do Brasil (pt-BR)

Diretrizes específicas por plataforma:
- Se INSTAGRAM Feed/Reels: Use gancho irresistível na 1ª linha, espaçamento limpo entre parágrafos, emojis estratégicos, CTA claro para salvar/compartilhar, e hashtags categorizadas.
- Se LINKEDIN: Formato de storytelling ou lição prática, abertura com contraste ou questionamento, sem hashtags excessivas (3 a 5 máx), tom construtivo e que convide ao debate no comentário.
- Se TWITTER / X (Thread): Divida em sequência de 4 a 6 tweets curtos com gancho magnético no tweet 1 e CTA final para RT.
- Se TIKTOK / REELS (Roteiro em vídeo): Roteiro cronometrado (0-3s gancho visual e falado, 3-15s retenção e quebra de padrão, 15-45s entrega de ouro, 45-60s CTA forte).
- Se CARROSSEL: Forneça 5 a 7 slides detalhados (Capa com Gancho, Miolo com valor progressivo, Slide Final com CTA e Salvamento).

Responda ESTRITAMENTE em formato JSON puro, sem blocos markdown extras ou texto adicional, seguindo este formato exato:
{
  "headline": "Título chamativo ou gancho inicial",
  "content": "Texto completo e pronto para postar, já formatado com quebras de linha e emojis adequados",
  "callToAction": "Chamada para ação clara",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
  "visualPrompt": "Descrição detalhada em inglês e português para gerar ou fotografar a imagem/cenário perfeito",
  "slides": [
    { "slideNumber": 1, "title": "Capa do Carrossel", "body": "Texto principal do slide", "visualTip": "Instrução visual para o design do slide" }
  ],
  "scriptSections": [
    { "timeRange": "00:00 - 00:03", "visualAction": "Ação na câmera", "spokenAudio": "Texto falado com ênfase", "onScreenText": "Texto na tela" }
  ],
  "threadTweets": [
    { "tweetNumber": 1, "text": "Texto do tweet 1/5" }
  ],
  "estimatedReach": {
    "score": 94,
    "peakHour": "18:30 às 20:00",
    "targetEmotion": "Curiosidade e Aspiração"
  },
  "tips": [
    "Dica prática de publicação 1",
    "Dica prática de publicação 2"
  ]
}
`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'Você é um estrategista de conteúdo para mídias sociais de nível mundial. Responda sempre em JSON válido.',
        },
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText.trim());
        return parsed as GeneratedPostResponse;
      }
    } catch (err) {
      console.warn('Gemini API call failed, using high-quality local generation fallback:', err);
    }
  }

  // High quality local fallback if API key is unconfigured or rate limited
  return getFallbackPost(params);
}

export async function generateContentIdeas(params: { niche: string; platform?: string; count?: number }) {
  const ai = getGeminiClient();
  const count = params.count || 6;
  const prompt = `
Gere ${count} ideias virais e de alto valor de conteúdo para redes sociais no nicho: "${params.niche}".
Plataforma foco: ${params.platform || 'Multi-plataforma (Instagram, LinkedIn, TikTok, YouTube, X)'}.

Para cada ideia, forneça:
1. title: Título da ideia
2. hook: Gancho magnético dos primeiros 3 segundos ou primeira linha
3. format: 'Carrossel' | 'Reels / Vídeo Curto' | 'Artigo LinkedIn' | 'Thread X' | 'Post Único'
4. pillar: 'Educação' | 'Entretenimento' | 'Inspiração' | 'Vendas' | 'Autoridade'
5. engagementScore: nota de 1 a 100 de potencial de compartilhamento
6. overview: breve explicação de como executar

Responda ESTRITAMENTE em formato JSON:
{
  "ideas": [
    {
      "title": "...",
      "hook": "...",
      "format": "...",
      "pillar": "...",
      "engagementScore": 95,
      "overview": "..."
    }
  ]
}
`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
      if (response.text) {
        return JSON.parse(response.text.trim());
      }
    } catch (e) {
      console.warn('Gemini ideas fallback:', e);
    }
  }

  return {
    ideas: [
      {
        title: `Os 5 erros que você comete em ${params.niche} sem perceber`,
        hook: `Pare de fazer isso agora se você quer resultados reais em ${params.niche}...`,
        format: 'Carrossel',
        pillar: 'Educação',
        engagementScore: 96,
        overview: 'Lista os erros mais comuns e apresenta a correção prática para cada um com exemplos.'
      },
      {
        title: `Como eu alcancei resultados expressivos em ${params.niche} em 30 dias`,
        hook: `Em 30 dias, mudei totalmente minha estratégia em ${params.niche}. Aqui está o passo a passo exato:`,
        format: 'Artigo LinkedIn',
        pillar: 'Autoridade',
        engagementScore: 92,
        overview: 'Storytelling estruturado compartilhando desafios, aprendizados e framework aplicável.'
      },
      {
        title: `Bastidores: A verdade que ninguém te conta sobre ${params.niche}`,
        hook: `A maioria das pessoas esconde isso, mas a realidade é bem diferente...`,
        format: 'Reels / Vídeo Curto',
        pillar: 'Inspiração',
        engagementScore: 98,
        overview: 'Vídeo dinâmico quebrando mitos da indústria com quebras de padrão a cada 3 segundos.'
      },
      {
        title: `O framework de 3 etapas para dominar ${params.niche}`,
        hook: `Se eu tivesse que começar em ${params.niche} do zero hoje, usaria apenas estas 3 etapas:`,
        format: 'Thread X',
        pillar: 'Educação',
        engagementScore: 94,
        overview: 'Guia conciso e direto ao ponto com infográfico conceitual na primeira postagem.'
      },
      {
        title: `Ferramentas secretas para quem trabalha com ${params.niche}`,
        hook: `3 ferramentas gratuitas que parecem ilegais de tão boas para ${params.niche}:`,
        format: 'Carrossel',
        pillar: 'Educação',
        engagementScore: 97,
        overview: 'Curadoria de recursos práticos com indicação de casos de uso.'
      },
      {
        title: `Checklist semanal indispensável para ${params.niche}`,
        hook: `Salve este checklist antes de começar sua próxima semana de trabalho:`,
        format: 'Post Único',
        pillar: 'Vendas',
        engagementScore: 91,
        overview: 'Post focado em salvamentos com lista visual organizada e CTA no final.'
      }
    ]
  };
}

export async function generateCalendarPlan(params: { niche: string; weeklyFrequency?: number }) {
  const ai = getGeminiClient();
  const freq = params.weeklyFrequency || 7;
  const prompt = `
Gere um cronograma editorial semanal completo (${freq} dias) para uma marca ou criador no nicho de "${params.niche}".
Para cada dia da semana (Segunda a Domingo):
- day: Nome do dia (Ex: 'Segunda-feira')
- time: Horário recomendado (Ex: '12:30')
- platform: 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube'
- contentType: 'Carrossel' | 'Reels' | 'Post Único' | 'Thread' | 'Shorts'
- topic: Tema principal
- hook: Gancho de impacto
- goal: Objetivo ('Atrair', 'Conectar', 'Converter', 'Reter')

Responda ESTRITAMENTE em formato JSON:
{
  "schedule": [
    {
      "day": "Segunda-feira",
      "time": "08:30",
      "platform": "linkedin",
      "contentType": "Post Único",
      "topic": "Tendências da Semana",
      "hook": "3 coisas que vão moldar seu setor nos próximos 7 dias:",
      "goal": "Atrair"
    }
  ]
}
`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
      if (response.text) {
        return JSON.parse(response.text.trim());
      }
    } catch (e) {
      console.warn('Gemini calendar fallback:', e);
    }
  }

  return {
    schedule: [
      {
        day: "Segunda-feira",
        time: "08:30",
        platform: "linkedin",
        contentType: "Post Único",
        topic: `Tendências e Planejamento em ${params.niche}`,
        hook: `Começando a semana: 3 prioridades essenciais para dominar ${params.niche}:`,
        goal: "Atrair"
      },
      {
        day: "Terça-feira",
        time: "12:00",
        platform: "instagram",
        contentType: "Carrossel",
        topic: "Tutorial Prático Passo a Passo",
        hook: "Como resolver o maior gargalo operacional sem gastar nada a mais ⬇️",
        goal: "Conectar"
      },
      {
        day: "Quarta-feira",
        time: "18:45",
        platform: "tiktok",
        contentType: "Reels",
        topic: "Quebra de Mito Rápido",
        hook: "Se te disseram que você precisa de muito dinheiro para isso, mentiram para você.",
        goal: "Atrair"
      },
      {
        day: "Quinta-feira",
        time: "14:15",
        platform: "twitter",
        contentType: "Thread",
        topic: "Estudo de Caso & Métricas",
        hook: "Analisamos 100 casos reais de sucesso neste segmento. Aqui estão os 4 padrões ocultos:",
        goal: "Conectar"
      },
      {
        day: "Sexta-feira",
        time: "17:30",
        platform: "instagram",
        contentType: "Reels",
        topic: "Bastidores & Resumo Semanal",
        hook: "O erro que quase custou caro esta semana (e como você pode evitar):",
        goal: "Conectar"
      },
      {
        day: "Sábado",
        time: "11:00",
        platform: "youtube",
        contentType: "Shorts",
        topic: "Dica Rápida de Produtividade",
        hook: "Faça isso em 60 segundos antes de encerrar sua rotina de hoje:",
        goal: "Reter"
      },
      {
        day: "Domingo",
        time: "19:00",
        platform: "instagram",
        contentType: "Carrossel",
        topic: "Reflexão Estratégica & Planejamento",
        hook: "5 perguntas que todo profissional de alto rendimento se faz no domingo à noite:",
        goal: "Converter"
      }
    ]
  };
}

export async function optimizeBio(params: { niche: string; currentBio?: string; targetAudience?: string }) {
  const ai = getGeminiClient();
  const prompt = `
Otimize biografias de perfil de rede social (Instagram / LinkedIn / TikTok / X) para o nicho "${params.niche}".
Bio atual (se houver): "${params.currentBio || 'Não fornecida'}".
Público Alvo: "${params.targetAudience || 'Geral do nicho'}".

Gere 3 propostas de biografia de alta conversão:
1. Direta & Focada em Autoridade (Credenciais + Proposta de Valor)
2. Viral & Engajadora (Gancho curioso + Personalidade marcante)
3. Focada em Vendas & CTA (Transformação imediata + Link na bio)

Responda em formato JSON:
{
  "options": [
    {
      "style": "Autoridade & Resultados",
      "bio": "Texto da bio com emojis e quebras de linha",
      "cta": "Texto recomendado para a chamada do link",
      "highlightNames": ["Destaque 1", "Destaque 2", "Destaque 3"]
    }
  ]
}
`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
      if (response.text) {
        return JSON.parse(response.text.trim());
      }
    } catch (e) {
      console.warn('Gemini bio fallback:', e);
    }
  }

  return {
    options: [
      {
        style: "Autoridade & Resultados",
        bio: `🚀 Ajudando marcas e pessoas a crescerem em ${params.niche}\n📈 +500 mil pessoas impactadas mensalmente\n💡 Estratégias validadas e sem enrolação\n👇 Acesse meus materiais gratuitos:`,
        cta: "Baixar Guia Gratuito",
        highlightNames: ["Resultados", "Comece Aqui", "Depoimentos", "Ferramentas"]
      },
      {
        style: "Viral & Comunidade",
        bio: `✨ Descomplicando ${params.niche} todos os dias\n🧠 Ideias práticas que você aplica em 5 minutos\n🔥 Conteúdos novos de segunda a sexta\n👇 Faça parte da nossa comunidade:`,
        cta: "Entrar no Grupo VIP",
        highlightNames: ["Dicas Rápidas", "Bastidores", "Q&A", "Comunidade"]
      },
      {
        style: "Conversão & Vendas",
        bio: `🎯 Escale seus resultados em ${params.niche} em até 30 dias\n💼 Consultoria, mentorias e produtos de alto valor\n⚡ Vagas abertas para a nova turma\n👇 Garanta sua vaga com condição especial:`,
        cta: "Agendar Sessão Estratégica",
        highlightNames: ["Serviços", "Casos de Sucesso", "Metodologia", "FAQ"]
      }
    ]
  };
}

function getFallbackPost(params: GeneratePostRequest): GeneratedPostResponse {
  const platformName = params.platform.charAt(0).toUpperCase() + params.platform.slice(1);
  const topic = params.topic || 'Estratégias de Crescimento nas Redes Sociais';

  return {
    headline: `Como dominar "${topic}" e gerar 10x mais resultados no ${platformName}`,
    content: `Você já sentiu que está produzindo conteúdo sem parar, mas o engajamento simplesmente não acompanha seu esforço?\n\nA verdade é que em ${platformName}, o segredo não está na quantidade de posts, mas na precisão cirúrgica de 3 fatores:\n\n1️⃣ Gancho de Retenção imediato nos primeiros segundos.\n2️⃣ Quebra de expectativa com valor genuíno e aplicável.\n3️⃣ Uma chamada para ação impossível de ignorar.\n\nQuando você aplica essa estrutura para "${topic}", o algoritmo trabalha a seu favor e seu público se torna fã da sua marca.\n\nQual dessas 3 etapas tem sido o maior desafio para você hoje? Deixe sua resposta nos comentários! 👇`,
    callToAction: `Salve este post para consultar depois e compartilhe com alguém que precisa ver isso hoje! 🔥`,
    hashtags: [
      `#${params.platform}`,
      `#SocialMediaMaster`,
      `#MarketingDigital`,
      `#CriacaoDeConteudo`,
      `#CrescimentoDigital`,
      `#EstrategiaDeConteudo`
    ],
    visualPrompt: `High quality modern digital creator workspace with glowing ambient purple and indigo lighting, ultra clean minimalist aesthetic, social media analytics graph on holographic screen, 4K crisp detail.`,
    slides: params.contentType === 'carousel' ? [
      {
        slideNumber: 1,
        title: topic,
        body: `O guia definitivo em 5 passos para quem deseja escalar resultados no ${platformName} hoje mesmo. Arraste para o lado ➡️`,
        visualTip: `Capa minimalista com tipografia forte e gradiente sutil roxo e azul escuro.`
      },
      {
        slideNumber: 2,
        title: `Passo 1: O Gancho Magnético`,
        body: `Os primeiros 3 segundos decidem se a pessoa fica ou vai embora. Comece sempre com uma quebra de expectativa ou afirmação ousada.`,
        visualTip: `Destaque uma frase de impacto em caixa alta com fundo escuro de alto contraste.`
      },
      {
        slideNumber: 3,
        title: `Passo 2: Entrega de Valor Direto`,
        body: `Não guarde o melhor para o final. Entregue um framework visual, checklist ou exemplo real logo no segundo slide.`,
        visualTip: `Card com 3 tópicos numerados e ícones claros.`
      },
      {
        slideNumber: 4,
        title: `Passo 3: Storytelling & Conexão`,
        body: `Pessoas compram e se conectam com histórias e vulnerabilidades reais, não com perfeição robótica.`,
        visualTip: `Gráfico simples ou captura de tela demonstrando o antes x depois.`
      },
      {
        slideNumber: 5,
        title: `Resumo & Próximo Passo`,
        body: `Salve este carrossel para não esquecer. Toque no link da bio para desbloquear o guia completo!`,
        visualTip: `Slide de encerramento com foto do criador, setas indicando salvar e compartilhar.`
      }
    ] : undefined,
    scriptSections: params.contentType === 'reels_script' ? [
      {
        timeRange: '00:00 - 00:03',
        visualAction: 'Olhando fixamente para a lente, apontando para o texto que surge no topo.',
        spokenAudio: `Pare de postar no ${platformName} antes de saber disso!`,
        onScreenText: `⚠️ AVISO URGENTE: O maior erro que você comete`
      },
      {
        timeRange: '00:03 - 00:15',
        visualAction: 'Corte rápido, mostrando tela do celular ou gráfico de métricas em queda.',
        spokenAudio: `90% dos criadores continuam fazendo isso e reclamam que o algoritmo mudou. Mas o segredo é outro:`,
        onScreenText: `Por que seu engajamento despencou?`
      },
      {
        timeRange: '00:15 - 00:40',
        visualAction: 'Gesto de contagem nos dedos com ritmo acelerado e edição dinâmica.',
        spokenAudio: `Em vez de fazer textos longos sem respiração, use a regra do 1 para 3: para cada dado técnico, mostre 3 exemplos do cotidiano.`,
        onScreenText: `Regra 1:3 💡 Aplique agora`
      },
      {
        timeRange: '00:40 - 00:55',
        visualAction: 'Sorriso confiante, apontando para baixo na direção do botão de seguir.',
        spokenAudio: `Se você quer dominar a criação de conteúdo com inteligência artificial, me segue aqui para não perder a parte 2!`,
        onScreenText: `Siga para a Parte 2 🚀`
      }
    ] : undefined,
    threadTweets: params.contentType === 'thread' ? [
      {
        tweetNumber: 1,
        text: `Se você quer dominar "${topic}" em 2026, você não precisa de mais tempo.\n\nVocê precisa de um sistema.\n\nAqui está o método exato de 4 passos que uso diariamente: 🧵👇`
      },
      {
        tweetNumber: 2,
        text: `1/ Passo 1: Validação de Demanda\n\nAntes de escrever uma linha sequer, olhe os comentários mais curtidos dos posts mais virais do seu nicho.\n\nAs maiores dores do seu cliente já estão digitadas lá de graça.`
      },
      {
        tweetNumber: 3,
        text: `2/ Passo 2: O Gancho da Primeira Linha\n\nNinguém clica em "ler mais" se a primeira frase for morna.\n\nUse contraste: "Todo mundo fala para fazer X. Mas quem realmente fatura faz Y".`
      },
      {
        tweetNumber: 4,
        text: `3/ Passo 3: Ritmo e Escaneabilidade\n\nFrases curtas.\nParágrafos de no máximo duas linhas.\n\nO cérebro ama facilidade visual.`
      },
      {
        tweetNumber: 5,
        text: `4/ Conclusão:\n\nSe este fio agregou valor para você:\n1. Dê um RT no primeiro tweet para ajudar outros criadores.\n2. Siga o perfil para mais insights semanais!`
      }
    ] : undefined,
    estimatedReach: {
      score: 95,
      peakHour: '18:00 - 20:30',
      targetEmotion: 'Empoderamento e Clareza'
    },
    tips: [
      `Publique no horário de pico (${platformName === 'Linkedin' ? '08:00 às 10:00' : '18:00 às 20:30'}).`,
      `Responda a todos os comentários nos primeiros 60 minutos para impulsionar a distribuição algorítmica.`,
      `Fixe o comentário mais relevante com uma pergunta aberta estimulando o debate.`
    ]
  };
}
