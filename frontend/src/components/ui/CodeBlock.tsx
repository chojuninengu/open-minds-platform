import React, { useState, useEffect } from 'react';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
// Import additional languages
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markdown';

interface CodeBlockProps {
  code: string;
  language?: string;
  align?: 'left' | 'right';
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'plaintext',
  align = 'left'
}) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Map common language names to Prism's language identifiers
  const languageMap: { [key: string]: string } = {
    'py': 'python',
    'js': 'javascript',
    'jsx': 'jsx',
    'ts': 'typescript',
    'tsx': 'tsx',
    'shell': 'bash',
    'bash': 'bash',
    'json': 'json',
    'css': 'css',
    'md': 'markdown',
  };

  const getLanguageIdentifier = (lang: string): string => {
    const normalized = lang.toLowerCase();
    return languageMap[normalized] || normalized;
  };

  const displayLanguage = language === 'plaintext' ? '' : language;
  const prismLanguage = getLanguageIdentifier(language);

  return (
    <div className={`relative group rounded-md bg-[#1e1e1e] dark:bg-[#1a1b26] ${align === 'right' ? 'text-left' : ''}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700/50">
        <span className="text-xs text-gray-300">{displayLanguage}</span>
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
        <code className={`text-sm font-mono language-${prismLanguage}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}; 