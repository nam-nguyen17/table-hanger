import React from 'react'

export interface ButtonProps {
  onClick?: () => void
  className?: string
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  style?: React.CSSProperties
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  type,
  disabled,
  style,
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
