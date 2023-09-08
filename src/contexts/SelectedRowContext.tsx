import React, { createContext, useContext, useState, ReactNode } from 'react'

export type SelectedRowData = {
  rowIndex: number | null
}

interface SelectedRowContextProps {
  selectedRow: SelectedRowData
  selectRow: (rowIndex: number | null) => void
}

const SelectedRowContext = createContext<SelectedRowContextProps>(
  {} as SelectedRowContextProps
)

export const useSelectedRowContext = () => useContext(SelectedRowContext)

export const SelectedRowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedRow, setSelectedRow] = useState<SelectedRowData>({
    rowIndex: null,
  })

  const selectRow = (rowIndex: number | null) => {
    setSelectedRow({ rowIndex })
  }

  return (
    <SelectedRowContext.Provider value={{ selectedRow, selectRow }}>
      {children}
    </SelectedRowContext.Provider>
  )
}
