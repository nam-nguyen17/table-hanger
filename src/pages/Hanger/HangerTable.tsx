import React, { useEffect, useState } from 'react'
import Table from '../../components/table/Table'
import { useHangerDataContext } from '../../contexts/HangerDataContext'
import { EnumData, HangerData } from '../../utils/constants'
import { useSelectedRowContext } from '../../contexts/SelectedRowContext'

const headerMapping = {
  '': '',
  model: 'Model',
  ici: 'Installed Cost',
  wSize: 'Width',
  hSize: 'Height',
  bSize: 'Bearing',
  tfSize: 'TF Depth',
  tfFastenerDisplay: 'TF Fasteners',
  fFastenerDisplay: 'Face Fasteners',
  jFastenerDisplay: 'Joist Fasteners',
  load: 'Download (lbs)',
  uplift: 'Uplift (lbs)',
}

type HangerTableProps = {
  selectedRowData: HangerData[]
  updateModifiedData: (newModifiedData: HangerData[]) => void
}

const headers = Object.keys(headerMapping)

const HangerTable: React.FC<HangerTableProps> = ({ updateModifiedData }) => {
  const { hangersData, enumData } = useHangerDataContext()
  const [modifiedData, setModifiedData] = useState<HangerData[]>([])

  useEffect(() => {
    // Perform the modifications to hangersData based on enumData here
    const updatedData = hangersData.map((row) => {
      // TF Fasteners
      const tfEnumData = enumData.find(
        (item: EnumData) => item.enum === row.tfNailType
      )
      const tfFastenerDisplay =
        row.tfNailQty === 0 || !tfEnumData?.displayLabel
          ? '-'
          : `(${row.tfNailQty}) ${tfEnumData.displayLabel || ''}`

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

      const fFastenerDisplay = `${hNailQtyValue}${hNailQtyLabel}`

      // Joist Fasteners
      const jEnumData = enumData.find(
        (item: EnumData) => item.enum === row.jNailType
      )
      const jFastenerDisplay =
        row.jNailQty === 0 || !jEnumData?.displayLabel
          ? '-'
          : `(${row.jNailQty}) ${jEnumData.displayLabel || ''}`

      return {
        ...row,
        tfSize: row.tfSize === 0 ? '-' : row.tfSize,
        tfFastenerDisplay,
        fFastenerDisplay,
        jFastenerDisplay,
      }
    })

    setModifiedData(updatedData)
    updateModifiedData(updatedData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hangersData, enumData])

  const { selectedRowId, setSelectedRowId } = useSelectedRowContext()

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
