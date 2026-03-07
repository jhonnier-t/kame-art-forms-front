interface Props {
  referenceNumber: string
  patientName: string
}

export function SuccessScreen({ referenceNumber, patientName }: Props) {
  return (
    <div className="text-center space-y-6 py-6">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Message */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">¡Consentimiento Registrado!</h2>
        <p className="text-gray-500 mt-2">
          Hola <strong className="text-gray-700">{patientName}</strong>, su consentimiento informado
          ha sido registrado y almacenado de forma segura.
        </p>
      </div>

      {/* Reference */}
      <div className="bg-gray-100 border border-gray-300 rounded-xl p-5 inline-block mx-auto">
        <p className="text-sm text-gray-600 font-medium">Número de Referencia</p>
        <p className="text-2xl sm:text-3xl font-bold text-black tracking-widest mt-1 break-all">{referenceNumber}</p>
        <p className="text-xs text-gray-500 mt-1">Guarde este número para futuras consultas.</p>
      </div>

      <p className="text-sm text-gray-400 max-w-sm mx-auto">
        Sus datos personales y firma digital han sido almacenados de manera segura y confidencial.
      </p>
    </div>
  )
}
