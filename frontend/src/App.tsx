import React from 'react';
import ChatContainer from './components/Chat/ChatContainer';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-800">
        <header className="border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Open Minds Platform</h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Powered by Claude AI
            </div>
          </div>
        </header>
        <main className="max-w-5xl mx-auto h-[calc(100vh-73px)]">
          <ChatContainer />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
