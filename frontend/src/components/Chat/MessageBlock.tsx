import React from 'react';
import { CodeBlock } from '../ui/CodeBlock';

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
    <div className={`py-6 ${isAI ? 'bg-gray-50 dark:bg-[#444654]' : ''}`}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="prose dark:prose-invert max-w-none">
          {contentParts.map((part, index) => {
            if (part.type === 'code') {
              return (
                <div key={index} className="my-4">
                  <CodeBlock code={part.content} language={part.language} />
                </div>
              );
            }
            return (
              <p key={index} className="whitespace-pre-wrap">
                {part.content}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}; 