import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  clearAllprofileUpdateError,
  updateProfile,
} from "../Store/slice/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../Store/slice/userSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
  const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
  const [firstNiche, setFirstNiche] = useState(user && user.niches?.firstNiche);
  const [secondNiche, setSecondNiche] = useState(
    user && user.niches?.secondNiche
  );
  const [thirdNiche, setThirdNiche] = useState(user && user.niches?.thirdNiche);
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user && user.resume?.url);

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (user && user.role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
    }
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(updateProfile(formData));
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

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

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllprofileUpdateError());
    }
    if (isUpdated) {
      toast.success("Profile Updated");
      dispatch(getUser());
      dispatch(clearAllprofileUpdateError());
    }
  }, [dispatch, error, loading, isUpdated, user]);
  return (
    <>
      <div className="account_components">
        <h3>Update Profile</h3>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {user && user.role === "Job Seeker" && (
          <div>
            <label>Your Niches</label>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <select
                value={firstNiche}
                onChange={(e) => setFirstNiche(e.target.value)}
              >
                {techFields.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <select
                value={secondNiche}
                onChange={(e) => setSecondNiche(e.target.value)}
              >
                {techFields.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <select
                value={thirdNiche}
                onChange={(e) => setThirdNiche(e.target.value)}
              >
                {techFields.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label>CoverLetter</label>
              <textarea
                rows={5}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label>Upload Resume</label>
              <input type="file" onChange={resumeHandler} />
              {user && user.resume && (
                <div>
                  <p>Current Resume</p>
                  <Link
                    to={user.resume && user.resume.url}
                    target="_blank"
                    className="view-resume"
                  >
                    View Resume
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="save_change_btn_wrapper">
          <button
            className="btn"
            onClick={handleUpdateProfile}
            disabled={loading}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
