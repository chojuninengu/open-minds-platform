import { useState, useRef, useEffect } from 'react';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { ClipboardIcon, BookmarkIcon, LanguageIcon } from '@heroicons/react/24/outline';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  language?: 'en' | 'fr';
}

interface NovaChatProps {
  className?: string;
}

const subjects = [
  { id: 'math', name: 'Math' },
  { id: 'history', name: 'History' },
  { id: 'biology', name: 'Biology' },
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'literature', name: 'Literature' },
];

export const NovaChat = ({ className = '' }: NovaChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(subjects[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/nova/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input,
          language: 'en',
          context: selectedSubject,
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer,
        language: data.language,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting Nova response:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error. Try again.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async (message: Message) => {
    try {
      const response = await fetch('/api/nova/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: message.content,
          targetLang: message.language === 'en' ? 'fr' : 'en',
        }),
      });

      const data = await response.json();
      setMessages(prev => prev.map(msg =>
        msg === message
          ? { ...msg, content: data.translatedText, language: data.targetLang }
          : msg
      ));
    } catch (error) {
      console.error('Error translating message:', error);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSave = (message: Message) => {
    console.log('Saving message:', message);
  };

  return (
    <Card className={`w-full max-w-4xl mx-auto p-4 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Nova</h2>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-2 py-1 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="h-[400px] overflow-y-auto space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                {message.role === 'assistant' && (
                  <div className="flex gap-1 mt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTranslate(message)}
                      className="p-1"
                    >
                      <LanguageIcon className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(message.content)}
                      className="p-1"
                    >
                      <ClipboardIcon className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSave(message)}
                      className="p-1"
                    >
                      <BookmarkIcon className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg text-sm">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Nova..."
            className="flex-1 p-2 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} size="sm">
            Send
          </Button>
        </form>
      </div>
    </Card>
  );
}; 