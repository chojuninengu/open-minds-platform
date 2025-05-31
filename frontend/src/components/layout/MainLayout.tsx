import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useTheme } from '../../context/ThemeContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex bg-white dark:bg-[#343541]">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-200 ease-in-out ${isSidebarOpen ? 'ml-[260px]' : 'ml-0'}`}>
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 relative overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}; 