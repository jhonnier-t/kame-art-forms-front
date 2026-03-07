import { useEffect, useRef } from 'react'
import SignaturePadLib from 'signature_pad'

interface Props {
  value: string
  onChange: (dataUrl: string) => void
  error?: string
}

export function SignaturePad({ value, onChange, error }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const padRef = useRef<SignaturePadLib | null>(null)
  // Keep onChange in a ref to avoid re-initializing the pad when the callback changes
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Scale canvas for high-DPI screens
    const ratio = Math.max(window.devicePixelRatio ?? 1, 1)
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.scale(ratio, ratio)

    const pad = new SignaturePadLib(canvas, {
      backgroundColor: 'rgb(255,255,255)',
      penColor: '#1a1a2e',
      minWidth: 1,
      maxWidth: 3,
    })
    padRef.current = pad

    const handleEndStroke = () => {
      if (!pad.isEmpty()) {
        onChangeRef.current(pad.toDataURL('image/png'))
      }
    }

    pad.addEventListener('endStroke', handleEndStroke)

    return () => {
      pad.removeEventListener('endStroke', handleEndStroke)
      pad.off()
    }
  }, []) // intentionally empty — runs once after mount

  const handleClear = () => {
    padRef.current?.clear()
    onChange('')
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Firma Digital</h2>
        <p className="text-sm text-gray-500 mt-1">
          Firme en el recuadro a continuación usando el mouse o su pantalla táctil.
        </p>
      </div>

      <div
        className={[
          'border-2 rounded-lg overflow-hidden',
          error ? 'border-red-400' : 'border-gray-300',
        ].join(' ')}
      >
        {/* Toolbar */}
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Zona de Firma
          </span>
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-gray-500 hover:text-red-500 transition-colors font-medium"
          >
            Limpiar
          </button>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full touch-none block"
          style={{ height: '220px', cursor: 'crosshair' }}
          aria-label="Área de firma digital"
        />

        {/* Footer line */}
        <div className="bg-gray-50 px-6 py-2 border-t border-gray-200">
          <div className="border-t border-dashed border-gray-400" />
          <p className="text-xs text-gray-400 text-center mt-1.5">
            Firma del paciente o representante legal
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      {value && !error && (
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Firma capturada correctamente.
        </div>
      )}
    </div>
  )
}
