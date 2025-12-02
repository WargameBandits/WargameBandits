// User types
export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  role: 'user' | 'creator' | 'admin';
  points: number;
  solvedChallenges: number[];
  githubUsername: string;
  createdAt: string;
}

// Challenge types
export interface Challenge {
  id: number;
  title: string;
  description: string;
  category: 'web' | 'pwn' | 'reverse' | 'crypto' | 'forensics' | 'misc';
  difficulty?: 'easy' | 'medium' | 'hard';
  subjectTag?: string;
  points: number;
  author: string;
  authorGithub: string;
  fileUrl?: string;
  solvers: string[];
  firstBlood?: string;
  hints?: string[];
  createdAt: string;
  isActive: boolean;
}

// Submission types
export interface Submission {
  id: string;
  userId: string;
  challengeId: number;
  submittedFlag: string;
  isCorrect: boolean;
  submittedAt: string;
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  username: string;
  githubUsername: string;
  points: number;
  solvedCount: number;
  lastSolve?: string;
}

// Auth types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
