import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { useCandidate } from '@/hooks/useCandidate';
import { useJobs } from '@/hooks/useJobs';
import { Briefcase } from 'lucide-react';
import { JobItem } from './JobItem';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';

export function JobsList() {
    const { isAuthenticated } = useCandidate();
    const { jobs, loading, error, isEmpty } = useJobs(isAuthenticated);
    const { t } = useTranslation();

    if (!isAuthenticated) {
        return null;
    }

    if (loading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-12">
                    <LoadingSpinner />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (isEmpty) {
        return (
            <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>{t('jobs.empty')}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold">{t('jobs.title')}</h2>
                <p className="text-muted-foreground">
                    {t('jobs.count', { count: jobs.length })}
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
