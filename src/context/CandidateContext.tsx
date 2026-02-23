import { createContext, useContext, useState, ReactNode } from 'react';
import type { Candidate } from '@/types';

interface CandidateContextType {
    candidate: Candidate | null;
    setCandidate: (candidate: Candidate | null) => void;
    isAuthenticated: boolean;
}

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

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

export function useCandidate() {
    const context = useContext(CandidateContext);
    if (context === undefined) {
        throw new Error('useCandidate debe ser usado dentro de un CandidateProvider');
    }
    return context;
}
