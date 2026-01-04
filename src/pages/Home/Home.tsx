import { useNavigate } from "react-router-dom"
import supabase from "../../utils/supabase"


const Home = () => {
  const navigate = useNavigate()


   const signOut = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", textAlign: "center" }}>
      <h1>Witaj w aplikacji!</h1>
      <button onClick={signOut} style={{ padding: "10px 20px", fontSize: 16 }}>
        Wyloguj się
      </button>
    </div>
  )
}

export default Home
