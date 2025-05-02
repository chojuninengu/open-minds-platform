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
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">

      <h3 className="text-base font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
        <div
          className="bg-blue-600 h-1.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>{completedLessons}/{totalLessons} lessons</span>
        <span>Last accessed: {lastAccessed}</span>
      </div>
    </div>
  );
};
