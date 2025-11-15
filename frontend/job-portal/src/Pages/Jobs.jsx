import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { clearAllJobsError, fetchJobs } from '../Store/slice/jobSlices';
import { FaSearch } from "react-icons/fa"
import Spinner from '../Component/Spinner';
import {Link} from "react-router-dom"

const jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, error, loading } = useSelector((state) => state.jobs);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  }

  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobsError())
    }
    dispatch(fetchJobs(city, niche, searchKeyword))
  }, [dispatch, error, city, niche])

  const handleSeachKeyword = () => {
    dispatch(fetchJobs(city, niche, searchKeyword))
  }

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
    "Lucknow"
  ];

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
    "Automation & RPA"
  ];


  return (
    <>
      {
        loading ? <Spinner /> : (
          <section className='jobs'>
            <div className="search-tab-wrapper">
              <input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
              <button onClick={handleSeachKeyword}>Find Job</button>
              <FaSearch />
            </div>
            <div className="wrapper">
              <div className="filter-bar">
                <div className="cities">
                  <h2>Filter Job By City</h2>
                  {
                    cities.map((city, index) => {
                      return (
                        <div key={index}>
                          <input
                            type="radio"
                            id={city}
                            name='city'
                            value={city}
                            checked={selectedCity === city}
                            onChange={() => handleCityChange(city)}
                          />
                          <label htmlFor={city}>{city}</label>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="cities">
                  <h2>Filter Job By Niche</h2>
                  {
                    techFields.map((niche, index) => {
                      return (
                        <div key={index}>
                          <input
                            type="radio"
                            id={niche}
                            name='niche'
                            value={niche}
                            checked={selectedNiche === niche}
                            onChange={() => handleNicheChange(niche)}
                          />
                          <label htmlFor={niche}>{niche}</label>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            <div className="container">
              <div className="mobile-filter">
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Filter By City</option>
                  {cities.map((city, index) => {
                    return (
                      <option value={city} key={index}>
                        {city}
                      </option>
                    )
                  })}
                </select>
                <select value={niche} onChange={(e) => setNiche(e.target.value)}>
                  <option value="">Filter By Niche</option>
                  {techFields.map((niche, index) => {
                    return (
                      <option value={niche} key={index}>
                        {niche}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="jobs_container">
                {
                  jobs && jobs.map(element => {
                    return (
                      <div className="card" key={element._id}>
                        {element.hiringMultipleCandidate === "Yes" ? (
                          <p className='hiring-multiple'>
                            Hiring Multiple Candidates
                          </p>
                        ) : (
                          <p className='hiring'>Hiring</p>
                        )}
                        <p className='title'>{element.title}</p>
                        <p className='company'>{element.companyName}</p>
                        <p className='location'>{element.location}</p>
                        <p className='salary'><span>Salary:</span> {element.salary}</p>
                        <p className='posted'>
                          <span>Posted On: </span>
                          {element.jobPostedOn.substring(0,10)}
                        </p>
                        <div className="btn-wrapper">
                          <Link 
                          className='btn'
                          to={`/post/application/${element._id}`}
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            </div>
          </section>
        )
      }
    </>
  )
}

export default jobs