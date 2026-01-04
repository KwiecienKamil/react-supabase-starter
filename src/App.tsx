import { useEffect, useState } from 'react'
import supabase from './utils/supabase'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import type { Session } from '@supabase/supabase-js'



function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setSession(session)
  }

  getSession()

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
  })

  return () => subscription.unsubscribe()
}, [])

console.log(session)


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
