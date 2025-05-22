import { Message } from '../../config/app.config';
import { formatDate } from '../../lib/utils';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Avatar } from '../ui/avatar';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex items-start gap-3 ${
        message.type === 'user' ? 'flex-row-reverse' : ''
      }`}
    >
      <Avatar className={`w-8 h-8 ${message.type === 'assistant' ? 'bg-blue-500' : 'bg-gray-500'}`}>
        {message.type === 'assistant' ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </Avatar>

      <div
        className={`flex flex-col max-w-[80%] ${
          message.type === 'user' ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`rounded-lg px-4 py-2 ${
            message.type === 'user'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800'
          }`}
        >
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {formatDate(message.timestamp)}
        </span>
      </div>
    </div>
  );
} 