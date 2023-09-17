import React, { useMemo, useState } from 'react'
import Button from '../../components/button/Button'
import Search from '../../components/search/Search'
import { useSelectRowContext } from '../../contexts/SelectRowContext'
import Navbar from '../../layouts/Navbar'
import PageContainer from '../../layouts/PageContainer'
import { HangerData, SelectedRow } from '../../utils/constants'
import { filterData } from '../../utils/helpers'
import HangerTable from './HangerTable'
import JobList from './components/JobList'
import './style.css'

const Hanger: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Output' | 'JobList'>('Output')
  const { selectedRowId, setSelectedRowId } = useSelectRowContext()
  const [modifiedData, setModifiedData] = useState<HangerData[]>([])
  const [selectedRowsData, setSelectedRowsData] = useState<SelectedRow[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [editMode, setEditMode] = useState(false)

  const updateModifiedData = (newModifiedData: HangerData[]) => {
    setModifiedData(newModifiedData)
  }

  // filteredData is the data that is filtered by the search query
  const filteredData = useMemo(() => {
    return filterData<HangerData>(modifiedData, searchQuery, [
      'model',
      'wSize',
      'hSize',
      'bSize',
      'tfSize',
      'tfNailQty',
      'hNailQty',
      'jNailQty',
      'load',
      'uplift',
      'ici',
      'tfNailType',
      'hNailType',
      'jNailType',
    ])
  }, [searchQuery, modifiedData])

  const handleButtonClick = () => {
    if (selectedRowId !== null) {
      const selectedData = modifiedData[selectedRowId]
      setSelectedRowsData([
        ...selectedRowsData,
        { data: selectedData, index: selectedRowId },
      ])
      setSelectedRowId(null)
    }
  }

  const handleEditClick = (rowIndex: number) => {
    // Switch to HangerTable tab and set edit mode to true
    setActiveTab('Output')
    setEditMode(true)
    setSelectedRowId(rowIndex)
  }

  const handleRowReSelect = (rowIndex: number) => {
    setSelectedRowId(rowIndex)
    setEditMode(false)

    if (selectedRowId !== null) {
      const selectedData = modifiedData[selectedRowId]
      setSelectedRowsData([{ data: selectedData, index: selectedRowId }])
      setSelectedRowId(null)
    }
  }

  console.log('selectedRowId', selectedRowId)

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
                        handleRowReSelect(selectedRowId)
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </div>
                <div>
                  <div className="tableInfoBar">
                    <Search onSearch={setSearchQuery} />
                  </div>
                </div>
              </>
            )}
            <div style={{ margin: '14px 0' }}>
              {activeTab === 'Output' ? (
                <HangerTable
                  updateModifiedData={updateModifiedData}
                  filteredData={filteredData}
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
