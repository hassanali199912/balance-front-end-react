// Main User interface - used across the application
export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  whatsAppNumber?: string;
  location?: string;
  profilePictureUrl?: string;
  isActive: boolean;
  lastLoginAt?: string;
  phones: string[];
  favorites: string[];
  roleNames: string[];
}

// Legacy interface for backward compatibility
export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: 'Guest' | 'User' | 'Employee' | 'Admin' | 'SuperAdmin';
  createdAt: string;
}
