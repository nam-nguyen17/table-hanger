import React from 'react'

interface TableHeaderProps {
  headers: string[]
  headerMapping: Record<string, string>
}

const TableHeader: React.FC<TableHeaderProps> = ({
  headers,
  headerMapping,
}) => {
  return (
    <thead className="table header">
      <tr role="row">
        {headers.map((header, index) => (
          <th colSpan={1} role="columnheader" key={index} className="th">
            {headerMapping[header]}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
