import React, { useEffect, useState } from 'react'
import Navbar from '../layouts/Navbar'
import PageContainer from '../layouts/PageContainer'
import Table from '../components/table/Table'
import { fetchData } from '../utils/helpers'

const headerMapping = {
  '': '',
  model: 'Model',
  ici: 'Installed Cost',
  wSize: 'Width',
  hSize: 'Height',
  bSize: 'Bearing',
  tfSize: 'TF Depth',
  tfNailQty: 'TF Fasteners',
  fastenersProvided: 'Face Fasteners',
  jNailQty: 'Joist Fasteners',
  load: 'Download (lbs)',
  uplift: 'Uplift (lbs)',
}

const headers = Object.keys(headerMapping)

const Hanger: React.FC = () => {
  const [hangersData, setHangersData] = useState<any[]>([])

  const fetchHangerData = async () => {
    const data = await fetchData('./data/test-data.json')
    setHangersData(data)
  }

  useEffect(() => {
    fetchHangerData()
  }, [])

  console.log(hangersData)

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
