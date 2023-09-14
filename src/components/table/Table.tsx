import React from 'react'
import { HangerData } from '../../utils/constants'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import './style.css'

interface TableProps {
  headers: string[]
  data: HangerData[]
  headerMapping: Record<string, string>
}

const Table: React.FC<TableProps> = ({ headers, data, headerMapping }) => {
  return (
    <table role="table" className="table">
      <TableHeader headers={headers} headerMapping={headerMapping} />
      <TableBody data={data} headers={headers} />
    </table>
  )
}

export default Table
