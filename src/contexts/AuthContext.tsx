import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // In a real app, validate token with backend
          // For now, just simulate a logged-in user
          setUser({
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            role: 'student',
          });
        }
      } catch (err) {
        setError('Authentication failed');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, call your API here
      // For now, just simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      setUser({
        id: '1',
        name: 'Demo User',
        email,
        role: 'student',
      });
      
      // Store token
      localStorage.setItem('token', 'demo-token');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // In a real app, call your API here
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear user and token
      setUser(null);
      localStorage.removeItem('token');
    } catch (err) {
      setError('Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, call your API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful registration
      setUser({
        id: '1',
        name,
        email,
        role: 'student',
      });
      
      // Store token
      localStorage.setItem('token', 'demo-token');
    } catch (err) {
      setError('Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 