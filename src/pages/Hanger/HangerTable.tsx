/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import Table from '../../components/table/Table'
import { useSelectedRowContext } from '../../contexts/SelectedRowContext'
import { HangerData } from '../../utils/constants'
import { fetchData } from '../../utils/helpers'

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

interface EnumData {
  name: string
  enum: number
  displayLabel: string
}

type HangerTableProps = {
  setSelectedRow: (rowIndex: number | null, rowData: HangerData) => void
}

const headers = Object.keys(headerMapping)

const HangerTable: React.FC<HangerTableProps> = ({ setSelectedRow }) => {
  const [hangersData, setHangersData] = useState<HangerData[]>([])
  const [enumData, setEnumData] = useState<EnumData[]>([])
  const { selectRow, selectedRow } = useSelectedRowContext()

  const fetchHangerData = async () => {
    const hangerData: HangerData[] = await fetchData('./data/test-data.json')
    const enumData: EnumData[] = await fetchData('./data/test-enum.json')

    const modifiedData = hangerData.map((row) => {
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

    setEnumData(enumData)
    setHangersData(modifiedData)
  }

  useEffect(() => {
    fetchHangerData()
  }, [])

  const handleRadioClick = (rowIndex: number) => {
    selectRow(rowIndex)
    setSelectedRow(rowIndex, hangersData[rowIndex])
  }

  return (
    <div>
      <Table
        headers={headers}
        data={hangersData}
        headerMapping={headerMapping}
        onRadioClick={(rowIndex) => handleRadioClick(rowIndex)}
        selectedRow={selectedRow}
      />
    </div>
  )
}

export default HangerTable
