import { useConsentForm } from './hooks/useConsentForm'
import { ProgressBar } from './components/ui/ProgressBar'
import { Button } from './components/ui/Button'
import { PersonalDataSection } from './components/form/PersonalDataSection'
import { ConsentSection } from './components/form/ConsentSection'
import { SignaturePad } from './components/form/SignaturePad'
import { SuccessScreen } from './components/form/SuccessScreen'

const STEP_LABELS = ['Datos Personales', 'Consentimiento', 'Firma']

export default function App() {
  const {
    step,
    personalData,
    setPersonalData,
    consentData,
    setConsentData,
    signatureImage,
    setSignatureImage,
    errors,
    isSubmitting,
    isSuccess,
    referenceNumber,
    submitError,
    goToNextStep,
    goToPrevStep,
    handleSubmit,
  } = useConsentForm()

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto">
        {/* ── Header ── */}
        <header className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">KameArt</h1>
          <p className="text-gray-500 mt-1 text-sm">Formulario de Consentimiento Informado</p>
        </header>

        {/* ── Card ── */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden">
          {!isSuccess ? (
            <>
              {/* Progress */}
              <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-4 border-b border-gray-100">
                <ProgressBar currentStep={step} totalSteps={3} labels={STEP_LABELS} />
              </div>

              {/* Step content */}
              <div className="p-4 sm:p-8">
                {step === 1 && (
                  <PersonalDataSection
                    data={personalData}
                    errors={errors}
                    onChange={setPersonalData}
                  />
                )}
                {step === 2 && (
                  <ConsentSection
                    data={consentData}
                    errors={errors}
                    onChange={setConsentData}
                  />
                )}
                {step === 3 && (
                  <SignaturePad
                    value={signatureImage}
                    onChange={setSignatureImage}
                    error={errors.signature}
                  />
                )}

                {/* Server error */}
                {submitError && (
                  <div className="mt-5 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700" role="alert">
                    {submitError}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="px-4 sm:px-8 py-3 sm:py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center gap-2">
                <Button variant="outline" onClick={goToPrevStep} disabled={step === 1}>
                  ← Anterior
                </Button>
                <span className="text-xs text-gray-400 shrink-0">
                  Paso {step} de 3
                </span>
                {step < 3 ? (
                  <Button onClick={goToNextStep}>
                    Siguiente →
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} isLoading={isSubmitting}>
                    <span className="hidden sm:inline">Enviar Consentimiento</span>
                    <span className="sm:hidden">Enviar</span>
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="p-4 sm:p-8">
              <SuccessScreen referenceNumber={referenceNumber} patientName={personalData.fullName} />
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Sus datos están protegidos y serán tratados con absoluta confidencialidad.
        </p>
      </div>
    </div>
  )
}
