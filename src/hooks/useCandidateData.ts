import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCandidateByEmail } from '@/services/api';
import { validateEmail } from '@/lib/validators';
import { useCandidate } from '@/hooks/useCandidate';

export function useCandidateData() {
  const { candidate, setCandidate, isAuthenticated } = useCandidate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const fetchCandidate = async (email: string) => {
    setError(null);

    if (!email.trim()) {
      setError(t('errors.emailEmpty'));
      return null;
    }

    if (!validateEmail(email)) {
      setError(t('errors.emailInvalid'));
      return null;
    }

    setLoading(true);

    try {
      const candidateData = await getCandidateByEmail(email);
      setCandidate(candidateData);
      return candidateData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('errors.candidateGeneric');
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
