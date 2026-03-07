import { useState } from 'react'
import type { ConsentFormData, ConsentData, FormErrors, FormStep, PersonalData } from '../types/consent.types'
import { submitConsentForm } from '../services/api.service'

// ── Initial state ─────────────────────────────────────────────────────────────

const today = new Date().toISOString().split('T')[0]

const INITIAL_PERSONAL_DATA: PersonalData = {
  fullName: '',
  documentType: 'CC',
  documentId: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
}

const INITIAL_CONSENT_DATA: ConsentData = {
  hasReadInformation: false,
  consentsToProcedure: false,
  authorizesDataProcessing: false,
  authorizesMedia: false,
  place: '',
  signatureDate: today,
}

// ── Validators ────────────────────────────────────────────────────────────────

function validatePersonalData(data: PersonalData): FormErrors {
  const errors: FormErrors = {}
  if (data.fullName.trim().length < 2) errors.fullName = 'El nombre completo es requerido (mín. 2 caracteres).'
  if (data.documentId.trim().length < 5) errors.documentId = 'El número de documento debe tener al menos 5 caracteres.'
  if (!data.dateOfBirth) errors.dateOfBirth = 'La fecha de nacimiento es requerida.'
  if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email))
    errors.email = 'Ingrese un correo electrónico válido.'
  if (data.phone.trim().length < 7) errors.phone = 'El teléfono debe tener al menos 7 dígitos.'
  if (data.address.trim().length < 5) errors.address = 'La dirección debe tener al menos 5 caracteres.'
  if (data.city.trim().length < 2) errors.city = 'La ciudad es requerida.'
  if (data.emergencyContactName.trim().length < 2)
    errors.emergencyContactName = 'El nombre de contacto de emergencia es requerido.'
  if (data.emergencyContactPhone.trim().length < 7)
    errors.emergencyContactPhone = 'El teléfono de emergencia debe tener al menos 7 dígitos.'
  return errors
}

function validateConsentData(data: ConsentData): FormErrors {
  const errors: FormErrors = {}
  if (!data.hasReadInformation)
    errors.hasReadInformation = 'Debe confirmar que leyó y comprendió la información.'
  if (!data.consentsToProcedure)
    errors.consentsToProcedure = 'Debe dar su consentimiento para continuar.'
  if (!data.authorizesDataProcessing)
    errors.authorizesDataProcessing = 'Debe autorizar el tratamiento de sus datos.'
  if (!data.place.trim()) errors.place = 'La ciudad / lugar de firma es requerida.'
  return errors
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useConsentForm() {
  const [step, setStep] = useState<FormStep>(1)
  const [personalData, setPersonalData] = useState<PersonalData>(INITIAL_PERSONAL_DATA)
  const [consentData, setConsentData] = useState<ConsentData>(INITIAL_CONSENT_DATA)
  const [signatureImage, setSignatureImage] = useState<string>('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState('')
  const [submitError, setSubmitError] = useState('')

  function goToNextStep() {
    if (step === 1) {
      const validationErrors = validatePersonalData(personalData)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }
    }
    if (step === 2) {
      const validationErrors = validateConsentData(consentData)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }
    }
    setErrors({})
    setStep((prev) => (prev < 3 ? ((prev + 1) as FormStep) : prev))
  }

  function goToPrevStep() {
    setErrors({})
    setStep((prev) => (prev > 1 ? ((prev - 1) as FormStep) : prev))
  }

  async function handleSubmit() {
    if (!signatureImage) {
      setErrors({ signature: 'La firma es requerida para enviar el formulario.' })
      return
    }

    const formData: ConsentFormData = { personalData, consentData, signatureImage }
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const result = await submitConsentForm(formData)
      if (result.success) {
        setIsSuccess(true)
        setReferenceNumber(result.reference_number ?? '')
      } else {
        setSubmitError(result.message)
      }
    } catch {
      setSubmitError('No se pudo enviar el formulario. Verifique su conexión e intente nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
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
  }
}
