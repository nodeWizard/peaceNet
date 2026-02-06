import { GoogleGenerativeAI } from '@google/generative-ai';

type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
};

const SYSTEM_INSTRUCTION =
  "You are PeaceNet AI, an empathetic and supportive companion. Respond with warmth, validate feelings, and offer practical, safety-minded guidance. Keep responses concise and avoid judgment, but if the user taped a message in tunisian language, respond in tunisian language.";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = 'models/gemini-2.5-flash';
const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

type GeminiModelInfo = {
  name: string;
  displayName?: string;
  description?: string;
  supportedGenerationMethods?: string[];
  inputTokenLimit?: number;
  outputTokenLimit?: number;
};

type ListModelsResponse = {
  models?: GeminiModelInfo[];
  nextPageToken?: string;
};

function getModel() {
  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: SYSTEM_INSTRUCTION,
  });
}

export async function getGeminiReply(messages: ChatMessage[]) {
  const model = getModel();
  const contents = messages.map((message) => ({
    role: message.role === 'user' ? 'user' : 'model',
    parts: [{ text: message.content }],
  }));

  const result = await model.generateContent({ contents });
  return result.response.text().trim();
}

export async function listGeminiModels() {
  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY');
  }

  const models: GeminiModelInfo[] = [];
  let nextPageToken: string | undefined;

  do {
    const params = new URLSearchParams({ key: apiKey });
    if (nextPageToken) {
      params.set('pageToken', nextPageToken);
    }

    const response = await fetch(
      `${GEMINI_API_BASE_URL}/models?${params.toString()}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to list Gemini models: ${response.status} ${errorText}`
      );
    }

    const data = (await response.json()) as ListModelsResponse;
    console.log("🚀 ~ listGeminiModels ~ data:", data)
    if (data.models?.length) {
      models.push(...data.models);
    }
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return models;
}
