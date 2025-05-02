import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen animated-gradient">
      <Navbar />
      <main className="pt-16 px-4">{children}</main>
      <footer className="mt-auto py-6 glass-nav">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-sm text-white/80">
              © {new Date().getFullYear()} Open Minds Platform. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-white/90 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white/90 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-white/90 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 