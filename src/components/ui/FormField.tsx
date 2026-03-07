import type { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react'

interface BaseProps {
  label: string
  error?: string
  required?: boolean
}

// ── Input field ───────────────────────────────────────────────────────────────

type FormFieldProps = BaseProps & InputHTMLAttributes<HTMLInputElement>

export function FormField({ label, error, required, ...inputProps }: FormFieldProps) {
  const fieldClass = [
    'w-full border rounded-md px-3 py-3 text-sm transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-blue-500',
    error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300',
    inputProps.readOnly ? 'bg-gray-50 cursor-default text-gray-500' : 'bg-white',
  ].join(' ')

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden>*</span>}
      </label>
      <input className={fieldClass} {...inputProps} />
      {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
    </div>
  )
}

// ── Select field ──────────────────────────────────────────────────────────────

type SelectFieldProps = BaseProps & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }

export function SelectField({ label, error, required, children, ...selectProps }: SelectFieldProps) {
  const fieldClass = [
    'w-full border rounded-md px-3 py-3 text-sm bg-white transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-gray-900',
    error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300',
  ].join(' ')

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden>*</span>}
      </label>
      <select className={fieldClass} {...selectProps}>
        {children}
      </select>
      {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
    </div>
  )
}
