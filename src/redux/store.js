import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { alertSlice } from "./features/indexSlice";
import { userSlice } from "./features/userSlice";
import { lineSlice } from "./features/lineIoad";
import { reloadSlice } from "./features/reload";
import setInfo from "./recordList/recordList";
import { api } from "./api";

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
    lines: lineSlice.reducer,
    reload: reloadSlice.reducer,
    recordList: setInfo,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
