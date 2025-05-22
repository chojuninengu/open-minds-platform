import { useState, useRef, useEffect } from 'react';
import { Message } from '../../config/app.config';
import { generateMessageId } from '../../lib/utils';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { ScrollArea } from '../ui/scroll-area';

const generateResponse = (message: string): string => {
  const greetings = ['hello', 'hi', 'hey', 'greetings'];
  const howAreYou = ['how are you', 'how are you doing', 'how do you do'];
  const messageLower = message.toLowerCase();

  if (greetings.some(g => messageLower.includes(g))) {
    return "Hello! I'm Nova, your AI assistant. How can I help you today? 😊";
  }

  if (howAreYou.some(h => messageLower.includes(h))) {
    return "I'm functioning well, thank you for asking! I'm here to help you with any questions or tasks you might have. What would you like to work on?";
  }

  if (messageLower.includes('code') || messageLower.includes('programming')) {
    return `I'd be happy to help with coding! Here's a simple example of what I can do:

\`\`\`python
def greet(name: str) -> str:
    """
    Returns a personalized greeting message.
    """
    return f"Hello, {name}! Welcome to coding with Nova."

# Example usage
message = greet("User")
print(message)
\`\`\`

What specific programming topic would you like to explore?`;
  }

  return `I understand you're saying "${message}". I'm here to help with:

- Programming and coding questions
- Learning and tutoring
- General knowledge queries
- Problem-solving

What specific area would you like to focus on?`;
};

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: generateMessageId(),
      type: 'user',
      content: content.trim(),
      timestamp: Date.now(),
      status: 'sent',
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Simulate API call with more natural responses
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        id: generateMessageId(),
        type: 'assistant',
        content: generateResponse(content),
        timestamp: Date.now(),
        status: 'sent',
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: generateMessageId(),
        type: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: Date.now(),
        status: 'error',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              <p className="text-lg font-medium">Welcome to Nova AI Assistant! 👋</p>
              <p className="mt-2">Ask me anything about programming, learning, or general topics.</p>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 animate-pulse">
                <div className="h-4 w-4 bg-gray-400 dark:bg-gray-600 rounded-full" />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto p-4">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
} 