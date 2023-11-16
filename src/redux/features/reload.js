import { createSlice } from "@reduxjs/toolkit";

export const reloadSlice = createSlice({
    name: "reload",
    initialState: {
        reload: false
    },
    reducers: {
        showReload: (state) => {
            state.reload = !state.reload
        }
    }
})


export const { showReload } = reloadSlice.actions

// import { RELOAD } from '../action/action'
// const reload = (state = false, action) => {
//     switch (action.type) {
//         case RELOAD:
//             return state = !state
//         // break;

//         default:
//             return state;
//     }
// }

// export default reload;