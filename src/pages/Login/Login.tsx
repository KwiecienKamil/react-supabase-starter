import React from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../../utils/supabase'

const Login = () => {
  const navigate = useNavigate()


  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/", 
      },
    })
    if (error) {
      alert("Błąd logowania: " + error.message)
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", textAlign: "center" }}>
      <h2>Zaloguj się przez Google</h2>
      <button onClick={signInWithGoogle} style={{ padding: "10px 20px", fontSize: 16 }}>
        Sign in with Google
      </button>
    </div>
  )
}

export default Login
