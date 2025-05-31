import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './components/layout/MainLayout';
import ChatContainer from './components/Chat/ChatContainer';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router basename="/open-minds-platform">
        <MainLayout>
          <Routes>
            <Route path="/chat" element={<ChatContainer />} />
            <Route path="/" element={<Navigate to="/chat" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
