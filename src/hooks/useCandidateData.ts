import { useState } from 'react';
import { getCandidateByEmail } from '@/services/api';
import { validateEmail } from '@/lib/validators';
import { useCandidate } from '@/hooks/useCandidate';

export function useCandidateData() {
  const { candidate, setCandidate, isAuthenticated } = useCandidate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = async (email: string) => {
    setError(null);

    if (!email.trim()) {
      setError('Por favor ingresa tu email');
      return null;
    }

    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido');
      return null;
    }

    setLoading(true);

    try {
      const candidateData = await getCandidateByEmail(email);
      setCandidate(candidateData);
      return candidateData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener los datos del candidato';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearCandidate = () => {
    setCandidate(null);
    setError(null);
  };

  return {
    candidate,
    loading,
    error,
    fetchCandidate,
    clearCandidate,
    isAuthenticated,
  };
}
