// ── Domain types ────────────────────────────────────────────────────────────

export interface PersonalData {
  fullName: string
  documentType: 'CC' | 'CE' | 'PA' | 'TI' | 'NIT'
  documentId: string
  dateOfBirth: string
  email: string
  phone: string
  address: string
  city: string
  emergencyContactName: string
  emergencyContactPhone: string
}

export interface ConsentData {
  hasReadInformation: boolean
  consentsToProcedure: boolean
  authorizesDataProcessing: boolean
  authorizesMedia: boolean
  place: string
  signatureDate: string
}

export interface ConsentFormData {
  personalData: PersonalData
  consentData: ConsentData
  signatureImage: string
}

// ── API response ─────────────────────────────────────────────────────────────

export interface SubmitResponse {
  success: boolean
  message: string
  reference_number?: string
  drive_signature_id?: string
}

// ── UI helpers ────────────────────────────────────────────────────────────────

export type FormStep = 1 | 2 | 3

export type FormErrors = Record<string, string>
