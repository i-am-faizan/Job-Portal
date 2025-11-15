import {configureStore} from "@reduxjs/toolkit"
import jobReducer from "./slice/jobSlices"
import  useReducer  from "./slice/userSlice"
import applicationReducer from "./slice/applicationSlice"
import updateProfileReducer from "./slice/updateProfileSlice"

const store = configureStore({
    reducer:{
        jobs : jobReducer,
        user: useReducer,
        applications: applicationReducer,
        updateProfile: updateProfileReducer,
    }
})

export default store