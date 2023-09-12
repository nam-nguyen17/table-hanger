/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react'
import './style.css'

interface TableBodyProps {
  data: any[]
  headers: string[]
  onRadioClick?: (rowIndex: number) => void
}

const TableBody: React.FC<TableBodyProps> = ({
  data,
  headers,
  onRadioClick,
}) => {
  return (
    <tbody role="rowgroup" className="table body">
      {data.map((row, rowIndex) => (
        <tr role="row" key={rowIndex} className="table row">
          {onRadioClick && (
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
          )}
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
