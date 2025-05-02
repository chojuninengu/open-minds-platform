import React from 'react';

interface ProgressCardProps {
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  progress,
  totalLessons,
  completedLessons,
  lastAccessed,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{completedLessons}/{totalLessons} lessons</span>
        <span>Last accessed: {lastAccessed}</span>
      </div>
    </div>
  );
};
