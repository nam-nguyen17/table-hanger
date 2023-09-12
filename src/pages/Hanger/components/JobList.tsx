/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react'
import { HangerData } from '../../../utils/constants'
import TableHeader from '../../../components/table/TableHeader'
import './style.css'

type JobListProps = {
  selectedRowsData: HangerData[]
  setSelectedRowsData: (selectedRows: HangerData[]) => void
}

const headerMapping = {
  '': '',
  model: 'Model',
  quantity: 'Quantity',
  tfNailQty: 'TF Fasteners',
  hNailQty: 'Face Fasteners',
  jNailQty: 'Joist Fasteners',
  Delete: '',
}

const headers = Object.keys(headerMapping)

const JobList: React.FC<JobListProps> = ({
  selectedRowsData,
  setSelectedRowsData,
}) => {
  const handleDeleteClick = (rowIndex: number) => {
    const updatedRowsData = [...selectedRowsData]
    updatedRowsData.splice(rowIndex, 1)

    setSelectedRowsData(updatedRowsData)
  }

  const calculateFastenerTotals = () => {
    const fastenerTotalsMap = new Map<string, number>()

    selectedRowsData.forEach((row) => {
      addToFastenerTotalsMap(fastenerTotalsMap, row.tfNailQty as string)
      addToFastenerTotalsMap(fastenerTotalsMap, row.hNailQty as string)
      addToFastenerTotalsMap(fastenerTotalsMap, row.jNailQty as string)
    })
    console.log(fastenerTotalsMap)

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

  return (
    <table role="table" className="table">
      <TableHeader headers={headers} headerMapping={headerMapping} />
      <tbody role="rowgroup" className="table body">
        {selectedRowsData.map((row, rowIndex) => (
          <tr role="row" key={rowIndex} className="table row">
            <td role="cell">
              <button type="button">Edit</button>
            </td>
            <td role="cell">{row.model}</td>
            <td role="cell">1</td>
            <td role="cell">{row.tfNailQty}</td>
            <td role="cell">{row.hNailQty}</td>
            <td role="cell">{row.jNailQty}</td>
            <td role="cell">
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
            </td>
          </tr>
        ))}
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
      </tbody>
    </table>
  )
}

export default JobList
