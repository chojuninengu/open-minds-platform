import { FC, useState, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { APP_CONFIG } from '../../config/app.config';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
  status: 'sending' | 'sent' | 'error';
  error?: string;
}

export const ChatContainer: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load messages from localStorage on component mount
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    // Save messages to localStorage whenever they change
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    // Scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: Date.now(),
      status: 'sending'
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send request to backend
      const response = await fetch(`${APP_CONFIG.api.baseUrl}${APP_CONFIG.api.endpoints.chat}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          model: "coding-teacher"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update user message status
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
      ));
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'ai',
        timestamp: Date.now(),
        status: 'sent'
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Update user message status to error
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'error' } : msg
      ));
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: Date.now(),
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            text={message.text}
            sender={message.sender}
            timestamp={message.timestamp}
            status={message.status}
            error={message.error}
          />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}; 