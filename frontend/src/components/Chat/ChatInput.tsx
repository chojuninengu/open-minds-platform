import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-end w-full bg-white dark:bg-[#40414f] rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          rows={1}
          className="w-full resize-none bg-transparent py-3 pl-4 pr-12 text-base focus:outline-none dark:text-white"
          style={{ maxHeight: '200px' }}
        />
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`absolute right-2 bottom-2.5 p-1 rounded-lg ${
            message.trim() && !isLoading
              ? 'bg-[#19c37d] hover:bg-[#1a8870] text-white'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-400 dark:text-gray-300 cursor-not-allowed'
          }`}
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
        {isLoading ? 'AI is thinking...' : 'Press Enter to send, Shift + Enter for new line'}
      </div>
    </form>
  );
}; 