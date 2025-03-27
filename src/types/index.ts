
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'job_seeker' | 'employer' | 'admin';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  category: string;
  type: string;
  postedDate: string;
  deadline: string;
  skills: string[];
  logo: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  date: string;
  resume: string;
  coverLetter: string;
}

export type JobFilter = {
  search: string;
  category: string;
  location: string;
  type: string;
};
