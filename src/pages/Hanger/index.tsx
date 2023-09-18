import React, { useEffect, useState } from 'react'
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
  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    if (selectedRowId !== null) {
      const selectedData = modifiedData[selectedRowId]

      // Set the index property
      selectedData.index = selectedRowId
      setSelectedRowsData([...selectedRowsData, selectedData])
      setSelectedRowId(null)
    }
  }

  const handleEditClick = (rowIndex: number) => {
    // Switch to HangerTable tab and set edit mode to true
    setActiveTab('Output')
    setEditMode(true)

    // Set selectedRowId to the original index
    setSelectedRowId(rowIndex)
  }

  const handleEditSave = (rowIndex: number) => {
    // Switch to JobList tab and set edit mode to false
    if (selectedRowId !== null) {
      const selectedData = modifiedData[selectedRowId]
      selectedData.index = selectedRowId

      // get item from localStorage
      const editedData = localStorage.getItem('selectedData')

      // Update the selectedRowsData with the editedData
      if (editedData) {
        const parsedEditedData = JSON.parse(editedData)
        console.log(parsedEditedData)

        const updatedSelectedRowsData = [...selectedRowsData]

        console.log('updatedSelectedRowsData', updatedSelectedRowsData)
        const index = updatedSelectedRowsData.findIndex(
          (data) => data['index'] === parsedEditedData['index']
        )

        console.log('index', index)

        if (index !== -1) {
          updatedSelectedRowsData[index] = selectedData
          setSelectedRowsData(updatedSelectedRowsData)
        }
      }
    }

    setEditMode(false)
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
                    disabled={selectedRowId === null || editMode}
                    onClick={handleButtonClick}
                  >
                    Add to Job List
                  </Button>
                  {editMode && selectedRowId !== null && (
                    <Button
                      onClick={() => {
                        setSelectedRowId(selectedRowId)
                        handleEditSave(selectedRowId)
                      }}
                    >
                      Edit
                    </Button>
                  )}
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
                  onEditClick={handleEditClick}
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
