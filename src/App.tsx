import { useEffect, useState } from 'react'
import './App.css'
import supabase from './utils/supabase'

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
      console.log(data)
    }
  }

  getUsers()
}, [])


  return (
    <>
      {users.map((user : any) => (
        <p>{user}</p>
      ))}
       
    </>
  )
}

export default App
