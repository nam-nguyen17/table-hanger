import React, { useState } from 'react'
import Button from '../../components/button/Button'
import Search from '../../components/search/Search'
import Navbar from '../../layouts/Navbar'
import PageContainer from '../../layouts/PageContainer'
import { HangerData } from '../../utils/constants'
import HangerTable from './HangerTable'
import JobList from './components/JobList'
import './style.css'
import { useSelectRowContext } from '../../contexts/SelectRowContext'

const Hanger: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Output' | 'JobList'>('Output')
  const { selectedRowId, setSelectedRowId } = useSelectRowContext()
  const [modifiedData, setModifiedData] = useState<HangerData[]>([])
  const [selectedRowsData, setSelectedRowsData] = useState<HangerData[]>([])

  const handleButtonClick = () => {
    if (selectedRowId !== null) {
      const selectedData = modifiedData[selectedRowId]

      console.log('selectedData', selectedData)
      setModifiedData([...modifiedData, selectedData])
      setSelectedRowsData([...selectedRowsData, selectedData])
      setSelectedRowId(null)
    }
  }

  const updateModifiedData = (newModifiedData: HangerData[]) => {
    setModifiedData(newModifiedData)
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <div className="outputSectionWrapper">
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
                <div>Job List ({selectedRowsData.length})</div>
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
                  selectedRowData={selectedRowsData}
                  updateModifiedData={updateModifiedData}
                />
              ) : (
                <JobList
                  selectedRowsData={selectedRowsData}
                  setSelectedRowsData={setSelectedRowsData}
                />
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  )
}

export default Hanger
