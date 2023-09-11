import React from 'react'
import { HangerData } from '../../../utils/constants'
import Table from '../../../components/table/Table'

type JobListProps = {
  selectedRowsData: HangerData[]
}

const headerMapping = {
  '': '',
  model: 'Model',
  quantity: 'Quantity',
  tfNailQty: 'TF Fasteners',
  hNailQty: 'Face Fasteners',
  jNailQty: 'Joist Fasteners',
}

const headers = Object.keys(headerMapping)

const JobList: React.FC<JobListProps> = ({ selectedRowsData }) => {
  console.log('Job List:', selectedRowsData)
  return (
    <Table
      headers={headers}
      data={selectedRowsData}
      headerMapping={headerMapping}
      selectedRows={selectedRowsData}
    />
  )
}

export default JobList
