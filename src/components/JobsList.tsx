import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getJobsList } from '@/services/api';
import { useCandidate } from '@/context/CandidateContext';
import type { Job } from '@/types';
import { Loader2, Briefcase } from 'lucide-react';
import { JobItem } from './JobItem';

export function JobsList() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useCandidate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const jobsData = await getJobsList();
                setJobs(jobsData);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Error al cargar las posiciones');
                }
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchJobs();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return null;
    }

    if (loading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    if (jobs.length === 0) {
        return (
            <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No hay posiciones disponibles en este momento</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Posiciones Disponibles</h2>
                <p className="text-muted-foreground">
                    {jobs.length} {jobs.length === 1 ? 'posición disponible' : 'posiciones disponibles'}
                </p>
            </div>

            <div className="grid gap-4">
                {jobs.map((job) => (
                    <JobItem key={job.id} job={job} />
                ))}
            </div>
        </div>
    );
}
