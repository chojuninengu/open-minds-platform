import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '../ui/ThemeToggle';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#343541]">
      <div className="h-full px-4 flex items-center justify-between">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Bars3Icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}; 