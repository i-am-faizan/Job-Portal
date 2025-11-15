import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const jobSlice = createSlice({
    name: "jobs",
    initialState:{
        jobs : [],
        loading: false,
        error: null,
        message: null,
        singleJob: {},
        myJobs: []
    },
    reducers:{
        requestForAllJob(state, action){
            state.loading = true;
            state.error = null
        },
        successForAllJobs(state,action){
            state.loading = false;
            state.jobs = action.payload;
            state.error = null;
        },
        failureForAllJobs(state,action){
            state.loading=false;
            state.error= action.payload;
        },
        clearAllErrors(state,action){
            state.error= null;
            state.jobs= state.jobs;
        },
        requestSingleJob(state,action){
            state.loading = true;
            state.error = null;
            state.message = null
        },
        successSingleJob(state,action){
            state.loading = false;
            state.error = null;
            state.singleJob = action.payload;
        },
        failureSingleJob(state,action){
            state.loading = true;
            state.error = action.payload;
            state.singleJob = state.singleJob ;
        },
        resetJobSlice(state,action){
            state.jobs= state.jobs;
            state.loading= false;
            state.error = null;
            state.message= null;
            state.singleJob = {};
            state.myJobs = state.myJobs;
        },
    },
});

export const fetchJobs =(city, niche, searchKeyword = "")=>async(dispatch)=>{
    try {
        dispatch(jobSlice.actions.requestForAllJob());
        let link = "http://localhost:4000/api/v1/job/getall?";
        let queryParams = [];
        if(searchKeyword){
            queryParams.push(`searchKeyword=${searchKeyword}`)
        };
        if(city){
            queryParams.push(`city=${city}`)
        };
        if(niche){
            queryParams.push(`niche=${niche}`)
        };
        link+= queryParams.join("&") 
        const response = await axios.get(link,{withCredentials: true});
        dispatch(jobSlice.actions.successForAllJobs(response.data.jobs))
        dispatch(jobSlice.actions.clearAllErrors())
    } catch (error) {        
        dispatch(jobSlice.actions.failureForAllJobs(error.response.data.message))
    }
    
};

export const fetchSingleJob = (jobId) => async(dispatch)=>{
    dispatch(jobSlice.actions.requestSingleJob())
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/job/get/${jobId}`,{
            withCredentials:true
        })
        dispatch(jobSlice.actions.successSingleJob(response.data.job));
        dispatch(jobSlice.actions.clearAllErrors());
    } catch (error) {        
        dispatch(jobSlice.actions.failureSingleJob(error.response.data.message))
    }
}

export const clearAllJobsError = () =>(dispatch)=>{
    dispatch(jobSlice.actions.clearAllErrors())
}

export const resetJobSlice = ()=>(dispatch)=>{
    dispatch(jobSlice.actions.resetJobSlice())
};

export default jobSlice.reducer;