/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react'
import './style.css'
import { useSelectRowContext } from '../../contexts/SelectRowContext'

interface TableBodyProps {
  data: any[]
  headers: string[]
}

const TableBody: React.FC<TableBodyProps> = ({ data, headers }) => {
  const { selectedRowId, setSelectedRowId } = useSelectRowContext()

  const handleRadioChange = (rowIndex: number) => {
    setSelectedRowId(rowIndex)
  }

  return (
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
              checked={selectedRowId === rowIndex}
              onChange={() => handleRadioChange(rowIndex)}
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
