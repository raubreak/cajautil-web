
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface AIResponse {
  text: string;
}

export class AIProvider {
  private static instance: AIProvider;
  
  private constructor() {}

  public static getInstance(): AIProvider {
    if (!AIProvider.instance) {
      AIProvider.instance = new AIProvider();
    }
    return AIProvider.instance;
  }

  async generateText(prompt: string, options: { model?: string, provider?: 'gemini' | 'openrouter' } = {}): Promise<AIResponse> {
    const provider = options.provider || (process.env.GEMINI_API_KEY ? 'gemini' : 'openrouter');
    
    if (provider === 'gemini' && process.env.GEMINI_API_KEY) {
      return this.generateWithGemini(prompt, options.model || 'gemini-1.5-flash');
    }

    if (provider === 'openrouter' && process.env.OPENROUTER_API_KEY) {
      return this.generateWithOpenRouter(prompt, options.model || 'openrouter/free');
    }

    throw new Error("No hay API Key configurada para el proveedor seleccionado.");
  }

  private async generateWithOpenRouter(prompt: string, model: string): Promise<AIResponse> {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://cajautil.com", 
        "X-Title": "CajaUtil"
      },
      body: JSON.stringify({
        "model": model,
        "messages": [
          {"role": "user", "content": prompt}
        ],
        "response_format": { "type": "json_object" }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenRouter Error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    return { text: data.choices[0].message.content };
  }

  private async generateWithGemini(prompt: string, model: string): Promise<AIResponse> {
    if (!process.env.GEMINI_API_KEY) throw new Error("Falta GEMINI_API_KEY");
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const genModel = genAI.getGenerativeModel({ 
      model: model,
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const result = await genModel.generateContent(prompt);
    return { text: result.response.text() };
  }
}
