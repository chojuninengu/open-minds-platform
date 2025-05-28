export const APP_CONFIG = {
  name: 'Nova AI',
  description: 'Your AI Assistant',
  api: {
    baseUrl: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:8000'
      : 'https://open-minds-platform-api.onrender.com',
    endpoints: {
      chat: '/api/nova/ask',
      translate: '/api/nova/translate',
      summary: '/api/nova/summary',
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

export type MessageType = 'text' | 'code' | 'image';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: number;
  sender: 'user' | 'ai';
  status: 'sending' | 'sent' | 'error';
  metadata?: {
    codeLanguage?: string;
    imageUrl?: string;
    error?: string;
  };
} 