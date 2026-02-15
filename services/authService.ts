import { User, AuthResponse, UserStatus } from '../types';

const USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@lumenastore.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff',
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Demo User',
    email: 'user@lumenastore.com',
    role: 'customer',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=random',
    joinedDate: '2023-03-20'
  },
  {
    id: '3',
    name: 'Suspended User',
    email: 'bad@lumenastore.com',
    role: 'customer',
    status: 'suspended',
    avatar: 'https://ui-avatars.com/api/?name=Suspended+User&background=gray',
    joinedDate: '2023-05-10'
  }
];

// Simulate a JWT token generation
const generateToken = (user: User): string => {
  return btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role, exp: Date.now() + 3600000 }));
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a full app , hashing. Here we just check simple credentials for demo.
      const user = USERS.find(u => u.email === email);
      
      if (!user) {
        reject(new Error('Invalid email or password'));
        return;
      }

      if (user.status === 'suspended') {
        reject(new Error('Your account has been suspended. Please contact support.'));
        return;
      }

      // Mock password check
      const isValid = (email === 'admin@lumenastore.com' && password === 'admin123') ||
                      (email === 'user@lumenastore.com' && password === 'user123') ||
                      (email === 'bad@lumenastore.com' && password === 'bad123') ||
                      (password.length >= 6); 

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
        status: 'active',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        joinedDate: new Date().toISOString().split('T')[0]
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
    return new Promise((resolve) => {
        try {
            const decoded = JSON.parse(atob(token));
            const user = USERS.find(u => u.id === decoded.id);
            resolve(user || null);
        } catch (e) {
            resolve(null);
        }
    });
};

// Admin Service Functions (Mocking Database Calls)

export const getAllUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...USERS]);
    }, 500);
  });
};

export const updateUserStatus = async (userId: string, status: UserStatus): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = USERS.find(u => u.id === userId);
      if (!user) {
        reject(new Error('User not found'));
        return;
      }
      user.status = status;
      resolve({ ...user });
    }, 500);
  });
};