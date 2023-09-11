import React, { useEffect, useState } from 'react'
import Table from '../../components/table/Table'
import { useHangerDataContext } from '../../contexts/HangerDataContext'
import { HangerData, EnumData } from '../../utils/constants'

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
  selectedRowsData: HangerData[]
  selectedRow: number | null
  setSelectedRows: (selectedRows: HangerData[]) => void
  onRadioClick: (rowIndex: number) => void
}

const headers = Object.keys(headerMapping)

const HangerTable: React.FC<HangerTableProps> = ({
  selectedRowsData,
  setSelectedRows,
  onRadioClick,
}) => {
  const { hangersData, enumData } = useHangerDataContext()
  const [modifiedData, setModifiedData] = useState<HangerData[]>([])

  const handleRowSelect = (rowIndex: number) => {
    // Toggle row selection
    const selectedRow = modifiedData[rowIndex]
    const isSelected = selectedRowsData.includes(selectedRow)

    if (isSelected) {
      setSelectedRows(selectedRowsData.filter((row) => row !== selectedRow))
    } else {
      setSelectedRows([...selectedRowsData, selectedRow])
    }
  }

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
  }, [hangersData, enumData])

  const handleRadioClick = (rowIndex: number) => {
    handleRowSelect(rowIndex)
    onRadioClick(rowIndex)
  }

  return (
    <div>
      <Table
        headers={headers}
        data={modifiedData}
        headerMapping={headerMapping}
        onRadioClick={(rowIndex) => handleRadioClick(rowIndex)}
        selectedRows={selectedRowsData}
      />
    </div>
  )
}

export default HangerTable
