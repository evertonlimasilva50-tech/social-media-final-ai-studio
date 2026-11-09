import express, { Request, Response } from 'express';
import {
  generateSocialPost,
  generateContentIdeas,
  generateCalendarPlan,
  optimizeBio,
  GeneratePostRequest
} from './geminiService';
import {
  MCP_SERVERS_REGISTRY,
  MCP_TOOLS_REGISTRY,
  executeMCPTool
} from './mcpRegistry';

export const apiRouter = express.Router();

apiRouter.use(express.json());

// MCP Endpoints (Model Context Protocol)
apiRouter.get('/mcp/servers', (_req: Request, res: Response) => {
  res.json({ success: true, servers: MCP_SERVERS_REGISTRY });
});

apiRouter.get('/mcp/tools', (_req: Request, res: Response) => {
  res.json({ success: true, tools: MCP_TOOLS_REGISTRY });
});

apiRouter.post('/mcp/execute', async (req: Request, res: Response) => {
  try {
    const { toolName, args } = req.body;
    if (!toolName) {
      return res.status(400).json({ success: false, error: 'toolName é obrigatório' });
    }
    const result = await executeMCPTool(toolName, args || {});
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Erro ao executar ferramenta MCP' });
  }
});

apiRouter.post('/generate-post', async (req: Request, res: Response) => {
  try {
    const payload: GeneratePostRequest = req.body;
    const result = await generateSocialPost(payload);
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error generating post:', error);
    res.status(500).json({ success: false, error: error.message || 'Erro ao gerar post' });
  }
});

apiRouter.post('/generate-ideas', async (req: Request, res: Response) => {
  try {
    const { niche, platform, count } = req.body;
    const result = await generateContentIdeas({ niche: niche || 'Marketing Digital', platform, count });
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error generating ideas:', error);
    res.status(500).json({ success: false, error: error.message || 'Erro ao gerar ideias' });
  }
});

apiRouter.post('/calendar-plan', async (req: Request, res: Response) => {
  try {
    const { niche, weeklyFrequency } = req.body;
    const result = await generateCalendarPlan({ niche: niche || 'Empreendedorismo', weeklyFrequency });
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error generating calendar:', error);
    res.status(500).json({ success: false, error: error.message || 'Erro ao planejar calendário' });
  }
});

apiRouter.post('/optimize-bio', async (req: Request, res: Response) => {
  try {
    const { niche, currentBio, targetAudience } = req.body;
    const result = await optimizeBio({ niche: niche || 'Geral', currentBio, targetAudience });
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error optimizing bio:', error);
    res.status(500).json({ success: false, error: error.message || 'Erro ao otimizar bio' });
  }
});

apiRouter.post('/channels/test-webhook', async (req: Request, res: Response) => {
  try {
    const { webhookUrl, platform, testPost } = req.body;
    if (!webhookUrl || !webhookUrl.startsWith('http')) {
      return res.status(400).json({ success: false, error: 'URL de webhook inválida' });
    }

    const payload = {
      event: 'social_media_master.publish_test',
      timestamp: new Date().toISOString(),
      platform: platform || 'instagram',
      content: testPost || {
        headline: 'Post de Teste - Social Media Master',
        caption: 'Este é um teste de integração disparado pelo Social Media Master! 🚀',
        hashtags: ['#SocialMediaMaster', '#Integracao'],
        status: 'published'
      }
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    res.json({
      success: true,
      statusCode: response.status,
      message: `Webhook disparado com sucesso! Resposta do endpoint: status ${response.status}`
    });
  } catch (error: any) {
    console.error('Error triggering webhook:', error);
    res.status(500).json({ success: false, error: error.message || 'Erro ao conectar ao webhook' });
  }
});

apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});
