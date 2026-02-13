import { User, AuthResponse } from '../types';

// Mock database
const USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@lumenastore.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff'
  },
  {
    id: '2',
    name: 'Demo User',
    email: 'user@lumenastore.com',
    role: 'customer',
    avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=random'
  }
];

//simulate a JWT token generation
const generateToken = (user: User): string => {
  return btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role, exp: Date.now() + 3600000 }));
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Default passwords: 'admin123' for admin, 'user123' for user.
      const user = USERS.find(u => u.email === email);
      
      if (!user) {
        reject(new Error('Invalid email or password'));
        return;
      }

      // Mock password check
      const isValid = (email === 'admin@lumenastore.com' && password === 'admin123') ||
                      (email === 'user@lumenastore.com' && password === 'user123') ||
                      (password.length >= 6); // Allow any password > 6 chars for new registrations demo

      if (isValid) {
        resolve({
          user,
          token: generateToken(user)
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800);
  });
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (USERS.find(u => u.email === email)) {
        reject(new Error('Email already in use'));
        return;
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: 'customer',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
      };

      USERS.push(newUser);

      resolve({
        user: newUser,
        token: generateToken(newUser)
      });
    }, 800);
  });
};

export const logout = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 300);
  });
};

export const getUserFromToken = async (token: string): Promise<User | null> => {
    // In a real data, I have to verify signature on server.
    // Here, simulate validating the token from localStorage on reload.
    return new Promise((resolve) => {
        try {
            // simple decode for demo
            const decoded = JSON.parse(atob(token));
            const user = USERS.find(u => u.id === decoded.id);
            resolve(user || null);
        } catch (e) {
            resolve(null);
        }
    });
};