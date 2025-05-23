import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export const ChatMessage: FC<ChatMessageProps> = ({ text, sender, timestamp }) => {
  const isAI = sender === 'ai';
  const formattedTime = new Date(timestamp).toLocaleTimeString();

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
        <div className={`text-xs mt-2 ${isAI ? 'text-gray-600' : 'text-gray-600'}`}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
}; 