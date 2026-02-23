import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useCandidateData } from '@/hooks/useCandidateData';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';

export function CandidateForm() {
    const [email, setEmail] = useState('');
    const { candidate, loading, error, fetchCandidate, clearCandidate } = useCandidateData();
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetchCandidate(email);
    };

    if (candidate) {
        return (
            <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <CardTitle className="text-green-900 dark:text-green-100">{t('candidate.foundTitle')}</CardTitle>
                    </div>
                    <CardDescription className="dark:text-green-300">
                        {t('candidate.foundDescription')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">{t('candidate.name')}:</span> {candidate.firstName} {candidate.lastName}
                    </div>
                    <div>
                        <span className="font-semibold">{t('candidate.email')}:</span> {candidate.email}
                    </div>
                    <div>
                        <span className="font-semibold">{t('candidate.id')}:</span> {candidate.candidateId}
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearCandidate}
                                className="mt-4"
                            >
                                {t('candidate.change')}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {t('candidate.changeTooltip')}
                        </TooltipContent>
                    </Tooltip>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('candidate.title')}</CardTitle>
                <CardDescription>
                    {t('candidate.description')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="email"
                                placeholder={t('candidate.placeholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                className="pl-9"
                                autoFocus
                            />
                        </div>
                    </div>

                    {error && <ErrorMessage message={error} />}

                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t('candidate.loading')}
                            </>
                        ) : (
                            t('candidate.submit')
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
