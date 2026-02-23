import { createContext } from 'react';
import type { Candidate } from '@/types';

export interface CandidateContextType {
    candidate: Candidate | null;
    setCandidate: (candidate: Candidate | null) => void;
    isAuthenticated: boolean;
}

export const CandidateContext = createContext<CandidateContextType | undefined>(undefined);
