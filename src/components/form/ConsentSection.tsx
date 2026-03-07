import type { ConsentData, FormErrors } from '../../types/consent.types'
import { Checkbox } from '../ui/Checkbox'
import { FormField } from '../ui/FormField'

interface Props {
  data: ConsentData
  errors: FormErrors
  onChange: (data: ConsentData) => void
}

export function ConsentSection({ data, errors, onChange }: Props) {
  const update = <K extends keyof ConsentData>(key: K, value: ConsentData[K]) =>
    onChange({ ...data, [key]: value })

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Consentimiento Informado</h2>
        <p className="text-sm text-gray-500 mt-1">
          Lea con atención el siguiente documento antes de aceptar.
        </p>
      </div>

      {/* Scrollable consent document */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-48 sm:max-h-60 overflow-y-auto text-sm text-gray-700 leading-relaxed space-y-3">
        <p className="font-semibold text-gray-800 uppercase tracking-wide text-xs">
          Documento de Consentimiento Informado
        </p>
        <p>
          Yo, el/la paciente o representante legal, declaro que he recibido información suficiente,
          clara y comprensible sobre el procedimiento/tratamiento al que voy a ser sometido(a),
          incluyendo sus objetivos, beneficios, riesgos y alternativas existentes.
        </p>
        <p>
          <strong>Propósito del tratamiento:</strong> El procedimiento consiste en las intervenciones
          estéticas o terapéuticas que serán detalladas y explicadas por el profesional a cargo antes
          de su realización.
        </p>
        <p>
          <strong>Riesgos y beneficios:</strong> Comprendo que todo procedimiento tiene riesgos
          inherentes y que el profesional ha explicado los posibles efectos secundarios. He tenido la
          oportunidad de hacer preguntas y estas han sido respondidas satisfactoriamente.
        </p>
        <p>
          <strong>Derechos del paciente:</strong> Tengo derecho a retirar este consentimiento en
          cualquier momento antes del inicio del procedimiento, sin que esto afecte negativamente la
          calidad de la atención que recibiré.
        </p>
        <p>
          <strong>Tratamiento de datos personales:</strong> Mis datos personales serán tratados de
          conformidad con la política de privacidad vigente y la legislación de protección de datos.
          Serán utilizados únicamente para fines relacionados con la prestación del servicio.
        </p>
        <p>
          <strong>Confidencialidad:</strong> La información suministrada será tratada con total
          confidencialidad y solo será compartida con el personal necesario para la prestación del
          servicio.
        </p>
      </div>

      {/* Consent checkboxes */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">Declaraciones y Autorizaciones</h3>

        <Checkbox
          id="hasReadInformation"
          required
          label="He leído y comprendido la información sobre el procedimiento y mis preguntas han sido respondidas satisfactoriamente."
          checked={data.hasReadInformation}
          onChange={(v) => update('hasReadInformation', v)}
          error={errors.hasReadInformation}
        />

        <Checkbox
          id="consentsToProcedure"
          required
          label="Doy mi consentimiento voluntario e informado para la realización del procedimiento / tratamiento."
          checked={data.consentsToProcedure}
          onChange={(v) => update('consentsToProcedure', v)}
          error={errors.consentsToProcedure}
        />

        <Checkbox
          id="authorizesDataProcessing"
          required
          label="Autorizo el tratamiento de mis datos personales conforme a la política de privacidad del prestador del servicio."
          checked={data.authorizesDataProcessing}
          onChange={(v) => update('authorizesDataProcessing', v)}
          error={errors.authorizesDataProcessing}
        />

        <Checkbox
          id="authorizesMedia"
          label="Autorizo el registro fotográfico o de video del procedimiento con fines de seguimiento clínico o académico. (opcional)"
          checked={data.authorizesMedia}
          onChange={(v) => update('authorizesMedia', v)}
        />
      </div>

      {/* Location & date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <FormField
          label="Ciudad / Lugar de Firma"
          required
          value={data.place}
          onChange={(e) => update('place', e.target.value)}
          placeholder="Ej: Bogotá"
          error={errors.place}
        />
        <FormField
          label="Fecha de Firma"
          type="date"
          required
          value={data.signatureDate}
          readOnly
        />
      </div>
    </div>
  )
}
