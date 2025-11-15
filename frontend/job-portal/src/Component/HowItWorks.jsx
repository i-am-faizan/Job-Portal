import React from 'react'
import {LuUserPlus} from "react-icons/lu"
import {BiSolidLike} from "react-icons/bi"
import {VscTasklist} from "react-icons/vsc"

const HowItWorks = () => {
  return (
    <section className="howItWorks">
      <h3>How does it work?</h3>
      <div className="container">
        <div className="card">
          <div className="icon">
            <LuUserPlus/>
          </div>
          <h4>Create an Account</h4>
          <p>
            Sign up for free account as a job seeker or employer. Set up your profile in minutes to start posting jobs or applying for jobs. Customize your profile to highlight your skills or requirements.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <VscTasklist/>
          </div>
          <h4>Post or Browse Jobs</h4>
          <p>
            Sign up for free account as a job seeker or employer. Set up your profile in minutes to start posting jobs or applying for jobs. Customize your profile to highlight your skills or requirements.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <BiSolidLike/>
          </div>
          <h4>Hire or Get Hired</h4>
          <p>
            Sign up for free account as a job seeker or employer. Set up your profile in minutes to start posting jobs or applying for jobs. Customize your profile to highlight your skills or requirements.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks