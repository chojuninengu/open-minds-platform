import { Link } from 'react-router-dom';
import { BookOpenIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ChatInterface } from '../components/ChatInterface';

const features = [
  {
    name: 'Free Courses',
    description: 'Access a wide range of high-quality courses completely free of charge.',
    icon: BookOpenIcon,
  },
  {
    name: 'Community Learning',
    description: 'Learn together with a supportive community of like-minded individuals.',
    icon: UserGroupIcon,
  },
  {
    name: 'AI-Powered Learning',
    description: 'Get personalized learning recommendations powered by advanced AI.',
    icon: SparklesIcon,
  },
];

export const Home = () => {
  return (
    <div className="space-y-16">
      <Hero />
      <Features />
      <div className="container mx-auto px-4">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Home; 