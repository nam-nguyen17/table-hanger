/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-useless-concat */
import React from 'react'
import { HangerData } from '../../../utils/constants'
import Table from '../../../components/table/Table'
import './style.css'

type JobListProps = {
  selectedRowsData: HangerData[]
  setSelectedRowsData: (selectedRows: HangerData[]) => void
  onEditClick: (rowIndex: number) => void
}

const headerMapping = {
  '': '',
  model: 'Model',
  Quantity: 'Quantity',
  wSize: 'Width',
  tfFastenerDisplay: 'TF Fasteners',
  fFastenerDisplay: 'Face Fasteners',
  jFastenerDisplay: 'Joist Fasteners',
  Delete: '',
}

const headers = Object.keys(headerMapping)

const JobListTable: React.FC<JobListProps> = ({
  selectedRowsData,
  setSelectedRowsData,
  onEditClick,
}) => {
  const handleDeleteClick = (rowIndex: number) => {
    const updatedRowsData = [...selectedRowsData]
    updatedRowsData.splice(rowIndex, 1)
    setSelectedRowsData(updatedRowsData)
  }

  const calculateFastenerTotals = () => {
    const fastenerTotalsMap = new Map<string, number>()

    selectedRowsData.forEach((row) => {
      addToFastenerTotalsMap(fastenerTotalsMap, row.tfFastenerDisplay as string)
      addToFastenerTotalsMap(fastenerTotalsMap, row.fFastenerDisplay as string)
      addToFastenerTotalsMap(fastenerTotalsMap, row.jFastenerDisplay as string)
    })

    return fastenerTotalsMap
  }

  const addToFastenerTotalsMap = (
    fastenerTotalsMap: Map<string, number>,
    inputString: string
  ) => {
    const match = inputString.match(/\((\d+)\)\s*([^]*)/)

    if (match) {
      const numericPart = parseInt(match[1], 10)
      const textPart = match[2].trim()

      if (!isNaN(numericPart)) {
        if (fastenerTotalsMap.has(textPart)) {
          fastenerTotalsMap.set(
            textPart,
            fastenerTotalsMap.get(textPart)! + numericPart
          )
        } else {
          fastenerTotalsMap.set(textPart, numericPart)
        }
      }
    }
  }

  const fastenerTotalsMap = calculateFastenerTotals()

  const handleEditClick = (rowIndex: number) => {
    const selectedData = selectedRowsData[rowIndex]
    localStorage.setItem('selectedData', JSON.stringify(selectedData))
  }

  return (
    <Table
      headers={headers}
      data={selectedRowsData}
      headerMapping={headerMapping}
      cellRenderer={(row, header, rowIndex) => {
        if (header === '') {
          return (
            <button
              type="button"
              onClick={() => {
                handleEditClick(rowIndex)
                onEditClick(selectedRowsData[rowIndex].index)
              }}
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
    >
      <tr className="pseudoFooter">
        <td className="left" colSpan={4}></td>
        <td className="right" colSpan={10}>
          <div className="subTotalHead">Fastener Totals</div>
          <div className="subTotalData">
            {Array.from(fastenerTotalsMap).map(([textPart, numericPart]) => (
              <React.Fragment key={textPart}>
                ({numericPart}) {textPart}
                <br />
              </React.Fragment>
            ))}
          </div>
        </td>
      </tr>
    </Table>
  )
}

export default JobListTable
