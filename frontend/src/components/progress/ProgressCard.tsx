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
    <div className="glass-card rounded-lg p-4">

      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <div className="w-full bg-white/10 rounded-full h-1.5 mb-3">
        <div
          className="bg-blue-600 h-1.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-white/70">
        <span>{completedLessons}/{totalLessons} lessons</span>
        <span>Last accessed: {lastAccessed}</span>
      </div>
    </div>
  );
};
