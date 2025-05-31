import React from 'react';
import { ChatBubbleLeftIcon, BookOpenIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    name: 'Chat',
    path: '/chat',
    icon: ChatBubbleLeftIcon,
  },
  {
    name: 'Courses',
    path: '/courses',
    icon: BookOpenIcon,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: UserIcon,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-[260px] bg-[#202123] transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out z-30 flex flex-col`}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <Link
            to="/chat"
            className="flex items-center gap-3 rounded-md px-3 py-3 text-white hover:bg-gray-700 transition-colors duration-200"
          >
            <span className="flex-shrink-0">
              <ChatBubbleLeftIcon className="h-5 w-5" />
            </span>
            <span className="text-sm">New Chat</span>
          </Link>
        </div>
        
        <nav className="px-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200 ${
                      isActive ? 'bg-gray-700' : ''
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}; 