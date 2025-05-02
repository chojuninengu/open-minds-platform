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
    <div className="plp-card p-6">
      <div className="flex items-start mb-4">
        <div className="bg-primary-gradient rounded-lg p-3 mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <span className="mr-4">{completedLessons}/{totalLessons} lessons</span>
            <span>Last accessed: {lastAccessed}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-primary-color h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
