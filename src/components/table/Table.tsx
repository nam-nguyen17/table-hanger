import React from 'react'
import styles from './styles.module.scss'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

interface TableProps {
  headers: string[]
  data: any[]
  headerMapping: Record<string, string>
}

const Table: React.FC<TableProps> = ({ headers, data, headerMapping }) => {
  return (
    <table role="table" className={styles.table}>
      <TableHeader headers={headers} headerMapping={headerMapping} />
      <TableBody data={data} headers={headers} />
    </table>
  )
}

export default Table
