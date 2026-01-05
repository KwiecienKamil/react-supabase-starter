import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerWithEmail } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useAppDispatch();
  const { loading, error, session } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (session) {
    navigate("/");
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerWithEmail({ email: email.trim(), password }));
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", textAlign: "center" }}>
      <h2>Rejestracja</h2>

      <form onSubmit={handleRegister} style={{ marginTop: 20 }}>
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
          {loading ? "Rejestracja..." : "Zarejestruj się"}
        </button>

        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
