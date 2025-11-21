import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from "react-toastify"
import { clearAllApplicationErrors, deleteApplication, fetchEmployerApplictions, resetApplicationSlice } from '../Store/slice/applicationSlice';
import Spinner from './Spinner';
import { LuHeading1 } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Application = () => {
  const {applications, loading, error, message} = useSelector((state)=> state.applications);

  const dispatch = useDispatch()
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplictions());
  },[dispatch, error, message]);

  const handleDeleteApplication = (id) =>{
    dispatch(deleteApplication(id));
  }

  return (
    <>
    {
      loading ? ( <Spinner/>) : (
        applications && applications <= 0 ? <h1>You have no appications from job seeker.</h1> :
         <>
          <div className="account_components">
            <h3>Applications For Your Posted Jobs</h3>
            <div className="applications_container">
              {applications.map((element) => {
                return (
                  <div className="card" key={element._id}>
                    <p className="sub-sec">
                      <span>Job Title: </span> {element.jobInfo.jobTitle}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's Name: </span> {element.jobSeekerInfo.name}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's Email: </span> {element.jobSeekerInfo.email}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's Phone: </span> {element.jobSeekerInfo.phone}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's Address: </span> {element.jobSeekerInfo.address}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's Coverletter: </span>
                      {element.jobSeekerInfo.coverLetter}
                      <textarea
                        value={element.jobSeekerInfo.coverLetter}
                        rows={5}
                        disabled
                      ></textarea>
                    </p>
                    <div className="btn-wrapper">
                      <button
                        className="outline_btn"
                        onClick={() => handleDeleteApplication(element._id)}
                      >
                        Delete Applicationn
                      </button>
                      <Link
                        to={
                          element.jobSeekerInfo &&
                          element.jobSeekerInfo.resume.url
                        }
                        className="btn"
                        target="_blank"
                      >
                        View Resume
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
        
      )
    }
    </>
  )
}

export default Application