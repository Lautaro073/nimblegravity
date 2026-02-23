import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Candidate } from '@/types';
import { CandidateContext } from './candidateContextDef';

export function CandidateProvider({ children }: { children: ReactNode }) {
    const [candidate, setCandidate] = useState<Candidate | null>(null);

    return (
        <CandidateContext.Provider
            value={{
                candidate,
                setCandidate,
                isAuthenticated: !!candidate,
            }}
        >
            {children}
        </CandidateContext.Provider>
    );
}
