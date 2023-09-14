import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchData } from '../utils/helpers'
import { EnumData, HangerData } from '../utils/constants'

type HangerDataContextProps = {
  hangersData: HangerData[]
  enumData: EnumData[]
  fetchHangerData: () => void
}

const HangerDataContext = createContext<HangerDataContextProps | undefined>(
  undefined
)

export const useHangerDataContext = () => {
  const context = useContext(HangerDataContext)
  if (!context) {
    throw new Error(
      'useHangerDataContext must be used within a HangerDataContextProvider'
    )
  }
  return context
}

export const HangerDataContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [hangersData, setHangersData] = useState<HangerData[]>([])
  const [enumData, setEnumData] = useState<EnumData[]>([])

  const fetchHangerData = async () => {
    const hangerData: HangerData[] = await fetchData('./data/test-data.json')
    const enumData: EnumData[] = await fetchData('./data/test-enum.json')

    setEnumData(enumData)
    setHangersData(hangerData)
  }

  useEffect(() => {
    fetchHangerData()
  }, [])

  return (
    <HangerDataContext.Provider
      value={{ hangersData, enumData, fetchHangerData }}
    >
      {children}
    </HangerDataContext.Provider>
  )
}
