import { User } from '../types';

// Get all users
const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// Login user
export const login = (username: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  
  if (user) {
    // Store user session (in a real app, this would be a token)
    localStorage.setItem('currentUser', JSON.stringify({
      id: user.id,
      username: user.username,
      role: user.role
    }));
    return user;
  }
  
  return null;
};

// Get current user
export const getCurrentUser = (): { id: string; username: string; role: string } | null => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

// Logout user
export const logout = (): void => {
  localStorage.removeItem('currentUser');
};

// Check if user is admin
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};