import React from 'react'
import { SelectedRowData } from '../../contexts/SelectedRowContext'
import './style.css'

interface TableBodyProps {
  data: any[]
  headers: string[]
  onRadioClick: (rowIndex: number) => void
  selectedRow: SelectedRowData | null
}

const TableBody: React.FC<TableBodyProps> = ({
  data,
  headers,
  onRadioClick,
  selectedRow,
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <tbody role="rowgroup" className="table body">
      {data.map((row, rowIndex) => (
        <tr role="row" key={rowIndex} className="table row">
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
              onClick={() => onRadioClick(rowIndex)}
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
