import React from 'react'

export interface ButtonProps {
  onClick?: () => void
  className?: string
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  type,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
