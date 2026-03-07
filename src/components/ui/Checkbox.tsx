import type { ReactNode } from 'react'

interface CheckboxProps {
  id: string
  label: ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
  required?: boolean
}

export function Checkbox({ id, label, checked, onChange, error, required }: CheckboxProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-400 text-black focus:ring-gray-900"
        />
        <span className="text-sm text-gray-700 leading-relaxed">
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden>*</span>}
        </span>
      </label>
      {error && (
        <p className="text-xs text-red-500 ml-7" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
