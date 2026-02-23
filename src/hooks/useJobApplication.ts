import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { applyToJob } from '@/services/api';
import { validateGithubUrl } from '@/lib/validators';
import type { JobApplication } from '@/types';

export function useJobApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const apply = async (application: JobApplication) => {
    setError(null);
    setSuccess(false);

    if (!application.repoUrl.trim()) {
      setError(t('errors.repoEmpty'));
      return false;
    }

    if (!validateGithubUrl(application.repoUrl)) {
      setError(t('errors.repoInvalid'));
      return false;
    }

    setLoading(true);

    try {
      await applyToJob(application);
      setSuccess(true);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('errors.applyGeneric');
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
