import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import './style.css'

interface TableProps {
  headers: string[]
  data: any[]
  headerMapping: Record<string, string>
  cellRenderer: (row: any, header: string, rowIndex: number) => React.ReactNode
  children?: React.ReactNode
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  headerMapping,
  cellRenderer,
  children,
}) => {
  return (
    <table role="table" className="table">
      <TableHeader headers={headers} headerMapping={headerMapping} />
      <TableBody
        data={data}
        headers={headers}
        cellRenderer={cellRenderer}
        children={children}
      />
    </table>
  )
}

export default Table
