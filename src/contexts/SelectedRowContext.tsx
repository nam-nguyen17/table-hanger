import React, { createContext, useContext, useState } from 'react'
import { HangerData } from '../utils/constants'

type SelectedRowContextType = {
  selectedRowData: HangerData | null
  setSelectedRowData: (data: HangerData | null) => void
  selectedRowId: number | null
  setSelectedRowId: React.Dispatch<React.SetStateAction<number | null>>
}

const SelectedRowContext = createContext<SelectedRowContextType | undefined>(
  undefined
)

export const useSelectedRowContext = () => {
  const context = useContext(SelectedRowContext)
  if (context === undefined) {
    throw new Error(
      'useSelectedRowContext must be used within a SelectedRowProvider'
    )
  }
  return context
}

export const SelectedRowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedRowData, setSelectedRowData] = useState<HangerData | null>(
    null
  )

  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)

  return (
    <SelectedRowContext.Provider
      value={{
        selectedRowData,
        setSelectedRowData,
        selectedRowId,
        setSelectedRowId,
      }}
    >
      {children}
    </SelectedRowContext.Provider>
  )
}
