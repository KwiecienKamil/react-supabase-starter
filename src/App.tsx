import { useEffect, useState } from 'react'
import './App.css'
import supabase from './utils/supabase'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

type User = {
  id: string
  email: string
  created_at: string
}

function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
  const getUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')

    if (error) {
      console.error(error)
      return
    }

    if (data && data.length > 0) {
      setUsers(data)
    }
  }

  getUsers()
}, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </>
  )
}

export default App
