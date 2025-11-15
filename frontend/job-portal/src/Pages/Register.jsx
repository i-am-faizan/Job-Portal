import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from "react-redux"
import {useNavigate, Link} from "react-router-dom"
import { clearAllUserError, register } from '../Store/slice/userSlice';
import {toast} from "react-toastify";
import {FaRegUser, FaPencilAlt, FaAddressBook} from "react-icons/fa"
import {FaPhoneFlip} from "react-icons/fa6"
import {MdOutlineMailOutline, MdCategory} from "react-icons/md"
import {RiLock2Fill} from "react-icons/ri"

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

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

  const resumeHandle= (e) =>{
    const file = e.target.files[0];
    setResume(file);
  }

  const {loading , isAuthenticated, error, message} = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegister =async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone",phone);
    formData.append("address", address);
    if(role === "Job Seeker"){
    formData.append("firstNiche", firstNiche);
    formData.append("secondNiche", secondNiche);
    formData.append("thirdNiche", thirdNiche);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    }
    dispatch(register(formData));
  };

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllUserError());
    }
    if(isAuthenticated){
      navigateTo("/")
    }
  },[dispatch,error,loading,message,isAuthenticated])

  return (
    <section className='authPage'>
      <div className="container">
        <div className="header">
          <h3>Create a new account</h3>
        </div>
        <form onSubmit={handleRegister}>
          <div className="wrapper">
            <div className="inputTag">
              <label >Register As</label>
              <div>
                <select value={role} onChange={(e)=>setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer"> Register as an Employer</option>
                  <option value="Job Seeker">Register as an Job Seeker</option>
                </select>
                <FaRegUser/>
              </div>
            </div>
            <div className="inputTag">
              <label >Name</label>
              <div>
               <input
                type="text" 
                placeholder='Your Name' 
                value={name} 
                onChange={(e)=> setName(e.target.value)} 
                />
                <FaPencilAlt/>
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
              <label >Email Address</label>
              <div>
                <input
                type="email" 
                placeholder='Your Email' 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)} 
                />
                <MdOutlineMailOutline/>
              </div>
            </div>
            <div className="inputTag">
              <label >Phone Number</label>
              <div>
               <input
                type="number" 
                placeholder='111-222-333' 
                value={phone} 
                onChange={(e)=> setPhone(e.target.value)} 
                />
                <FaPhoneFlip/>
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
              <label >Address</label>
              <div>
                <input
                type="text" 
                placeholder='Your Address' 
                value={address} 
                onChange={(e)=> setAddress(e.target.value)} 
                />
                <FaAddressBook/>
              </div>
            </div>
            <div className="inputTag">
              <label >Password</label>
              <div>
               <input
                type="password" 
                placeholder='Your Password' 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)} 
                />
                <RiLock2Fill/>
              </div>
            </div>
          </div>
          {
            role === "Job Seeker" &&(
              <>
              <div className="wrapper">
                <div className="inputTag">
                  <label >Your First Niche</label>
                  <div>
                    <select
                    value={firstNiche}
                    onChange={(e)=>setFirstNiche(e.target.value)}
                    >
                      <option value="">Your Niche</option>
                      {
                        techFields.map((niche, index)=>{
                          return(
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          )
                        })
                      }
                    </select>
                    <MdCategory/>
                  </div>
                </div>
                <div className="inputTag">
                  <label >Your Second Niche</label>
                  <div>
                    <select
                    value={secondNiche}
                    onChange={(e)=>setSecondNiche(e.target.value)}
                    >
                      <option value="">Your Niche</option>
                      {
                        techFields.map((niche, index)=>{
                          return(
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          )
                        })
                      }
                    </select>
                      <MdCategory/>
                  </div>
                </div>
                <div className="inputTag">
                  <label >Your Third Niche</label>
                  <div>
                    <select
                    value={thirdNiche}
                    onChange={(e)=>setThirdNiche(e.target.value)}
                    >
                      <option value="">Your Niche</option>
                      {
                        techFields.map((niche, index)=>{
                          return(
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          )
                        })
                      }
                    </select>
                      <MdCategory/>
                  </div>
                </div>
              </div>
              <div className="wrapper">
            <div className="inputTag">
              <label >Coverletter</label>
              <div>
                <textarea
                value={coverLetter}
                onChange={(e)=>setCoverLetter(e.target.value)}
                rows={10}                
                />
              </div>
            </div>
            </div>
              <div className="wrapper">
            <div className="inputTag">
              <label >Resume</label>
              <div>
                <input 
                type='file'
                onChange={resumeHandle}
                style={{border:"none"}}                
                />
              </div>
            </div>
          </div>
              </>
            )
          }
          <button type='submit' disabled={loading}>
            Register
          </button>
          <Link to={"/login"}>Login Now</Link>
        </form>
      </div>

    </section>
  )
}

export default Register