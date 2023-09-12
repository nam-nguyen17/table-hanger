import React from 'react'
import { HangerData } from '../../utils/constants'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import './style.css'

interface TableProps {
  headers: string[]
  data: HangerData[]
  headerMapping: Record<string, string>
  onRowSelect?: (rowIndex: number) => void
  onRadioClick?: (rowIndex: number) => void
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  headerMapping,
  onRadioClick,
  onRowSelect,
}) => {
  return (
    <table role="table" className="table">
      <TableHeader headers={headers} headerMapping={headerMapping} />
      <TableBody data={data} headers={headers} onRadioClick={onRadioClick} />
    </table>
  )
}

export default Table
