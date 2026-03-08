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
          Consentimiento Informado — Tatuajes y Perforaciones (Piercing)
        </p>
        <p>
          Yo, el/la cliente o representante legal, declaro libre y voluntariamente que deseo realizarme
          un procedimiento de <strong>tatuaje y/o perforación corporal (piercing)</strong> en el estudio
          KameArt, y que he sido informado(a) de manera clara y suficiente sobre su naturaleza,
          riesgos y cuidados posteriores.
        </p>
        <p>
          <strong>Naturaleza del procedimiento:</strong> El tatuaje consiste en la introducción de
          pigmentos en la dermis mediante agujas estériles de un solo uso. El piercing consiste en la
          perforación de tejido corporal para la inserción de joyería. Ambos procedimientos son
          realizados por artistas certificados utilizando material estéril y descartable.
        </p>
        <p>
          <strong>Riesgos conocidos:</strong> Comprendo que estos procedimientos conllevan riesgos
          inherentes que incluyen, pero no se limitan a: infección local, reacciones alérgicas a
          pigmentos o materiales, queloides, sangrado, dolor e inflamación. En personas con
          enfermedades como diabetes, hemofilia, trastornos de coagulación, enfermedades
          autoinmunes o VIH, los riesgos pueden ser mayores. Declaro no padecer ninguna condición
          médica que contraindique el procedimiento, o en caso de tenerla, haber informado al artista.
        </p>
        <p>
          <strong>Restricción para menores de edad:</strong> Las personas menores de 18 años
          requieren la presencia física y firma del padre, madre o representante legal debidamente
          identificado para la realización de cualquier procedimiento. KameArt se reserva el derecho
          de negar el servicio si no se cumple este requisito.
        </p>
        <p>
          <strong>Cuidados posteriores:</strong> He recibido o recibiré instrucciones de cuidado
          post-procedimiento. Entiendo que el resultado final y la cicatrización dependen en gran
          medida del seguimiento de dichas instrucciones. KameArt no se responsabiliza por
          complicaciones derivadas del incumplimiento de los cuidados indicados.
        </p>
        <p>
          <strong>Estado de salud y sustancias:</strong> Declaro que no me encuentro bajo los efectos
          del alcohol ni de sustancias psicoactivas, y que mi estado de salud en el momento de la
          firma es apto para la realización del procedimiento.
        </p>
        <p>
          <strong>Permanencia e irreversibilidad:</strong> Comprendo que los tatuajes son
          permanentes y que su eliminación requiere procedimientos adicionales (láser) que no son
          competencia de KameArt. Las perforaciones pueden cerrarse si se retira la joyería, pero
          pueden dejar marcas visibles.
        </p>
        <p>
          <strong>Tratamiento de datos personales:</strong> Mis datos personales y los registros
          fotográficos del procedimiento serán tratados conforme a la Ley 1581 de 2012 (Colombia)
          y demás normativa aplicable. Serán utilizados únicamente para la gestión del servicio
          y seguimiento del cliente.
        </p>
      </div>

      {/* Consent checkboxes */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">Declaraciones y Autorizaciones</h3>

        <Checkbox
          id="hasReadInformation"
          required
          label="He leído y comprendido este documento de consentimiento informado. He tenido la oportunidad de hacer preguntas y estas han sido respondidas satisfactoriamente."
          checked={data.hasReadInformation}
          onChange={(v) => update('hasReadInformation', v)}
          error={errors.hasReadInformation}
        />

        <Checkbox
          id="consentsToProcedure"
          required
          label="Doy mi consentimiento voluntario e informado para la realización del tatuaje y/o perforación (piercing), conociendo los riesgos asociados y declarando que mi estado de salud es apto para el procedimiento."
          checked={data.consentsToProcedure}
          onChange={(v) => update('consentsToProcedure', v)}
          error={errors.consentsToProcedure}
        />

        <Checkbox
          id="authorizesDataProcessing"
          required
          label="Autorizo el tratamiento de mis datos personales por parte de KameArt conforme a la Ley 1581 de 2012 y la política de privacidad del estudio, para la gestión del servicio y seguimiento."
          checked={data.authorizesDataProcessing}
          onChange={(v) => update('authorizesDataProcessing', v)}
          error={errors.authorizesDataProcessing}
        />

        <Checkbox
          id="authorizesMedia"
          label="Autorizo el registro fotográfico del tatuaje y/o perforación realizado(a) para fines de portafolio artístico y redes sociales de KameArt. Mi identidad solo será publicada con mi consentimiento expreso. (opcional)"
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
