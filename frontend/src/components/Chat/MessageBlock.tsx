import React from 'react';
import { CodeBlock } from '../ui/CodeBlock';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface MessageBlockProps {
  content: string;
  isAI?: boolean;
}

export const MessageBlock: React.FC<MessageBlockProps> = ({ content, isAI = false }) => {
  // Function to parse content and identify code blocks
  const parseContent = (text: string) => {
    const parts = [];
    let currentIndex = 0;

    // Regular expression to match code blocks with language specification
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > currentIndex) {
        parts.push({
          type: 'text',
          content: text.slice(currentIndex, match.index),
        });
      }

      // Add code block
      parts.push({
        type: 'code',
        language: match[1] || 'plaintext',
        content: match[2],
      });

      currentIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(currentIndex),
      });
    }

    return parts;
  };

  const contentParts = parseContent(content);

  return (
    <div className={`w-full ${isAI ? 'bg-gray-50 dark:bg-[#444654]' : 'bg-white dark:bg-[#343541]'}`}>
      <div className="max-w-3xl mx-auto px-4 py-6 flex gap-4 md:gap-6 lg:px-8">
        {isAI && (
          <div className="flex-shrink-0 select-none">
            <div className="w-8 h-8 rounded flex items-center justify-center bg-[#19c37d] text-white">
              AI
            </div>
          </div>
        )}
        
        <div className={`min-w-0 flex-1 space-y-3 ${!isAI ? 'flex justify-end' : ''}`}>
          <div className={`prose dark:prose-invert prose-sm sm:prose-base max-w-none ${!isAI ? 'flex flex-col items-end' : ''}`}>
            {contentParts.map((part, index) => {
              if (part.type === 'code') {
                return (
                  <div key={index} className="my-4 w-full">
                    <CodeBlock code={part.content} language={part.language} />
                  </div>
                );
              }
              return (
                <div key={index} className={`whitespace-pre-wrap text-gray-800 dark:text-gray-100 ${!isAI ? 'text-right' : ''} w-full`}>
                  {part.content}
                </div>
              );
            })}
          </div>
        </div>

        {!isAI && (
          <div className="flex-shrink-0 select-none">
            <div className="w-8 h-8 rounded bg-[#5436DA] text-white flex items-center justify-center">
              <UserCircleIcon className="w-6 h-6" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 