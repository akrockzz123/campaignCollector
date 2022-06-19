import React from 'react'
import { Container } from 'semantic-ui-react'

import { Header } from './Header.js'

export const Layout = ({children}) => {
  return (
    <Container>
      <Header/>
        {children}
        
    </Container>
  )
}
