import { createSlice, combineReducers } from "@reduxjs/toolkit";

// Définition de l'état initial pour le reducer user
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

// Création du slice pour le reducer user
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      console.log(state.token);
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    getProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    },
    getProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    updateProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    },
    updateProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.isLoading = false;
      state.user = null;
      state.token = null;
    },
  },
});

// Extraction des actions générées par le slice user
export const {
  startRequest,
  loginSuccess,
  loginFailure,
  getProfileSuccess,
  getProfileFailure,
  updateProfileSuccess,
  updateProfileFailure,
  logout,
} = userSlice.actions;


export default userSlice.reducer;
