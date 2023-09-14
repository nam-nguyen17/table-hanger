import React, { createContext, useContext, useState } from 'react'

type SelectRowContextProps = {
  selectedRowId: number | null
  setSelectedRowId: React.Dispatch<React.SetStateAction<number | null>>
}

const SelectRowContext = createContext<SelectRowContextProps | undefined>(
  undefined
)

export const useSelectRowContext = () => {
  const context = useContext(SelectRowContext)
  if (!context) {
    throw new Error(
      'useSelectRowContext must be used within a SelectRowContextProvider'
    )
  }
  return context
}

export const SelectRowContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)

  return (
    <SelectRowContext.Provider value={{ selectedRowId, setSelectedRowId }}>
      {children}
    </SelectRowContext.Provider>
  )
}
