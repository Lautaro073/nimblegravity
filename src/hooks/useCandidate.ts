import { useContext } from 'react';
import { CandidateContext } from '@/context/candidateContextDef';

export function useCandidate() {
    const context = useContext(CandidateContext);
    if (context === undefined) {
        throw new Error('useCandidate debe ser usado dentro de un CandidateProvider');
    }
    return context;
}
