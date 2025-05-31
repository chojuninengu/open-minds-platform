import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './components/layout/MainLayout';
import ChatContainer from './components/Chat/ChatContainer';

const App: React.FC = () => {
  // Get the base URL from Vite's environment
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <ThemeProvider>
      <Router basename={baseUrl}>
        <MainLayout>
          <Routes>
            <Route path="/chat" element={<ChatContainer />} />
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="*" element={<Navigate to="/chat" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
