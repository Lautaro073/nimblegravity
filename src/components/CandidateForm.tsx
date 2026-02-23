import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCandidateData } from '@/hooks/useCandidateData';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';

export function CandidateForm() {
    const [email, setEmail] = useState('');
    const { candidate, loading, error, fetchCandidate, clearCandidate } = useCandidateData();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetchCandidate(email);
    };

    // Si ya hay un candidato autenticado, mostrar sus datos
    if (candidate) {
        return (
            <Card className="border-green-200 bg-green-50/50">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-green-900">Datos de Candidato</CardTitle>
                    </div>
                    <CardDescription>
                        Datos del candidato:
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">Nombre:</span> {candidate.firstName} {candidate.lastName}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {candidate.email}
                    </div>
                    <div>
                        <span className="font-semibold">ID:</span> {candidate.candidateId}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={clearCandidate}
                        className="mt-4"
                    >
                        Cambiar candidato
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ingresa tu Email</CardTitle>
                <CardDescription>
                    Ingresa el email para obtener tus datos de candidato
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="email"
                                placeholder="tu.email@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                className="pl-9"
                                autoFocus
                            />
                        </div>
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verificando...
                            </>
                        ) : (
                            'Obtener mis datos'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
