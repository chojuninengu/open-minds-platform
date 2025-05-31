import React, { useState } from 'react';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'plaintext' }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group rounded-md bg-[#1e1e1e] dark:bg-[#1a1b26]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700/50">
        <span className="text-xs text-gray-300">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors"
        >
          {isCopied ? (
            <>
              <CheckIcon className="h-4 w-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <DocumentDuplicateIcon className="h-4 w-4" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-gray-100 font-mono">{code}</code>
      </pre>
    </div>
  );
}; 