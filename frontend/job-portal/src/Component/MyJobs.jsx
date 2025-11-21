import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import {toast} from "react-toastify" 
import { clearAllJobsError, deleteJob, getMyJobs, resetJobSlice } from '../Store/slice/jobSlices'
import Spinner from "./Spinner"
import { LuHeading1 } from 'react-icons/lu'
  
const MyJobs = () => {
  const {myJobs, loading, error, message} = useSelector((state)=> state.jobs)
  const dispatch = useDispatch();

  useEffect(()=>{
    if (error){
      toast.error(error);
      dispatch(clearAllJobsError());
    }
    if(message){
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  },[dispatch,error,message])

  const handleDeleteJob =(id) =>{
    dispatch(deleteJob(id));
  }
  return (
    <>
    {
      loading?  (<Spinner/>) : (
        myJobs && myJobs.lenght <= 0 ? (
          <h1 style={{fontSize:"1.4rem", fontWeight:"600"}}>You have not posted any job!</h1>
        ) : (
          <>
          <div className="account_components">
            <h3>My Jobs</h3>
            <div className="applications_container">
              {
                myJobs.map((element)=>{
                  return (
                    <div className="card" key={element._id}>
                      <p className='sub-sec'>
                        <span></span>
                      </p>
                      <p className='sub-sec'>
                        <span>Job Title: </span>{element.title}
                      </p>
                      <p className='sub-sec'>
                        <span>Job Niche: </span>{element.jobNiche}
                      </p>
                      <p className='sub-sec'>
                        <span>Salary: </span>{element.salary}
                      </p>
                      <p className='sub-sec'>
                        <span>Location: </span>{element.location}
                      </p>
                      <p className='sub-sec'>
                        <span>Job type: </span>{element.jobType}
                      </p>
                      <p className='sub-sec'>
                        <span>Company Name: </span>{element.companyName}
                      </p>
                      <p className='sub-sec'>
                        <span>Qualification: </span>{element.qualifications}
                      </p>
                      <p className='sub-sec'>
                        <span>Responsibilities: </span>{element.responsibilities}
                      </p>
                      {
                        element.offers && (
                      <p className='sub-sec'>
                        <span>Offers: </span>{element.offers}
                      </p>
                        )
                      }
                      <button className='btn' onClick={()=> handleDeleteJob(element._id)}>
                        Delete Job
                      </button>
                    </div>
                  )
                })
              }
            </div>
          </div>
          </>
        )
      )
    }
    </>
  )
}

export default MyJobs