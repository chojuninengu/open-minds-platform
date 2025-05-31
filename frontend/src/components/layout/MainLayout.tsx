import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex h-screen bg-gray-100 dark:bg-[#1a1b26] overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} />
      <div 
        className={`
          flex flex-col flex-1 min-w-0
          transition-[margin] duration-300 ease-in-out
          ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}
        `}
      >
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}; 