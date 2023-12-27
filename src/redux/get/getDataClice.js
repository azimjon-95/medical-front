import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api"; // API ni chaqiradigan modul

let initialState = {
  loading: false,
  data: [],
  error: "",
};

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return await axios
    .get("/dailiyReports/doctorsMoney")
    .then((response) => response.data);
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
