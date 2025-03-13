import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  const inputType = props.type === 'textarea' ? 'textarea' : 'input'
  const className = `w-full p-2 sm:p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
    error ? 'border-red-500' : ''
  }`

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {inputType === 'textarea' ? (
        <textarea {...props} className={className} />
      ) : (
        <input
          {...props}
          className={className}
          readOnly={props.value && !props.onChange}
        /> // Explicitly mark as read-only
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default Input
