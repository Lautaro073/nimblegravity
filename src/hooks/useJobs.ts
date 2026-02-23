import { useState, useEffect } from 'react';
import { getJobsList } from '@/services/api';
import type { Job } from '@/types';

export function useJobs(shouldFetch: boolean = true) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const jobsData = await getJobsList();
      setJobs(jobsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar las posiciones';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchJobs();
    }
  }, [shouldFetch]);

  const refetch = () => {
    fetchJobs();
  };

  return {
    jobs,
    loading,
    error,
    refetch,
    isEmpty: jobs.length === 0,
  };
}
