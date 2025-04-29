import { Hero } from '../components/layout/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { AcademicCapIcon, UserGroupIcon, GlobeAltIcon, SparklesIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Free Education',
    description: 'Access high-quality educational content completely free of charge.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Community Learning',
    description: 'Join a global community of learners and mentors.',
    icon: UserGroupIcon,
  },
  {
    name: 'Multilingual Support',
    description: 'Learn in your preferred language with our multilingual platform.',
    icon: GlobeAltIcon,
  },
  {
    name: 'AI-Powered Learning',
    description: 'Get personalized learning paths with our AI assistant Nova.',
    icon: SparklesIcon,
  },
];

const testimonials = [
  {
    content: "Open Minds has transformed my learning journey. The personalized approach and community support are incredible.",
    author: "Sarah Johnson",
    role: "Student, Cameroon",
  },
  {
    content: "As a mentor, I love how easy it is to connect with students and share knowledge. The platform is intuitive and effective.",
    author: "David Chen",
    role: "Mentor, Global",
  },
  {
    content: "The offline access feature has been a game-changer for my studies in areas with limited internet connectivity.",
    author: "Amina Hassan",
    role: "Student, Nigeria",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Choose Open Minds?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our platform offers unique features designed to make learning accessible to everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.name} className="flex flex-col items-center text-center p-6">
                <div className="rounded-md bg-primary-100 p-3 dark:bg-primary-900">
                  <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-300" aria-hidden="true" />
                </div>
                <CardHeader className="p-0 pt-4">
                  <CardTitle className="text-xl">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              What Our Community Says
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Hear from learners and mentors around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{testimonial.content}"</p>
                  <div className="mt-4">
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg">Join Our Community</Button>
          </div>
        </div>
      </section>
    </div>
  );
} 