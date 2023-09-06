import React from 'react'
import Navbar from '../layouts/Navbar'
import PageContainer from '../layouts/PageContainer'

const Dashboard: React.FC = () => {
  return (
    <>
      <Navbar />
      <PageContainer>
        <h1>Welcome to the Dashboard Page</h1>
        <p>This is the main content of your Dashboard page.</p>
      </PageContainer>
    </>
  )
}

export default Dashboard
