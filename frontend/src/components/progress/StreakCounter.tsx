import React from 'react';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({
  currentStreak,
  longestStreak,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Learning Streak</h3>
      <div className="flex justify-between">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{currentStreak}</div>
          <div className="text-xs text-gray-600">Current Streak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{longestStreak}</div>
          <div className="text-xs text-gray-600">Longest Streak</div>
        </div>
      </div>
    </div>
  );
};
