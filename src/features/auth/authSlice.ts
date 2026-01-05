import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../utils/supabase";
import type { Session } from "@supabase/supabase-js";

export type AuthState = {
  session: Session | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  session: null,
  loading: false,
  error: null,
};

export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return thunkAPI.rejectWithValue(error.message);
    return data.session;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await supabase.auth.signOut();
  return null;
});

export const registerWithEmail = createAsyncThunk(
  "auth/registerWithEmail",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    console.log(email, password);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return thunkAPI.rejectWithValue(error.message);

    if (data.user) {
      const { id } = data.user;
      const { error: insertError } = await supabase
        .from("users")
        .insert([{ id, email }]);

      if (insertError) {
        return thunkAPI.rejectWithValue(insertError.message);
      }
    }
    return data.session;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action) {
      state.session = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload;
      })
      .addCase(registerWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.session = null;
      });
  },
});

export const { setSession } = authSlice.actions;
export default authSlice.reducer;
