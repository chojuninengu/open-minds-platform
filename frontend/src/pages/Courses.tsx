import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  BookOpenIcon, 
  CodeBracketIcon, 
  LanguageIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const courses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the fundamentals of programming with Python. Perfect for beginners!',
    category: 'Programming',
    level: 'Beginner',
    duration: '8 weeks',
    icon: CodeBracketIcon,
  },
  {
    id: 2,
    title: 'English for Beginners',
    description: 'Master basic English communication skills with our comprehensive course.',
    category: 'Language',
    level: 'Beginner',
    duration: '12 weeks',
    icon: LanguageIcon,
  },
  {
    id: 3,
    title: 'Mathematics Fundamentals',
    description: 'Build a strong foundation in mathematics with our structured course.',
    category: 'Mathematics',
    level: 'Intermediate',
    duration: '10 weeks',
    icon: AcademicCapIcon,
  },
  {
    id: 4,
    title: 'Literature Appreciation',
    description: 'Explore classic and contemporary literature from around the world.',
    category: 'Humanities',
    level: 'All Levels',
    duration: '8 weeks',
    icon: BookOpenIcon,
  },
];

const categories = ['All', 'Programming', 'Language', 'Mathematics', 'Humanities'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory;
    const levelMatch = selectedLevel === 'All' || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Our Courses
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Explore our wide range of free courses designed to help you learn and grow. From programming
              to literature, we have something for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <course.icon className="h-6 w-6 text-primary-600" />
                  <CardTitle>{course.title}</CardTitle>
                </div>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:text-primary-200">
                    {course.category}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200">
                    {course.level}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200">
                    {course.duration}
                  </span>
                </div>
                <Button asChild className="w-full">
                  <Link to={`/courses/${course.id}`}>Start Learning</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 