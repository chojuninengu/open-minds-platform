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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Streak</h3>
      <div className="flex justify-between">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{currentStreak}</div>
          <div className="text-sm text-gray-600">Current Streak</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{longestStreak}</div>
          <div className="text-sm text-gray-600">Longest Streak</div>
        </div>
      </div>
    </div>
  );
};
