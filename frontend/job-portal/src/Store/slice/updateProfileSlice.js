import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const updateProfilSlice = createSlice({
  name: "updateProfile",
  initialState: {
    loading: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    updateProfileRequest(state, action) {
      state.loading = true;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.isUpdated = true;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false;
    },
    updatePasswordRequest(state, action) {
      state.loading = true;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.isUpdated = true;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false;
    },
    profileResetAfterUpdate(state, action) {
      state.loading = false;
      state.error = null;
      state.isUpdated = false;
    },
  },
});

export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateProfilSlice.actions.updateProfileRequest());
  try {
    const response = await axios.put(
      "http://localhost:4000/api/v1/user/update/profile",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(updateProfilSlice.actions.updateProfileSuccess());
  } catch (error) {
    dispatch(
      updateProfilSlice.actions.profileResetAfterUpdate(
        error.response.data.message || "Failed to update profile"
      )
    );
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(updateProfilSlice.actions.updatePasswordRequest());
  try {
    const response = await axios.put(
      "http://localhost:4000/api/v1/user/update/password",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(updateProfilSlice.actions.updatePasswordSuccess());
  } catch (error) {
    dispatch(
      updateProfilSlice.actions.updatePasswordFailed(
        error.response.data.message || "Failed to update password"
      )
    );
  }
};
export const clearAllprofileUpdateError = () => (dispatch) => {
  dispatch(updateProfilSlice.actions.profileResetAfterUpdate());
};

export default updateProfilSlice.reducer;
