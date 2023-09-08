import React from 'react'
import { SelectedRowData } from '../../contexts/SelectedRowContext'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import './style.css'

interface TableProps {
  headers: string[]
  data: any[]
  headerMapping: Record<string, string>
  onRadioClick: (rowIndex: number) => void
  selectedRow: SelectedRowData | null
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  headerMapping,
  onRadioClick,
  selectedRow,
}) => {
  return (
    <table role="table" className="table">
      <TableHeader headers={headers} headerMapping={headerMapping} />
      <TableBody
        data={data}
        headers={headers}
        onRadioClick={onRadioClick}
        selectedRow={selectedRow}
      />
    </table>
  )
}

export default Table
