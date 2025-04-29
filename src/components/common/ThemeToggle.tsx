import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from './Button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={theme === 'light' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => setTheme('light')}
        className="h-9 w-9"
      >
        <SunIcon className="h-5 w-5" />
        <span className="sr-only">Light mode</span>
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => setTheme('dark')}
        className="h-9 w-9"
      >
        <MoonIcon className="h-5 w-5" />
        <span className="sr-only">Dark mode</span>
      </Button>
      <Button
        variant={theme === 'system' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => setTheme('system')}
        className="h-9 w-9"
      >
        <ComputerDesktopIcon className="h-5 w-5" />
        <span className="sr-only">System theme</span>
      </Button>
    </div>
  );
} 