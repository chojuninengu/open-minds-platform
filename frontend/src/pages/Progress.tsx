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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Learning Progress</h1>
      
      <div className="mb-6">
        <StreakCounter currentStreak={5} longestStreak={12} />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-3">Active Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
