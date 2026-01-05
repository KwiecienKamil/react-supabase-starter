import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginWithEmail } from "../../features/auth/authSlice";
import supabase from "../../utils/supabase";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) alert("Błąd logowania: " + error.message);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginWithEmail({ email, password }));
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", textAlign: "center" }}>
      <h2>Logowanie</h2>

      <button
        onClick={signInWithGoogle}
        style={{ padding: 10, marginBottom: 20 }}
      >
        Zaloguj przez Google
      </button>
      <hr />

      <form onSubmit={handleEmailLogin} style={{ marginTop: 20 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />

        <button type="submit" disabled={loading} style={{ padding: 10 }}>
          {loading ? "Logowanie..." : "Zaloguj"}
        </button>

        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      </form>
      <div>
        Nie masz konta? <Link to="/register">Zarejestruj się</Link>
      </div>
    </div>
  );
};

export default Login;
