import React from 'react'
import Navbar from '../layouts/Navbar'
import PageContainer from '../layouts/PageContainer'
import SplitPane from '../components/splitPane/SplitPane'
import Hanger from './Hanger'

const Main = () => {
  return (
    <>
      <Navbar />
      <PageContainer>
        <SplitPane>
          <div>Input</div>
          <div>
            <Hanger />
          </div>
        </SplitPane>
      </PageContainer>
    </>
  )
}

export default Main
