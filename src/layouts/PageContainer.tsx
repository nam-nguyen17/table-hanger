import React, { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <main>{children}</main>
}

export default PageContainer
