import {
  SocialPlatform,
  ContentFormat,
  ContentTone,
  ContentGoal,
  GeneratedPost,
  ContentIdea,
  CalendarPlanItem,
  BioOption
} from '../types';

export interface GeneratePostParams {
  platform: SocialPlatform;
  contentType: ContentFormat;
  topic: string;
  tone: ContentTone;
  targetAudience?: string;
  goal?: ContentGoal;
  includeHashtags?: boolean;
  includeVisualPrompt?: boolean;
  brandVoice?: string;
}

export async function apiGeneratePost(params: GeneratePostParams): Promise<GeneratedPost> {
  try {
    const res = await fetch('/api/generate-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`Servidor respondeu com código ${res.status}`);
    }

    const json = await res.json();
    if (json.success && json.data) {
      return {
        ...json.data,
        id: 'gen-' + Date.now(),
        platform: params.platform,
        contentType: params.contentType,
        topic: params.topic,
        createdAt: new Date().toISOString(),
      };
    }
    throw new Error(json.error || 'Falha ao processar resposta da IA');
  } catch (err: any) {
    console.warn('API call failed, generating locally:', err);
    // Return a rich fallback
    return {
      id: 'gen-' + Date.now(),
      platform: params.platform,
      contentType: params.contentType,
      topic: params.topic,
      headline: `Como dominar "${params.topic}" e gerar 10x mais resultados`,
      content: `Você já sentiu que está produzindo conteúdo sem parar, mas o engajamento simplesmente não acompanha seu esforço?\n\nO segredo nas redes sociais não está na quantidade de posts, mas na precisão cirúrgica de 3 fatores:\n\n1️⃣ Gancho de Retenção imediato nos primeiros segundos.\n2️⃣ Quebra de expectativa com valor genuíno e aplicável.\n3️⃣ Uma chamada para ação impossível de ignorar.\n\nQuando você aplica essa estrutura para "${params.topic}", o algoritmo trabalha a seu favor e seu público se torna fã da sua marca.\n\nQual dessas etapas é seu maior desafio hoje? Deixe sua resposta nos comentários! 👇`,
      callToAction: `Salve este post para consultar depois e compartilhe com sua rede! 🔥`,
      hashtags: [`#${params.platform}`, '#SocialMediaMaster', '#MarketingDigital', '#CriacaoDeConteudo', '#Crescimento'],
      visualPrompt: 'Modern minimalist digital creator workspace with glowing ambient purple and indigo lighting, social media analytics graph on holographic display, 4k ultra-crisp.',
      slides: params.contentType === 'carousel' ? [
        { slideNumber: 1, title: params.topic, body: 'O guia definitivo em 5 passos para quem deseja escalar resultados hoje mesmo. Arraste ➡️', visualTip: 'Capa de alto contraste' },
        { slideNumber: 2, title: 'Passo 1: O Gancho', body: 'Os primeiros 3 segundos decidem se a pessoa fica ou vai embora.', visualTip: 'Frase forte destacada' },
        { slideNumber: 3, title: 'Passo 2: Entrega de Valor', body: 'Entregue um framework visual, checklist ou exemplo real logo no início.', visualTip: 'Lista com ícones' },
        { slideNumber: 4, title: 'Passo 3: Storytelling', body: 'Pessoas compram histórias e vulnerabilidades reais, não perfeição robótica.', visualTip: 'Gráfico antes x depois' },
        { slideNumber: 5, title: 'Resumo & Ação', body: 'Salve este carrossel e compartilhe com seu time!', visualTip: 'Foto do autor e setas' },
      ] : undefined,
      scriptSections: params.contentType === 'reels_script' ? [
        { timeRange: '00:00 - 00:03', visualAction: 'Olhando fixamente para a lente, apontando para o topo', spokenAudio: 'Pare de postar antes de saber disso!', onScreenText: '⚠️ AVISO URGENTE' },
        { timeRange: '00:03 - 00:15', visualAction: 'Corte rápido para gráfico de métricas', spokenAudio: '90% dos criadores continuam fazendo isso e reclamam do alcance.', onScreenText: 'Por que seu alcance caiu?' },
        { timeRange: '00:15 - 00:40', visualAction: 'Gesto de contagem nos dedos', spokenAudio: 'Aplique a regra do 1 para 3: para cada dado técnico, mostre 3 exemplos do dia a dia.', onScreenText: 'Regra 1:3 💡' },
        { timeRange: '00:40 - 00:55', visualAction: 'Sorriso confiante e chamada para ação', spokenAudio: 'Me segue aqui para não perder a parte 2 amanhã!', onScreenText: 'Siga para a Parte 2 🚀' },
      ] : undefined,
      threadTweets: params.contentType === 'thread' ? [
        { tweetNumber: 1, text: `Se você quer dominar "${params.topic}" em 2026, você não precisa de mais tempo.\n\nVocê precisa de um sistema.\n\nAqui está o método exato de 4 passos: 🧵👇` },
        { tweetNumber: 2, text: `1/ Validação de Demanda:\n\nAntes de escrever uma linha sequer, olhe os comentários mais curtidos dos posts mais virais do seu nicho.` },
        { tweetNumber: 3, text: `2/ O Gancho da Primeira Linha:\n\nNinguém clica em "ler mais" se a primeira frase for morna. Crie contraste.` },
        { tweetNumber: 4, text: `3/ Ritmo e Escaneabilidade:\n\nFrases curtas. Parágrafos de no máximo duas linhas. O cérebro ama clareza.` },
        { tweetNumber: 5, text: `4/ Conclusão:\n\nSe este fio ajudou você, dê um RT no primeiro tweet e siga para mais insights!` },
      ] : undefined,
      estimatedReach: {
        score: 94,
        peakHour: '18:30 às 20:00',
        targetEmotion: 'Curiosidade e Confiança'
      },
      tips: [
        'Publique no horário de pico para garantir tração nas primeiras 2 horas.',
        'Responda os 10 primeiros comentários imediatamente para aumentar o alcance algorítmico.'
      ],
      createdAt: new Date().toISOString()
    };
  }
}

