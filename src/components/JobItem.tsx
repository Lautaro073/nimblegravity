import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { applyToJob } from '@/services/api';
import { validateGithubUrl } from '@/lib/validators';
import { useCandidate } from '@/context/CandidateContext';
import type { Job } from '@/types';
import { Loader2, Github, CheckCircle2, ExternalLink } from 'lucide-react';

interface JobItemProps {
    job: Job;
}

export function JobItem({ job }: JobItemProps) {
    const [repoUrl, setRepoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { candidate } = useCandidate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validaciones
        if (!repoUrl.trim()) {
            setError('Por favor ingresa la URL de tu repositorio');
            return;
        }

        if (!validateGithubUrl(repoUrl)) {
            setError('Por favor ingresa una URL válida de GitHub (ej: https://github.com/usuario/repo)');
            return;
        }

        if (!candidate) {
            setError('No hay datos de candidato disponibles');
            return;
        }

        setLoading(true);

        try {
            await applyToJob({
                uuid: candidate.uuid,
                jobId: job.id,
                candidateId: candidate.candidateId,
                repoUrl: repoUrl.trim(),
            });
            setSuccess(true);
            setRepoUrl('');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error al enviar la postulación');
            }
        } finally {
            setLoading(false);
        }
    };

    // Si ya se aplicó exitosamente
    if (success) {
        return (
            <Card className="border-green-200 bg-green-50/50">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <CardTitle className="text-green-900">{job.title}</CardTitle>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Aplicación enviada
                        </Badge>
                    </div>
                    <CardDescription className="text-green-700">
                        ¡Aplicación enviada con éxito!
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
                    <Badge>ID: {job.id}</Badge>
                </div>
                <CardDescription>
                    Ingresa la URL de tu repositorio de GitHub
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor={`repo-${job.id}`} className="text-sm font-medium">
                            URL del Repositorio de GitHub
                        </label>
                        <div className="relative">
                            <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id={`repo-${job.id}`}
                                type="url"
                                placeholder="https://github.com/tu-usuario/tu-repo"
                                value={repoUrl}
                                onChange={(e) => setRepoUrl(e.target.value)}
                                disabled={loading}
                                className="pl-9"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Ingresa la URL completa de tu repositorio de GitHub con el código de este proyecto
                        </p>
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
                                    Enviando...
                                </>
                            ) : (
                                'Submit Application'
                            )}
                        </Button>
                        {repoUrl && validateGithubUrl(repoUrl) && (
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => window.open(repoUrl, '_blank')}
                                title="Ver repositorio"
                            >
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
