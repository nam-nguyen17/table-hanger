import React, { useRef, useState } from 'react'
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
  const [rowData, setRowData] = useState<HangerData[]>([])
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
  const [selectedRowsData, setSelectedRowsData] = useState<HangerData[]>([])

  const handleButtonClick = () => {
    if (selectedRowId !== null) {
      const selectedData = selectedRowsData[selectedRowId]

      setRowData([...rowData, selectedData])
      setSelectedRowId(null)
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
              <div>Job List ({rowData.length})</div>
            </Button>
          </li>
        </ul>
        <div className="output-result">
          {activeTab === 'Output' && (
            <>
              <div className="addJob">
                <Button
                  disabled={selectedRowId === null}
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
                rowsData={rowData}
                setSelectedRows={(selectedRows) => setRowData(selectedRows)}
                selectedRowId={selectedRowId}
                selectedRowData={selectedRowsData}
                setSelectedRowsData={setSelectedRowsData}
                onRadioClick={(rowIndex) => setSelectedRowId(rowIndex)}
              />
            ) : (
              <JobList
                selectedRowsData={selectedRowsData}
                setSelectedRowsData={setSelectedRowsData}
              />
            )}
          </div>
        </div>
      </PageContainer>
    </>
  )
}

export default Hanger
