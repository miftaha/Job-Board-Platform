import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
}: ButtonProps) {
  const baseStyles =
    'px-6 py-3 rounded-lg font-medium text-white transition-colors'
  const variantStyles =
    variant === 'primary'
      ? 'bg-primary hover:bg-blue-800'
      : 'bg-secondary hover:bg-green-700'

  return (
    <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
      {children}
    </button>
  )
}
