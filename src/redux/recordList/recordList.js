import { createSlice } from "@reduxjs/toolkit";

export const RecordListSlice = createSlice({
  name: "recordList",
  initialState: {
    info: "",
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { setInfo } = RecordListSlice.actions;
export default RecordListSlice.reducer;
