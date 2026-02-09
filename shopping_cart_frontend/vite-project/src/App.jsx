import {Routes,Route} from 'react-router-dom'
import Home from './webpage/Home'
import Dashboard from './webpage/Dashboard'
import Navbar from './webpage/Navbar'
import './App.css'

import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoute from './webpage/ProtectedRoute'

function App() {
 

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/signup" element={<Signup />} />

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>




    </Routes>

    </>
  )
}

export default App
