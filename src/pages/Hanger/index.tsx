import React, { useState } from 'react'
import Button from '../../components/button/Button'
import Search from '../../components/search/Search'
import Navbar from '../../layouts/Navbar'
import PageContainer from '../../layouts/PageContainer'
import { HangerData } from '../../utils/constants'
import HangerTable from './HangerTable'
import './style.css'
import JobList from './components/JobList'

const Hanger: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Output' | 'JobList'>('Output')
  const [selectedRowData, setSelectedRowData] = useState<HangerData[]>([])
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  const handleButtonClick = () => {
    if (selectedRow !== null) {
      const selectedData = selectedRowData[selectedRow]

      setSelectedRowData([...selectedRowData, selectedData])
      setSelectedRow(null)
    }
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <ul className="tabs paneHeader">
          <li
            className={`tabs__label ${activeTab === 'Output' ? 'active' : ''}`}
            onClick={() => setActiveTab('Output')}
          >
            <Button>
              <div>Output</div>
            </Button>
          </li>
          <li
            className={`tabs__label ${activeTab === 'JobList' ? 'active' : ''}`}
            onClick={() => setActiveTab('JobList')}
          >
            <Button>
              <div>Job List</div>
            </Button>
          </li>
        </ul>
        <div className="output-result">
          {activeTab === 'Output' && (
            <>
              <div className="addJob">
                <Button
                  disabled={selectedRow === null}
                  onClick={handleButtonClick}
                >
                  Add to Job List
                </Button>
              </div>
              <div>
                <div className="tableInfoBar">
                  <Search onSearch={console.log} />
                </div>
              </div>
            </>
          )}
          <div style={{ margin: '14px 0' }}>
            {activeTab === 'Output' ? (
              <HangerTable
                selectedRowsData={selectedRowData}
                setSelectedRows={(selectedRows) =>
                  setSelectedRowData(selectedRows)
                }
                onRadioClick={(rowIndex) => setSelectedRow(rowIndex)}
                selectedRow={selectedRow}
              />
            ) : (
              <JobList
                selectedRowsData={selectedRowData}
                setSelectedRowsData={setSelectedRowData}
              />
            )}
          </div>
        </div>
      </PageContainer>
    </>
  )
}

export default Hanger
