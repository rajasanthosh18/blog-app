import React from 'react'
import Post from '../components/Post'
import Header from '../components/Header'
import {Routes,Route} from 'react-router-dom'
import Login from './Login'
import Layout from '../components/Layout'
import IndexPage from './IndexPage'
import RegistrationPage from './RegistrationPage'

const home = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<RegistrationPage/>} />
      </Route>
    </Routes>
  )
}

export default home