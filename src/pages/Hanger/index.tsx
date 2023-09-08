import React, { useState } from 'react'
import Button from '../../components/button/Button'
import Search from '../../components/search/Search'
import { SelectedRowProvider } from '../../contexts/SelectedRowContext'
import Navbar from '../../layouts/Navbar'
import PageContainer from '../../layouts/PageContainer'
import { HangerData } from '../../utils/constants'
import HangerTable from './HangerTable'
import './style.css'

const Hanger: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Output' | 'JobList'>('Output')
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [selectedRowData, setSelectedRowData] = useState<HangerData | null>(
    null
  )

  const handleAddToJobListClick = () => {
    if (selectedRow !== null && selectedRowData !== null) {
      console.log('Selected Row Data:', selectedRowData)
    }
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <SelectedRowProvider>
          <ul className="tabs paneHeader">
            <li
              className={`tabs__label ${
                activeTab === 'Output' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('Output')}
            >
              <Button>
                <div>Output</div>
              </Button>
            </li>
            <li
              className={`tabs__label ${
                activeTab === 'JobList' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('JobList')}
            >
              <Button>
                <div>Job List</div>
              </Button>
            </li>
          </ul>
          <div className="output-result">
            <div className="addJob">
              <Button
                onClick={handleAddToJobListClick}
                disabled={selectedRow === null}
              >
                Add to Job List
              </Button>
            </div>
            <div>
              <div className="tableInfoBar">
                <Search onSearch={console.log} />
              </div>
              <div>
                <HangerTable
                  setSelectedRow={(rowIndex, rowData) => {
                    setSelectedRow(rowIndex)
                    setSelectedRowData(rowData)
                  }}
                />
              </div>
            </div>
          </div>
        </SelectedRowProvider>
      </PageContainer>
    </>
  )
}

export default Hanger
