import {  Container } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import React from 'react'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './Components/Header'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <Container maxW='620px'>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/:username' element={<UserPage/>}/>
        <Route path='/:username/post/:pId' element={<PostPage/>}/>
      </Routes>
    </Container>
  )
}

export default App