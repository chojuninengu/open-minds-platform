import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
