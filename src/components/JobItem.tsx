import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { validateGithubUrl } from '@/lib/validators';
import { useCandidate } from '@/hooks/useCandidate';
import { useJobApplication } from '@/hooks/useJobApplication';
import type { Job } from '@/types';
import { Loader2, Github, CheckCircle2, ExternalLink } from 'lucide-react';

interface JobItemProps {
    job: Job;
}

export function JobItem({ job }: JobItemProps) {
    const [repoUrl, setRepoUrl] = useState('');
    const { candidate } = useCandidate();
    const { loading, error, success, apply } = useJobApplication();
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!candidate) return;

        const applied = await apply({
            uuid: candidate.uuid,
            jobId: job.id,
            candidateId: candidate.candidateId,
            applicationId: candidate.applicationId,
            repoUrl: repoUrl.trim(),
        });

        if (applied) {
            setRepoUrl('');
        }
    };

    if (success) {
        return (
            <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                            <CardTitle className="text-green-900 dark:text-green-100">{job.title}</CardTitle>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {t('jobs.successBadge')}
                        </Badge>
                    </div>
                    <CardDescription className="text-green-700 dark:text-green-300">
                        {t('jobs.successMessage')}
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>{job.title}</CardTitle>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Badge className="cursor-default">ID: {job.id}</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                            {t('jobs.jobId')}
                        </TooltipContent>
                    </Tooltip>
                </div>
                <CardDescription>
                    {t('jobs.repoDescription')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor={`repo-${job.id}`} className="text-sm font-medium">
                            {t('jobs.repoLabel')}
                        </label>
                        <div className="relative">
                            <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id={`repo-${job.id}`}
                                type="url"
                                placeholder={t('jobs.repoPlaceholder')}
                                value={repoUrl}
                                onChange={(e) => setRepoUrl(e.target.value)}
                                disabled={loading}
                                className="pl-9"
                            />
                        </div>
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex gap-2">
                        <Button type="submit" disabled={loading} className="flex-1">
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t('jobs.submitting')}
                                </>
                            ) : (
                                t('jobs.submit')
                            )}
                        </Button>
                        {repoUrl && validateGithubUrl(repoUrl) && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => window.open(repoUrl, '_blank')}
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {t('jobs.viewRepo')}
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
