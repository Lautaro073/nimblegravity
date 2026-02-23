import { useState } from 'react';
import { applyToJob } from '@/services/api';
import { validateGithubUrl } from '@/lib/validators';
import type { JobApplication } from '@/types';

export function useJobApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const apply = async (application: JobApplication) => {
    setError(null);
    setSuccess(false);

    // Validar URL de GitHub
    if (!application.repoUrl.trim()) {
      setError('Por favor ingresa la URL de tu repositorio');
      return false;
    }

    if (!validateGithubUrl(application.repoUrl)) {
      setError('Por favor ingresa una URL válida de GitHub (ej: https://github.com/usuario/repo)');
      return false;
    }

    setLoading(true);

    try {
      await applyToJob(application);
      setSuccess(true);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al enviar la postulación';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return {
    loading,
    error,
    success,
    apply,
    reset,
  };
}
