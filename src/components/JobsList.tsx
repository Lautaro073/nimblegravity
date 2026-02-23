import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCandidate } from '@/hooks/useCandidate';
import { useJobs } from '@/hooks/useJobs';
import { Loader2, Briefcase } from 'lucide-react';
import { JobItem } from './JobItem';

export function JobsList() {
    const { isAuthenticated } = useCandidate();
    const { jobs, loading, error, isEmpty } = useJobs(isAuthenticated);

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

    if (isEmpty) {
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
