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
    <div className="glass-card rounded-lg p-4">
      <h3 className="text-sm font-semibold text-white mb-3">Learning Streak</h3>
      <div className="flex justify-between">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{currentStreak}</div>
          <div className="text-xs text-white/70">Current Streak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white/90">{longestStreak}</div>
          <div className="text-xs text-white/70">Longest Streak</div>
        </div>
      </div>
    </div>
  );
};
