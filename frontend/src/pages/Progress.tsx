import React from 'react';
import { ProgressCard } from '../components/progress/ProgressCard';
import { StreakCounter } from '../components/progress/StreakCounter';

// Mock data - in a real app, this would come from an API
const mockCourseProgress = [
  {
    id: 1,
    title: "Introduction to Programming",
    progress: 75,
    totalLessons: 20,
    completedLessons: 15,
    lastAccessed: "2025-05-02",
  },
  {
    id: 2,
    title: "Web Development Basics",
    progress: 30,
    totalLessons: 15,
    completedLessons: 5,
    lastAccessed: "2025-05-01",
  },
];

export const Progress: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning Progress</h1>
          <p className="text-gray-600">Track your learning journey and achievements</p>
        </div>
        <button className="bg-primary-color hover:bg-secondary-color text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Course
        </button>
      </div>
      
      <div className="mb-8">
        <StreakCounter currentStreak={5} longestStreak={12} />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Active Courses</h2>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-primary-color transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-primary-color transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourseProgress.map((course) => (
          <ProgressCard
            key={course.id}
            title={course.title}
            progress={course.progress}
            totalLessons={course.totalLessons}
            completedLessons={course.completedLessons}
            lastAccessed={course.lastAccessed}
          />
        ))}
      </div>
    </div>
  );
};
