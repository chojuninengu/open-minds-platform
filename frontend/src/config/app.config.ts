export const APP_CONFIG = {
  name: 'Nova AI',
  description: 'Your AI Assistant',
  api: {
    baseUrl: 'https://ai.kivoyo.com',
    endpoints: {
      chat: '/api/chat',
      image: '/api/image',
      code: '/api/code',
    },
  },
  features: {
    fileUpload: false, // Future feature
    imageGeneration: false, // Future feature
    codeGeneration: true,
    darkMode: true,
  },
  ui: {
    messageTypes: ['text', 'code', 'image'],
    maxFileSize: 10 * 1024 * 1024, // 10MB
    supportedFileTypes: ['image/*', 'text/*', '.pdf'],
  },
  storage: {
    prefix: 'nova_',
    maxHistoryLength: 100,
  },
} as const;

export type MessageType = 'user' | 'assistant';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: number;
  status: 'sending' | 'sent' | 'error';
  metadata?: {
    codeLanguage?: string;
    imageUrl?: string;
    error?: string;
  };
} 