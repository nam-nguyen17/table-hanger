/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-useless-concat */
import React from 'react'
import Table from '../../../components/table/Table'
import { SelectedRow } from '../../../utils/constants'
import './style.css'

type JobListProps = {
  selectedRowsData: SelectedRow[]
  setSelectedRowsData: (selectedRows: SelectedRow[]) => void
  onEditClick: (rowIndex: number) => void
}

const headerMapping = {
  '': '',
  Job: 'Job',
  model: 'Model',
  Quantity: 'Quantity',
  tfNailQty: 'TF Fasteners',
  hNailQty: 'Face Fasteners',
  jNailQty: 'Joist Fasteners',
  Delete: '',
}

const headers = Object.keys(headerMapping)

const JobList: React.FC<JobListProps> = ({
  selectedRowsData,
  setSelectedRowsData,
  onEditClick,
}) => {
  const handleDeleteClick = (rowIndex: number) => {
    const updatedRowsData = [...selectedRowsData]
    updatedRowsData.splice(rowIndex, 1)
    setSelectedRowsData(updatedRowsData)
  }

  return (
    <Table
      headers={headers}
      data={selectedRowsData.map((row) => row.data)}
      headerMapping={headerMapping}
      cellRenderer={(row, header, rowIndex) => {
        if (header === '') {
          return (
            <button
              type="button"
              onClick={() => onEditClick(selectedRowsData[rowIndex].index)}
            >
              Edit
            </button>
          )
        } else if (header === 'Delete') {
          return (
            <a role="button" onClick={() => handleDeleteClick(rowIndex)}>
              <svg
                width="15"
                height="20"
                viewBox="0 0 15 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.07143 17.7778C1.07143 19 2.03571 20 3.21429 20H11.7857C12.9643 20 13.9286 19 13.9286 17.7778V4.44444H1.07143V17.7778ZM15 1.11111H11.25L10.1786 0H4.82143L3.75 1.11111H0V3.33333H15V1.11111Z"
                  fill="#A8671D"
                ></path>
                <path d="M1.07143 17.7778C1.07143 19 2.03571 20 3.21429 20H11.7857C12.9643 20 13.9286 19 13.9286 17.7778V4.44444H1.07143V17.7778ZM15 1.11111H11.25L10.1786 0H4.82143L3.75 1.11111H0V3.33333H15V1.11111Z"></path>
              </svg>
            </a>
          )
        } else if (header === 'Job') {
          return 'Job' + ' ' + (rowIndex + 1)
        } else if (header === 'Quantity') {
          return 1
        } else {
          return row[header]
        }
      }}
    ></Table>
  )
}

export default JobList
