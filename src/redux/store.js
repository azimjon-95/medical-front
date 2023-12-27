import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/indexSlice";
import { userSlice } from "./features/userSlice";
import { lineSlice } from "./features/lineIoad";
import { reloadSlice } from "./features/reload";
import dataReducer from "./get/getDataClice";
import setInfo from "./recordList/recordList";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
    lines: lineSlice.reducer,
    reload: reloadSlice.reducer,
    data: dataReducer,
    recordList: setInfo,
  },
});
