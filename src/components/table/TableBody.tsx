/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react'
import './style.css'

interface TableBodyProps {
  data: any[]
  headers: string[]
  cellRenderer: (row: any, header: string, rowIndex: number) => React.ReactNode
  children?: React.ReactNode
}

const TableBody: React.FC<TableBodyProps> = ({
  data,
  headers,
  cellRenderer,
  children,
}) => {
  return (
    <tbody role="rowgroup" className="table body">
      {data.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <tr role="row" className="table row">
            {headers.map((header, cellIndex) => (
              <td role="cell" key={cellIndex}>
                {cellRenderer(row, header, rowIndex)}
              </td>
            ))}
          </tr>
        </React.Fragment>
      ))}
      {children}
    </tbody>
  )
}

export default TableBody
