import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
  status: 'sending' | 'sent' | 'error';
  error?: string;
}

export const ChatMessage: FC<ChatMessageProps> = ({ text, sender, timestamp, status, error }) => {
  const isAI = sender === 'ai';
  const formattedTime = new Date(timestamp).toLocaleTimeString();

  const getStatusColor = () => {
    switch (status) {
      case 'sending':
        return 'text-yellow-500';
      case 'sent':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          isAI
            ? 'bg-blue-100 dark:bg-blue-900 text-gray-900 dark:text-gray-100'
            : 'bg-green-100 dark:bg-green-900 text-gray-900 dark:text-gray-100'
        }`}
      >
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs">
          <span className={getStatusColor()}>
            {status === 'sending' ? '⏳' : status === 'sent' ? '✓' : '⚠️'}
          </span>
          <span className="text-gray-600 dark:text-gray-400">{formattedTime}</span>
          {error && (
            <span className="text-red-500 dark:text-red-400">{error}</span>
          )}
        </div>
      </div>
    </div>
  );
}; 