import { ReactNode } from 'react'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline'
  onClick?: () => void
  children: ReactNode
  className?: string

  disabled?: boolean
}

const Button = ({
  type = 'button',
  variant = 'primary',
  onClick,
  children,
  className = '',
}: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium'
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
