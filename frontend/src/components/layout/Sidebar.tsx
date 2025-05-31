import React from 'react';
import { Link } from 'react-router-dom';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside 
      className={`
        fixed top-0 left-0 z-40 h-screen w-64 
        transform transition-transform duration-300 ease-in-out
        bg-white dark:bg-[#202123] border-r border-gray-200 dark:border-gray-700
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="h-14 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Open Minds Platform
        </h1>
      </div>
      <nav className="p-4">
        <Link
          to="/chat"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          <span>Chat</span>
        </Link>
      </nav>
    </aside>
  );
}; 