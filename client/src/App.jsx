import {  Container } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import React from 'react'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'

const App = () => {
  return (
    <Container maxW='620px'>
      <Routes>
        <Route path='/:username' element={<UserPage/>}/>
        <Route path='/:username/post/:pId' element={<PostPage/>}/>
      </Routes>
    </Container>
  )
}

export default App