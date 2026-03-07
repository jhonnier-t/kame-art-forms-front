interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  return (
    <div className="flex items-center w-full" role="progressbar" aria-valuenow={currentStep} aria-valuemax={totalSteps}>
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div
              className={[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200',
                step < currentStep
                  ? 'bg-black text-white'
                  : step === currentStep
                  ? 'bg-black text-white ring-4 ring-gray-300'
                  : 'bg-gray-200 text-gray-500',
              ].join(' ')}
            >
              {step < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step
              )}
            </div>
            <span
              className={[
                'text-xs font-medium hidden sm:block transition-colors',
                step === currentStep ? 'text-black font-semibold' : 'text-gray-400',
              ].join(' ')}
            >
              {labels[step - 1]}
            </span>
          </div>

          {step < totalSteps && (
            <div
              className={[
                'flex-1 h-0.5 mx-2 mb-5 transition-colors duration-200',
                step < currentStep ? 'bg-black' : 'bg-gray-200',
              ].join(' ')}
            />
          )}
        </div>
      ))}
    </div>
  )
}
