import React, { useEffect, useState } from 'react'
import Table from '../../components/table/Table'
import { useHangerDataContext } from '../../contexts/HangerDataContext'
import { useSelectRowContext } from '../../contexts/SelectRowContext'
import { EnumData, HangerData } from '../../utils/constants'

const headerMapping = {
  '': '',
  model: 'Model',
  ici: 'Installed Cost',
  wSize: 'Width',
  hSize: 'Height',
  bSize: 'Bearing',
  tfSize: 'TF Depth',
  tfNailQty: 'TF Fasteners',
  hNailQty: 'Face Fasteners',
  jNailQty: 'Joist Fasteners',
  load: 'Download (lbs)',
  uplift: 'Uplift (lbs)',
}

type HangerTableProps = {
  updateModifiedData: (newModifiedData: HangerData[]) => void
  filteredData: HangerData[]
}

const headers = Object.keys(headerMapping)

const HangerTable: React.FC<HangerTableProps> = ({
  updateModifiedData,
  filteredData,
}) => {
  const { hangersData, enumData } = useHangerDataContext()
  const [modifiedData, setModifiedData] = useState<HangerData[]>([])
  const { selectedRowId, setSelectedRowId } = useSelectRowContext()

  useEffect(() => {
    // Perform the modifications to hangersData based on enumData here
    const updatedData = hangersData.map((row) => {
      // TF Fasteners
      const tfNailQty =
        row.tfNailQty === 0
          ? '-'
          : `(${row.tfNailQty}) ${
              enumData.find((item: EnumData) => item.enum === row.tfNailType)
                ?.displayLabel || ''
            }`

      // Face Fasteners
      const hNailQtyValue = Array.isArray(row.hNailQty)
        ? row.hNailQty[0] === 0
          ? '-'
          : `(${row.hNailQty[0]})`
        : ''

      const hNailQtyLabel = Array.isArray(row.hNailQty)
        ? ` ${
            enumData.find((item: EnumData) => item.enum === row.hNailType[0])
              ?.displayLabel || ''
          }`
        : ''

      const hNailQty = `${hNailQtyValue}${hNailQtyLabel}`

      // Joist Fasteners
      const jNailQty = `(${row.jNailQty}) ${
        enumData.find((item: EnumData) => item.enum === row.jNailType)
          ?.displayLabel || ''
      }`

      return {
        ...row,
        tfSize: row.tfSize === 0 ? '-' : row.tfSize,
        tfNailQty,
        hNailQty,
        jNailQty,
      }
    })

    setModifiedData(updatedData)
    updateModifiedData(updatedData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hangersData, enumData])

  const handleRowSelect = (rowIndex: number) => {
    setSelectedRowId(rowIndex)
  }

  return (
    <div className="table-viewer">
      <Table
        headers={headers}
        data={modifiedData}
        headerMapping={headerMapping}
        cellRenderer={(row, header, rowIndex) => {
          if (header === '') {
            return (
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
                onChange={() => handleRowSelect(rowIndex)}
              />
            )
          } else {
            return row[header]
          }
        }}
      />
    </div>
  )
}

export default HangerTable
