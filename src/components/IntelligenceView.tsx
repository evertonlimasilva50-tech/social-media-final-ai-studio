import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sliders,
  Cpu,
  Layers,
  ArrowDown,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  TrendingDown,
  Activity,
  Plus,
  Terminal,
  Server,
  Shield,
  RefreshCw,
  GitBranch,
  Network,
  Wrench,
  Play,
  Box,
  Radio,
  FileCode,
  Sparkles
} from 'lucide-react';
import { AIModelInfo, FallbackChainStep } from '../types';
import { INITIAL_AI_MODELS, INITIAL_FALLBACK_CHAIN } from '../data/mockData';
import { MCP_SERVERS_REGISTRY, MCP_TOOLS_REGISTRY, MCPToolDeclaration, MCPServerInfo } from '../server/mcpRegistry';

export const IntelligenceView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'routing' | 'mcps'>('routing');
  const [models, setModels] = useState<AIModelInfo[]>(INITIAL_AI_MODELS);
  const [fallbackChain, setFallbackChain] = useState<FallbackChainStep[]>(INITIAL_FALLBACK_CHAIN);
  const [sdkTab, setSdkTab] = useState<'curl' | 'python' | 'js' | 'go'>('curl');
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeEngineCategory, setActiveEngineCategory] = useState<'all' | 'cloud' | 'local'>('all');

  // MCP State
  const [selectedMcpTool, setSelectedMcpTool] = useState<MCPToolDeclaration>(MCP_TOOLS_REGISTRY[0]);
  const [mcpExecutionResult, setMcpExecutionResult] = useState<any>(null);
  const [isExecutingMcp, setIsExecutingMcp] = useState(false);

  const SDK_SNIPPETS = {
    curl: `curl https://api.openrouter.ai/v1/chat/completions \\
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "Olá, crie um post viral!"}]
  }'`,
    python: `from openai import OpenAI

client = OpenAI(
  base_url="https://api.openrouter.ai/v1",
  api_key="sua_chave_aqui",
)

completion = client.chat.completions.create(
  model="auto",
  messages=[{"role": "user", "content": "Olá, crie um post viral!"}]
)
print(completion.choices[0].message.content)`,
    js: `import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: "https://api.openrouter.ai/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "auto",
  messages: [{ role: "user", content: "Olá, crie um post viral!" }],
});`,
    go: `package main

import (
  "bytes"
  "net/http"
)

func main() {
  req, _ := http.NewRequest("POST", "https://api.openrouter.ai/v1/chat/completions", bytes.NewBuffer(jsonData))
  req.Header.Set("Authorization", "Bearer " + apiKey)
}`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SDK_SNIPPETS[sdkTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleExecuteTool = async () => {
    setIsExecutingMcp(true);
    try {
      const res = await fetch('/api/mcp/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolName: selectedMcpTool.name,
          args: {
            platform: 'instagram',
            niche: 'Inteligência Artificial e Negócios',
            content: 'Post de validação executado pelo protocolo MCP.',
            query: 'Diretrizes de tom de voz da marca',
            webhookUrl: 'https://webhook.site/test',
            event: 'social_media.publish'
          }
        })
      });
      const data = await res.json();
      setMcpExecutionResult(data.result);
    } catch (e: any) {
      setMcpExecutionResult({ error: e.message || 'Falha ao executar ferramenta MCP' });
    } finally {
      setIsExecutingMcp(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="text-white">Central de Inteligência</span>
            <span>&gt;</span>
            <span className="text-indigo-400">Administração do Cérebro & Protocolos MCP</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Administração do Cérebro & MCPs
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Controle de modelos (OpenRouter, Gemini, Ollama, vLLM, LMDeploy) e ecossistema de servidores Model Context Protocol (MCP).
          </p>
        </div>

        {/* Top Subtabs: Roteamento vs Servidores MCP */}
        <div className="flex items-center gap-1 bg-[#080d1e] p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveSubTab('routing')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'routing' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Roteamento de Modelos</span>
          </button>
          <button
            onClick={() => setActiveSubTab('mcps')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'mcps' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>Servidores & Ferramentas MCP (6)</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'routing' ? (
        /* ================= 1. MODEL ROUTING VIEW (Matching Image 3) ================= */
        <div className="space-y-5">
          {/* Engine Filter Pills */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1 bg-[#080d1e] p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveEngineCategory('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeEngineCategory === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Todos os Provedores
              </button>
              <button
                onClick={() => setActiveEngineCategory('cloud')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeEngineCategory === 'cloud' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Nuvem (Gemini / OpenAI / Claude)
              </button>
              <button
                onClick={() => setActiveEngineCategory('local')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeEngineCategory === 'local' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Local (Ollama / vLLM / llama.cpp / LMDeploy)
              </button>
            </div>

            <span className="text-xs text-slate-400 font-mono">
              Provedor Nativo: <strong className="text-emerald-400">Gemini 3.8 Flash</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT COLUMN (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              {/* Model Comparison Table */}
              <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">Comparativo de Modelos</h3>
                    <span className="text-[11px] text-slate-500">Pontuações combinam latência, custo e disponibilidade</span>
                  </div>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                    <RefreshCw className="w-3 h-3 text-indigo-400" />
                    Atualizado há 2 min
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#080d1e] text-slate-400 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="py-2.5 px-3 rounded-l-lg">Modelo</th>
                        <th className="py-2.5 px-3">Latência (p50)</th>
                        <th className="py-2.5 px-3">Custo / 1M Tokens (USD)</th>
                        <th className="py-2.5 px-3">Disponibilidade</th>
                        <th className="py-2.5 px-3 rounded-r-lg">Pontuação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans">
                      {models.map((model) => (
                        <tr key={model.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${model.badgeBg} ${model.badgeColor}`}>
                                {model.badgeLetter}
                              </div>
                              <div>
                                <span className="font-bold text-white block text-xs">{model.name}</span>
                                <span className="text-[10px] text-slate-500 font-mono">{model.subName}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-semibold text-white block">{model.latencyP50}</span>
                            <span className="text-[10px] text-emerald-400 font-medium">Excelente</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-bold text-white block">{model.costPer1MTokens}</span>
                            <span className="text-[10px] text-emerald-400 font-medium">{model.costTrend}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="flex items-center gap-1 font-semibold text-white">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              {model.availability}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-medium block">Excelente</span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
                                <div
                                  style={{ width: `${(model.score / 10) * 100}%` }}
                                  className="h-full bg-emerald-400 rounded-full"
                                />
                              </div>
                              <span className="font-extrabold text-white text-xs">{model.score}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Unified API Endpoint */}
              <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3 flex-wrap gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">Endpoint Unificado de API</h3>
                    <span className="text-[11px] text-slate-400 font-mono">api.openrouter.ai/v1 (ou proxy inteligente local)</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#080d1e] p-1 rounded-xl border border-slate-800 text-xs">
                    {(['curl', 'python', 'js', 'go'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setSdkTab(tab)}
                        className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-all ${
                          sdkTab === tab ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative bg-[#080d1e] rounded-xl p-4 border border-slate-900 font-mono text-xs text-slate-200 overflow-x-auto">
                  <button
                    onClick={handleCopyCode}
                    className="absolute right-3 top-3 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 hover:text-white transition-colors flex items-center gap-1"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                  <pre className="pr-16 leading-relaxed whitespace-pre">{SDK_SNIPPETS[sdkTab]}</pre>
                </div>
              </div>

              {/* Live Request Router */}
              <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">Roteador de Requisições em Tempo Real</h3>
                    <span className="text-[11px] text-slate-400">Distribuição dinâmica de tráfego e balanceamento inteligente</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Divisão de Tráfego
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-4 bg-[#080d1e] p-4 rounded-xl border border-slate-900 text-center space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Requisições Recebidas
                    </span>
                    <div className="text-2xl font-extrabold text-white">1.248</div>
                    <span className="text-[11px] text-indigo-400 font-mono font-semibold">req/min</span>
                    <div className="h-6 flex items-end justify-center gap-1 pt-1">
                      {[20, 50, 40, 80, 60, 90, 75].map((h, i) => (
                        <span key={i} style={{ height: `${h}%` }} className="w-1.5 rounded-t bg-indigo-500" />
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-8 space-y-2.5">
                    <div className="flex items-center justify-between text-xs bg-[#080d1e] p-2.5 rounded-xl border border-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-emerald-900/40 text-emerald-400 font-bold text-[10px] flex items-center justify-center">G</span>
                        <span className="font-bold text-white">GPT-4o</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 rounded-full bg-slate-900 overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full w-[45%]" />
                        </div>
                        <span className="font-bold text-white text-[11px] w-8">45%</span>
                        <span className="text-[10px] text-slate-400 font-mono w-16 text-right">562 req/min</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs bg-[#080d1e] p-2.5 rounded-xl border border-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-amber-900/40 text-amber-400 font-bold text-[10px] flex items-center justify-center">C</span>
                        <span className="font-bold text-white">Claude</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 rounded-full bg-slate-900 overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full w-[25%]" />
                        </div>
                        <span className="font-bold text-white text-[11px] w-8">25%</span>
                        <span className="text-[10px] text-slate-400 font-mono w-16 text-right">312 req/min</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs bg-[#080d1e] p-2.5 rounded-xl border border-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-blue-900/40 text-blue-400 font-bold text-[10px] flex items-center justify-center">L</span>
                        <span className="font-bold text-white">Llama</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 rounded-full bg-slate-900 overflow-hidden">
                          <div className="h-full bg-blue-400 rounded-full w-[20%]" />
                        </div>
                        <span className="font-bold text-white text-[11px] w-8">20%</span>
                        <span className="text-[10px] text-slate-400 font-mono w-16 text-right">250 req/min</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs bg-[#080d1e] p-2.5 rounded-xl border border-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-purple-900/40 text-purple-400 font-bold text-[10px] flex items-center justify-center">M</span>
                        <span className="font-bold text-white">Mistral</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 rounded-full bg-slate-900 overflow-hidden">
                          <div className="h-full bg-purple-400 rounded-full w-[10%]" />
                        </div>
                        <span className="font-bold text-white text-[11px] w-8">10%</span>
                        <span className="text-[10px] text-slate-400 font-mono w-16 text-right">124 req/min</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-900 text-center font-mono">
                  <div className="p-2 bg-[#080d1e] rounded-lg">
                    <span className="text-[9px] text-slate-500 uppercase block">Vazão Total</span>
                    <span className="text-xs font-bold text-white">1.248 req/min</span>
                  </div>
                  <div className="p-2 bg-[#080d1e] rounded-lg">
                    <span className="text-[9px] text-slate-500 uppercase block">Bem-sucedidas</span>
                    <span className="text-xs font-bold text-emerald-400">99,6%</span>
                  </div>
                  <div className="p-2 bg-[#080d1e] rounded-lg">
                    <span className="text-[9px] text-slate-500 uppercase block">Falhas</span>
                    <span className="text-xs font-bold text-rose-400">0,4%</span>
                  </div>
                  <div className="p-2 bg-[#080d1e] rounded-lg">
                    <span className="text-[9px] text-slate-500 uppercase block">Latência P95</span>
                    <span className="text-xs font-bold text-indigo-300">1,28s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              {/* Fallback Chain Configuration */}
              <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Cadeia de Contingência (Fallback)</span>
                  <button className="text-indigo-400 hover:text-indigo-300 font-semibold text-[11px] flex items-center gap-0.5">
                    <Plus className="w-3 h-3" /> Nova Cadeia
                  </button>
                </div>

                <div className="space-y-2.5">
                  {fallbackChain.map((step, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="p-3 bg-[#080d1e] rounded-xl border border-slate-900 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold flex items-center justify-center">
                            {step.step}
                          </span>
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">{step.label}</span>
                            <span className="text-xs font-bold text-white">{step.modelName}</span>
                          </div>
                        </div>

                        <select className="bg-slate-900 border border-slate-800 text-[10px] text-slate-300 rounded px-1.5 py-0.5">
                          <option>Automático</option>
                          <option>Estrito</option>
                        </select>
                      </div>

                      {idx < fallbackChain.length - 1 && (
                        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-mono py-0.5">
                          <ArrowDown className="w-3 h-3" />
                          <span>Em caso de falha</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <span className="text-[10px] text-slate-500 block leading-tight">
                  ℹ As requisições fluem do topo para a base até obterem sucesso.
                </span>
              </div>

              {/* Cost Comparison */}
              <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-2xl space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Comparativo de Custos (por 1M tokens)</span>
                </div>

                <div className="h-28 flex items-end justify-between gap-3 px-2 pt-4">
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-mono font-bold">$2.50</span>
                    <div className="w-full bg-amber-500/80 rounded-t-md h-20" />
                    <span className="text-[10px] text-slate-400 mt-1">GPT-4o</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-mono font-bold">$3.00</span>
                    <div className="w-full bg-orange-600/80 rounded-t-md h-24" />
                    <span className="text-[10px] text-slate-400 mt-1">Claude</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-mono font-bold">$0.80</span>
                    <div className="w-full bg-blue-500/80 rounded-t-md h-8" />
                    <span className="text-[10px] text-slate-400 mt-1">Llama</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-mono font-bold">$0.70</span>
                    <div className="w-full bg-purple-500/80 rounded-t-md h-7" />
                    <span className="text-[10px] text-slate-400 mt-1">Mistral</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">$0.15</span>
                    <div className="w-full bg-emerald-500 rounded-t-md h-3" />
                    <span className="text-[10px] text-emerald-400 font-bold mt-1">Gemini</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-tight border-t border-slate-900 pt-2">
                  Modelos de menor custo reduzem drasticamente os gastos sem perda perceptível de qualidade.
                </p>
              </div>

              {/* Routing Health */}
              <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-2xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Saúde do Roteamento</span>
                  <span className="text-[10px] text-indigo-400 hover:underline cursor-pointer">Ver Registros</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Taxa de Sucesso
                    </span>
                    <span className="font-mono font-bold text-white">99,6%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-indigo-400" /> Latência Média (p95)
                    </span>
                    <span className="font-mono font-bold text-white">1,28s</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-rose-400" /> Taxa de Erros
                    </span>
                    <span className="font-mono font-bold text-emerald-400">0,4%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-sky-400" /> Taxa de Limitação
                    </span>
                    <span className="font-mono font-bold text-emerald-400">0,0%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900">
                  <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 40">
                    <path
                      d="M 0 25 L 30 20 L 60 28 L 90 15 L 120 22 L 150 18 L 180 20 L 200 16"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono mt-1">
                    <span>-60m</span>
                    <span>-30m</span>
                    <span>Agora</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= 2. MCP SERVERS & TOOLS HUB ================= */
        <div className="space-y-6">
          {/* Top Banner on MCP Architecture */}
          <div className="p-4 bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 rounded-2xl flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                Protocolo Padrão: Model Context Protocol (MCP)
              </span>
              <h3 className="text-sm font-bold text-white">
                Ecossistema de Ferramentas e Servidores Conectados
              </h3>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                A aplicação implementa os 6 servidores MCP oficiais necessários para o funcionamento autônomo dos agentes:
                Publicação Multicanal, Mineração de Tendências, RAG de Memória de Marca, Motor Criativo Gemini, Auditoria de Retenção e Ponte de Webhooks.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0">
              <CheckCircle2 className="w-4 h-4" />
              <span>6 Servidores MCP Ativos</span>
            </div>
          </div>

          {/* 6 MCP Servers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MCP_SERVERS_REGISTRY.map((srv) => (
              <div
                key={srv.id}
                className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-3 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <Box className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{srv.name}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">v{srv.version} • {srv.transport.toUpperCase()}</span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {srv.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed min-h-[38px]">
                  {srv.description}
                </p>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-900 font-mono">
                  <span className="text-slate-400">{srv.toolsCount} Ferramentas MCP</span>
                  <span className="text-indigo-400">Disponibilidade: {srv.uptime}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Tool Runner & JSON Schema Inspection */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Tool Selection List (5 cols) */}
            <div className="lg:col-span-5 bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                Catálogo de Ferramentas MCP ({MCP_TOOLS_REGISTRY.length})
              </h4>
              <p className="text-[11px] text-slate-400">
                Selecione uma ferramenta MCP para inspecionar os parâmetros e simular a execução em tempo real.
              </p>

              <div className="space-y-2 mt-3">
                {MCP_TOOLS_REGISTRY.map((t) => {
                  const isSelected = selectedMcpTool.name === t.name;
                  return (
                    <div
                      key={t.name}
                      onClick={() => {
                        setSelectedMcpTool(t);
                        setMcpExecutionResult(null);
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/15 border-indigo-500 text-white'
                          : 'bg-[#080d1e] border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono font-bold text-indigo-300">{t.name}()</span>
                        <span className="text-[9px] font-bold uppercase text-emerald-400">{t.category}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {t.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tool Runner & Output (7 cols) */}
            <div className="lg:col-span-7 bg-[#0b1329] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    Executor de Ferramenta: <span className="font-mono text-indigo-400">{selectedMcpTool.name}</span>
                  </h4>
                  <span className="text-[10px] text-slate-500">Servidor MCP: {selectedMcpTool.serverName}</span>
                </div>

                <button
                  onClick={handleExecuteTool}
                  disabled={isExecutingMcp}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 fill-white ${isExecutingMcp ? 'animate-spin' : ''}`} />
                  <span>{isExecutingMcp ? 'Executando MCP...' : 'Executar Teste MCP'}</span>
                </button>
              </div>

              {/* JSON Schema Parameters */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Parâmetros de Entrada (JSON Schema):
                </span>
                <div className="p-3 bg-[#080d1e] rounded-xl border border-slate-900 font-mono text-[11px] text-slate-300">
                  <pre className="overflow-x-auto whitespace-pre">
                    {JSON.stringify(selectedMcpTool.inputSchema, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Execution Result Box */}
              <div className="space-y-2 pt-2 border-t border-slate-900">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Resposta do Protocolo MCP:
                </span>
                <div className="p-3 bg-[#080d1e] rounded-xl border border-slate-900 font-mono text-[11px] min-h-[90px] flex items-center justify-center text-slate-400">
                  {mcpExecutionResult ? (
                    <pre className="w-full text-emerald-300 overflow-x-auto whitespace-pre">
                      {JSON.stringify(mcpExecutionResult, null, 2)}
                    </pre>
                  ) : (
                    <span>Clique em "Executar Teste MCP" para disparar a chamada à ferramenta.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
