import i18n from '@/i18n';
import { API_BASE_URL, API_ENDPOINTS } from '../lib/constants';
import type { Candidate, Job, JobApplication } from '../types';

class ApiError extends Error {
  status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorMessage = `Error ${response.status}`;
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      if (response.status === 404) {
        errorMessage = i18n.t('errors.notFound');
      } else if (response.status === 500) {
        errorMessage = i18n.t('errors.serverError');
      } else if (response.status === 400) {
        errorMessage = i18n.t('errors.invalidRequest');
      }
    }
    
    throw new ApiError(response.status, errorMessage);
  }
  return response.json();
};

export const getCandidateByEmail = async (email: string): Promise<Candidate> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.GET_CANDIDATE}?email=${encodeURIComponent(email)}`;
  
  try {
    const response = await fetch(url);
    const data = await handleResponse<Candidate>(response);
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        throw new Error(i18n.t('errors.emailNotFound'));
      }
      throw error;
    }
    throw new Error(i18n.t('errors.networkCandidate'));
  }
};

export const getJobsList = async (): Promise<Job[]> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.GET_JOBS}`;
  
  try {
    const response = await fetch(url);
    const data = await handleResponse<Job[]>(response);
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(i18n.t('errors.networkJobs'));
  }
};

export const applyToJob = async (application: JobApplication): Promise<{ ok: boolean }> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.APPLY_TO_JOB}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(application),
    });
    const data = await handleResponse<{ ok: boolean }>(response);
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 400) {
        throw new Error(i18n.t('errors.invalidData'));
      }
      throw error;
    }
    throw new Error(i18n.t('errors.networkApply'));
  }
};
