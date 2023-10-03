import { createSlice } from "@reduxjs/toolkit";

export const lineSlice = createSlice({
    name: "lines",
    initialState: {
        LineLoad: false
    },
    reducers: {
        showLoading: (state) => {
            state.LineLoad = true
        }, hideLoading: (state) => {
            state.LineLoad = false
        }
    }
})

export const { showLoading, hideLoading } = lineSlice.actions