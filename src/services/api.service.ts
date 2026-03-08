import axios from 'axios'
import type { ConsentFormData, SubmitResponse } from '../types/consent.types'

const BASE_URL = `${import.meta.env.VITE_API_URL ?? ''}/api/consent`

/**
 * Maps camelCase frontend fields to snake_case backend fields
 * and submits the consent form to the FastAPI backend.
 */
export async function submitConsentForm(data: ConsentFormData): Promise<SubmitResponse> {
  const payload = {
    personal_data: {
      full_name: data.personalData.fullName,
      document_type: data.personalData.documentType,
      document_id: data.personalData.documentId,
      date_of_birth: data.personalData.dateOfBirth,
      email: data.personalData.email,
      phone: data.personalData.phone,
      address: data.personalData.address,
      city: data.personalData.city,
      emergency_contact_name: data.personalData.emergencyContactName,
      emergency_contact_phone: data.personalData.emergencyContactPhone,
    },
    consent_data: {
      has_read_information: data.consentData.hasReadInformation,
      consents_to_procedure: data.consentData.consentsToProcedure,
      authorizes_data_processing: data.consentData.authorizesDataProcessing,
      authorizes_media: data.consentData.authorizesMedia,
      place: data.consentData.place,
      signature_date: data.consentData.signatureDate,
    },
    signature_image: data.signatureImage,
  }

  const { data: response } = await axios.post<SubmitResponse>(`${BASE_URL}/submit`, payload)
  return response
}
