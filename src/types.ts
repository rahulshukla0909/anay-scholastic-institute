export interface AcademicDocument {
  id: string;
  title: string;
  category: 'test' | 'notes' | 'syllabus' | 'other';
  type: 'pdf' | 'link';
  url: string;
  uploadedAt: any;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: any; // Firestore Timestamp
  status: 'present' | 'absent' | 'late' | 'excused';
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  progress: number; // 0-100
  lastAccessed: any;
  totalLessons: number;
  completedLessons: number;
}

export interface PerformanceStats {
  quizMarks: number;
  accuracy: number;
  rank: number;
  weakSubjects: string[];
  monthlyScores: { month: string; score: number }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'alert' | 'success';
  createdAt: any;
  isRead: boolean;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  studentId: string;
  className: string;
  motherName: string;
  mobileNumber: string;
  whatsappNumber: string;
  photoURL?: string;
  createdAt: any;
  role: 'student' | 'admin';
  stats?: {
    totalPurchasedCourses: number;
    attendancePercentage: number;
    performanceScore: number;
    pendingAssignments: number;
  };
}

export interface SubjectProgress {
  uid: string;
  subjectId: string;
  completedChapters: string[]; // array of chapter IDs
  updatedAt: any;
}

export type AuthMode = 'signin' | 'signup' | 'none';
