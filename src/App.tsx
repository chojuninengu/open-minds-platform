import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';

// Placeholder pages (to be implemented)
const Home = () => (
  <div>
    <Hero />
    {/* Add more sections here */}
  </div>
);

const Mentorship = () => <div>Mentorship Page</div>;
const Courses = () => <div>Courses Page</div>;
const Community = () => <div>Community Page</div>;
const Login = () => <div>Login Page</div>;
const About = () => <div>About Page</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/community" element={<Community />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 