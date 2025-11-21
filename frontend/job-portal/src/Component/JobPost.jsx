import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllJobsError, postJob, resetJobSlice } from "../Store/slice/jobSlices";
import { toast } from "react-toastify";
import { CiCircleInfo } from "react-icons/ci";

const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [salary, setSalary] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [offers, setOffers] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const techFields = [
    "Web Development",
    "App Development",
    "Artificial Intelligence (AI)",
    "Machine Learning (ML)",
    "Data Science",
    "Cloud Computing",
    "Cybersecurity",
    "Blockchain Development",
    "Internet of Things (IoT)",
    "DevOps",
    "Game Development",
    "AR/VR (Augmented & Virtual Reality)",
    "UI/UX Design",
    "Software Testing & QA",
    "Embedded Systems",
    "Robotics",
    "Big Data Engineering",
    "Database Management",
    "Full Stack Development",
    "Automation & RPA",
  ];

  const cities = [
    "Bengaluru",
    "Hyderabad",
    "Pune",
    "Chennai",
    "Gurugram",
    "Noida",
    "Mumbai",
    "Kolkata",
    "Ahmedabad",
    "Kochi",
    "Trivandrum",
    "Indore",
    "Chandigarh",
    "Jaipur",
    "Nagpur",
    "Coimbatore",
    "Vadodara",
    "Bhubaneswar",
    "Lucknow",
  ];

  const handlePostJob = (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("responsibilities", responsibilities);
    formData.append("qualifications", qualifications);
    formData.append("salary", salary);
    formData.append("jobNiche", jobNiche);
    formData.append("introduction", introduction);
    offers && formData.append("offers", offers);
    hiringMultipleCandidates &&
      formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
    personalWebsiteTitle &&
      formData.append("personalWebsiteTitle", personalWebsiteTitle);
    personalWebsiteUrl &&
      formData.append("personalWebsiteUrl", personalWebsiteUrl);

    dispatch(postJob(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobsError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
  }, [dispatch, error, loading, message]);
  return (
    <div className="account_components">
      <h3>Post A Job</h3>

      <div>
        <label>Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
        />
      </div>
      <div>
        <label>Job Type</label>
        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
        </select>
      </div>
      <div>
        <label>Location (City)</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select Job City</option>
          {cities.map((element) => {
            return <option value={element}>{element}</option>;
          })}
        </select>
      </div>
      <div>
        <label>Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
        />
      </div>
      <div>
        <label>Company/Job Introduction</label>
        <textarea
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          rows={7}
          placeholder="Company/Job Introduction"
        />
      </div>
      <div>
        <label>Responsibilities</label>
        <textarea
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          rows={7}
          placeholder="Job Responsibilities"
        />
      </div>
      <div>
        <label>Qualifications</label>
        <textarea
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          rows={7}
          placeholder="Required Qulifications For Job"
        />
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label>What We Offers</label>
          <span>
            <CiCircleInfo /> Optional
          </span>
        </div>
        <textarea
          value={offers}
          onChange={(e) => setOffers(e.target.value)}
          rows={7}
          placeholder="What are we offering in return.!"
        />
      </div>
      <div>
        <label>Job Niche</label>
        <select value={jobNiche} onChange={(e) => setJobNiche(e.target.value)}>
          <option value="">Select Job Niche</option>
          {techFields.map((element) => {
            return <option value={element}>{element}</option>;
          })}
        </select>
      </div>
      <div>
        <label>Salary</label>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="50000 - 80000"
        />
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label>Hiring Multiple Candidates</label>
          <span>
            <CiCircleInfo /> Optional
          </span>
        </div>
        <select
          value={hiringMultipleCandidates}
          onChange={(e) => setHiringMultipleCandidates(e.target.value)}
        >
          <option value="">Hiring Multiple Candidates?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label>Personal Website Name</label>
          <span>
            <CiCircleInfo /> Optional
          </span>
        </div>
        <input
          type="text"
          value={personalWebsiteTitle}
          onChange={(e) => setPersonalWebsiteTitle(e.target.value)}
          placeholder="Personal Website Name"
        />
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label>Personal Website Url</label>
          <span>
            <CiCircleInfo /> Optional
          </span>
        </div>
        <input
          type="text"
          value={personalWebsiteUrl}
          onChange={(e) => setPersonalWebsiteUrl(e.target.value)}
          placeholder="Personal Website Link (URL)"
        />
      </div>
      <div>
        <button
          style={{ margin: "0 auto" }}
          className="btn"
          onClick={handlePostJob}
          disabled={loading}
        >
          Post Job
        </button>
      </div>
    </div>
  );
};

export default JobPost;
