import './App.css'
import { CandidateProvider } from '@/context/CandidateContext'
import { CandidateForm } from '@/components/CandidateForm'
import { JobsList } from '@/components/JobsList'

function App() {
  return (
    <CandidateProvider>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
             Aplicación a Posiciones
            </h1>
            <p className="text-lg text-muted-foreground">
              Challenge técnico para aplicar a posiciones disponibles
            </p>
          </div>

          <CandidateForm />
          <JobsList />
        </div>
      </div>
    </CandidateProvider>
  )
}

export default App
