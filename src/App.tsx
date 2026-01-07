import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "./store";
import { setSession } from "./features/auth/authSlice";
import type { Session } from "@supabase/supabase-js";
import supabase from "./utils/supabase";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const session = useSelector((state: RootState) => state.auth.session);

  useEffect(() => {
  const initAuth = async () => {
    const { data, error } = await supabase.auth.getSession();
    if(error) {
      console.error(error)
    }
    dispatch(setSession(data.session as Session | null));
  };

  initAuth();

  const { data: { subscription } } =
    supabase.auth.onAuthStateChange((event, session) => {
      dispatch(setSession(session as Session | null));
    });

  return () => subscription.unsubscribe();
}, [dispatch]);

  useEffect(() => {
    if (session && window.location.pathname !== "/") {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={ <Home session={session} />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={session ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </>
  );
}

export default App;
