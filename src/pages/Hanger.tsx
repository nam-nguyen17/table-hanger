import React, { useEffect, useState } from 'react'
import Navbar from '../layouts/Navbar'
import PageContainer from '../layouts/PageContainer'
import Table from '../components/table/Table'
import { fetchData } from '../utils/helpers'
import { HangerData } from '../utils/constants'

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
  url?: string
}

const headers = Object.keys(headerMapping)

const Hanger: React.FC = () => {
  const [hangersData, setHangersData] = useState<HangerData[]>([])
  const [enumData, setEnumData] = useState<EnumData[]>([])

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
        tfNailQty,
        hNailQty,
        jNailQty,
      }
    })

    setEnumData(enumData)
    setHangersData(modifiedData)
  }
  console.log(enumData)

  useEffect(() => {
    fetchHangerData()
  }, [])

  return (
    <>
      <Navbar />
      <PageContainer>
        <Table
          headers={headers}
          data={hangersData}
          headerMapping={headerMapping}
        />
      </PageContainer>
    </>
  )
}

export default Hanger