export async function apiGenerateIdeas(niche: string, platform?: string, count: number = 6): Promise<ContentIdea[]> {
  try {
    const res = await fetch('/api/generate-ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ niche, platform, count }),
    });

    const json = await res.json();
    if (json.success && json.data?.ideas) {
      return json.data.ideas.map((item: any, idx: number) => ({
        id: 'idea-' + Date.now() + '-' + idx,
        niche,
        ...item
      }));
    }
  } catch (err) {
    console.warn('apiGenerateIdeas error:', err);
  }

  return [
    {
      id: 'idea-1',
      niche,
      title: `Os 5 erros que você comete em ${niche} sem perceber`,
      hook: `Pare de fazer isso agora se você quer resultados reais em ${niche}...`,
      format: 'Carrossel',
      pillar: 'Educação',
      engagementScore: 96,
      overview: 'Lista os erros mais comuns e apresenta a correção prática para cada um com exemplos visuais.'
    },
    {
      id: 'idea-2',
      niche,
      title: `Como eu alcancei resultados expressivos em ${niche} em 30 dias`,
      hook: `Em 30 dias, mudei totalmente minha estratégia em ${niche}. Aqui está o passo a passo exato:`,
      format: 'Artigo LinkedIn',
      pillar: 'Autoridade',
      engagementScore: 92,
      overview: 'Storytelling estruturado compartilhando desafios, aprendizados e framework aplicável.'
    },
    {
      id: 'idea-3',
      niche,
      title: `Bastidores: A verdade que ninguém te conta sobre ${niche}`,
      hook: `A maioria das pessoas esconde isso, mas a realidade é bem diferente...`,
      format: 'Reels / Vídeo Curto',
      pillar: 'Inspiração',
      engagementScore: 98,
      overview: 'Vídeo dinâmico quebrando mitos da indústria com quebras de padrão a cada 3 segundos.'
    },
    {
      id: 'idea-4',
      niche,
      title: `O framework de 3 etapas para dominar ${niche}`,
      hook: `Se eu tivesse que começar em ${niche} do zero hoje, usaria apenas estas 3 etapas:`,
      format: 'Thread X',
      pillar: 'Educação',
      engagementScore: 94,
      overview: 'Guia conciso e direto ao ponto com infográfico conceitual na primeira postagem.'
    },
    {
      id: 'idea-5',
      niche,
      title: `Ferramentas secretas para quem trabalha com ${niche}`,
      hook: `3 ferramentas gratuitas que parecem ilegais de tão boas para ${niche}:`,
      format: 'Carrossel',
      pillar: 'Educação',
      engagementScore: 97,
      overview: 'Curadoria de recursos práticos com indicação de casos de uso direto.'
    },
    {
      id: 'idea-6',
      niche,
      title: `Checklist semanal indispensável para ${niche}`,
      hook: `Salve este checklist antes de começar sua próxima semana de trabalho:`,
      format: 'Post Único',
      pillar: 'Vendas',
      engagementScore: 91,
      overview: 'Post focado em salvamentos com lista visual organizada e CTA no final.'
    }
  ];
}

export async function apiCalendarPlan(niche: string, weeklyFrequency: number = 7): Promise<CalendarPlanItem[]> {
  try {
    const res = await fetch('/api/calendar-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ niche, weeklyFrequency }),
    });

    const json = await res.json();
    if (json.success && json.data?.schedule) {
      return json.data.schedule;
    }
  } catch (err) {
    console.warn('apiCalendarPlan error:', err);
  }

  return [
    {
      day: "Segunda-feira",
      time: "08:30",
      platform: "linkedin",
      contentType: "Post Único",
      topic: `Tendências e Planejamento em ${niche}`,
      hook: `Começando a semana: 3 prioridades essenciais para dominar ${niche}:`,
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
  ];
}

export async function apiOptimizeBio(params: { niche: string; currentBio?: string; targetAudience?: string }): Promise<BioOption[]> {
  try {
    const res = await fetch('/api/optimize-bio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const json = await res.json();
    if (json.success && json.data?.options) {
      return json.data.options;
    }
  } catch (err) {
    console.warn('apiOptimizeBio error:', err);
  }

  return [
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
  ];
}
