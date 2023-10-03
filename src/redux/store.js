import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/indexSlice";
import { userSlice } from "./features/userSlice";
import { lineSlice } from "./features/lineIoad";

export default configureStore({
    reducer: {
        alerts: alertSlice.reducer,
        user: userSlice.reducer,
        lines: lineSlice.reducer
    }
})