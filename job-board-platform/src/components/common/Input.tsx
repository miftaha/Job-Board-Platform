import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input = ({ label, ...props }: InputProps) => (
  <div className="mb-4">
    <label className="block text-subheading mb-1">{label}</label>
    <input
      className="w-full p-3 rounded-lg border border-gray-300 text-neutral"
      {...props}
    />
  </div>
)

export default Input
