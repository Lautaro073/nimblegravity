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
      // Si no se puede parsear el JSON, usar mensaje por defecto
      if (response.status === 404) {
        errorMessage = 'Recurso no encontrado';
      } else if (response.status === 500) {
        errorMessage = 'Error del servidor. Intenta de nuevo más tarde';
      } else if (response.status === 400) {
        errorMessage = 'Solicitud inválida. Verifica los datos ingresados';
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
    console.log('✅ Candidato obtenido:', data.email);
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error('❌ Error al obtener candidato:', error.message);
      if (error.status === 404) {
        throw new Error('Email no encontrado. Verifica que sea correcto.');
      }
      throw error;
    }
    console.error('❌ Error de red:', error);
    throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
  }
};

export const getJobsList = async (): Promise<Job[]> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.GET_JOBS}`;
  
  try {
    const response = await fetch(url);
    const data = await handleResponse<Job[]>(response);
    console.log(`✅ ${data.length} posiciones obtenidas`);
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error('❌ Error al obtener posiciones:', error.message);
      throw error;
    }
    console.error('❌ Error de red:', error);
    throw new Error('No se pudo obtener la lista de posiciones.');
  }
};

export const applyToJob = async (application: JobApplication): Promise<{ ok: boolean }> => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.APPLY_TO_JOB}`;
  
  try {
    console.log('📤 Enviando aplicación:', { jobId: application.jobId, repoUrl: application.repoUrl });
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(application),
    });
    const data = await handleResponse<{ ok: boolean }>(response);
    console.log('✅ Aplicación enviada exitosamente');
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error('❌ Error al enviar aplicación:', error.message);
      if (error.status === 400) {
        throw new Error('Datos inválidos. Verifica la URL del repositorio.');
      }
      throw error;
    }
    console.error('❌ Error de red:', error);
    throw new Error('No se pudo enviar la postulación.');
  }
};
