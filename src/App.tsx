import '@/i18n'
import { useTranslation } from 'react-i18next'
import { TooltipProvider } from '@/components/ui/tooltip'
import { CandidateProvider } from '@/context/CandidateContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { CandidateForm } from '@/components/CandidateForm'
import { JobsList } from '@/components/JobsList'
import { FloatingButtons } from '@/components/FloatingButtons'

function App() {
  const { t } = useTranslation()

  return (
    <ErrorBoundary>
      <TooltipProvider delayDuration={300}>
        <CandidateProvider>
          <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">
                  {t('app.title')}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {t('app.subtitle')}
                </p>
              </div>

              <CandidateForm />
              <JobsList />
            </div>
          </div>

          <FloatingButtons />
        </CandidateProvider>
      </TooltipProvider>
    </ErrorBoundary>
  )
}

export default App
