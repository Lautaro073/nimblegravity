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
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || errorData.error || `Error: ${response.status}`;
    throw new ApiError(response.status, errorMessage);
  }
  return response.json();
};

export const getCandidateByEmail = async (email: string): Promise<Candidate> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.GET_CANDIDATE}?email=${encodeURIComponent(email)}`;
  
  try {
    const response = await fetch(url);
    return await handleResponse<Candidate>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
  }
};

export const getJobsList = async (): Promise<Job[]> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.GET_JOBS}`;
  
  try {
    const response = await fetch(url);
    return await handleResponse<Job[]>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('No se pudo obtener la lista de posiciones.');
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
    return await handleResponse<{ ok: boolean }>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('No se pudo enviar la postulación.');
  }
};
