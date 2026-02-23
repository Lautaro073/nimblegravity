// Candidate Types
export interface Candidate {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Job Types
export interface Job {
  id: string;
  title: string;
}

// Job Application Types
export interface JobApplication {
  uuid: string;
  jobId: string;
  candidateId: string;
  repoUrl: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  ok?: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
}
