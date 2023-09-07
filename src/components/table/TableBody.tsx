import React from 'react'
import styles from './styles.module.scss'

interface TableBodyProps {
  data: any[]
  headers: string[]
}

const TableBody: React.FC<TableBodyProps> = ({ data, headers }) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <tbody role="rowgroup" className={styles.table__body}>
      {data.map((row, rowIndex) => (
        <tr role="row" key={rowIndex} className={styles.table__row}>
          <td role="cell">
            <input
              type="radio"
              name="selectRow"
              value={rowIndex}
              style={{
                cursor: 'pointer',
                width: '18px',
                height: '18px',
              }}
            />
          </td>
          {headers.slice(1).map((header, cellIndex) => (
            <td role="cell" key={cellIndex}>
              {row[header]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
