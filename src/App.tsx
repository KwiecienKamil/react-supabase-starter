import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "./store";
import { setSession } from "./features/auth/authSlice";
import type { Session } from "@supabase/supabase-js";
import supabase from "./utils/supabase";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const session = useSelector((state: RootState) => state.auth.session);

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      dispatch(setSession(session as Session | null));
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session as Session | null));
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (session) {
      if (window.location.pathname === "/login") {
        navigate("/");
      }
    }
  }, [session, navigate]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={session ? <Home session={session} /> : <div>Loading...</div>}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
