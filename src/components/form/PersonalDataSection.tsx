import type { PersonalData, FormErrors } from '../../types/consent.types'
import { FormField, SelectField } from '../ui/FormField'

interface Props {
  data: PersonalData
  errors: FormErrors
  onChange: (data: PersonalData) => void
}

export function PersonalDataSection({ data, errors, onChange }: Props) {
  const update = <K extends keyof PersonalData>(key: K, value: PersonalData[K]) =>
    onChange({ ...data, [key]: value })

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Datos Personales</h2>
        <p className="text-sm text-gray-500 mt-1">
          Complete sus datos personales. Los campos con <span className="text-red-500">*</span> son obligatorios.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full row */}
        <div className="sm:col-span-2">
          <FormField
            label="Nombre Completo"
            required
            value={data.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            placeholder="Ej: Juan García López"
            error={errors.fullName}
            autoComplete="name"
          />
        </div>

        <SelectField
          label="Tipo de Documento"
          required
          value={data.documentType}
          onChange={(e) => update('documentType', e.target.value as PersonalData['documentType'])}
          error={errors.documentType}
        >
          <option value="CC">Cédula de Ciudadanía (CC)</option>
          <option value="CE">Cédula de Extranjería (CE)</option>
          <option value="PA">Pasaporte (PA)</option>
          <option value="TI">Tarjeta de Identidad (TI)</option>
          <option value="NIT">NIT</option>
        </SelectField>

        <FormField
          label="Número de Documento"
          required
          value={data.documentId}
          onChange={(e) => update('documentId', e.target.value.replace(/\D/g, ''))}
          placeholder="Ej: 1234567890"
          inputMode="numeric"
          error={errors.documentId}
        />

        <FormField
          label="Fecha de Nacimiento"
          type="date"
          required
          value={data.dateOfBirth}
          onChange={(e) => update('dateOfBirth', e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          error={errors.dateOfBirth}
        />

        <FormField
          label="Correo Electrónico"
          type="email"
          required
          value={data.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="correo@ejemplo.com"
          error={errors.email}
          autoComplete="email"
        />

        <FormField
          label="Teléfono"
          type="tel"
          required
          value={data.phone}
          onChange={(e) => update('phone', e.target.value.replace(/\D/g, ''))}
          placeholder="Ej: 3001234567"
          inputMode="numeric"
          error={errors.phone}
          autoComplete="tel"
        />

        <div className="sm:col-span-2">
          <FormField
            label="Dirección"
            required
            value={data.address}
            onChange={(e) => update('address', e.target.value)}
            placeholder="Ej: Calle 10 # 20-30, Barrio Centro"
            error={errors.address}
            autoComplete="street-address"
          />
        </div>

        <FormField
          label="Ciudad"
          required
          value={data.city}
          onChange={(e) => update('city', e.target.value)}
          placeholder="Ej: Bogotá"
          error={errors.city}
        />
      </div>

      {/* Emergency contact */}
      <div className="border-t border-gray-100 pt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Contacto de Emergencia</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Nombre del Contacto"
            required
            value={data.emergencyContactName}
            onChange={(e) => update('emergencyContactName', e.target.value)}
            placeholder="Ej: María García"
            error={errors.emergencyContactName}
          />
          <FormField
            label="Teléfono del Contacto"
            type="tel"
            required
            value={data.emergencyContactPhone}
            onChange={(e) => update('emergencyContactPhone', e.target.value.replace(/\D/g, ''))}
            placeholder="Ej: 3007654321"
            inputMode="numeric"
            error={errors.emergencyContactPhone}
          />
        </div>
      </div>
    </div>
  )
}
