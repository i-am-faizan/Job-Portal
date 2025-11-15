import React from 'react'
import { Link } from "react-router-dom"
import {useSelector} from "react-redux"
import {FaSquareXTwitter,FaSquareInstagram, FaSquareGithub, FaLinkedin} from "react-icons/fa6"

const Footer = () => {
  const {isAuthenticated} = useSelector((state)=> state.user)
  return (
    <>
      <footer>
        <div>
          <img src="/logo.png" alt="logo" />
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>Azad Nagar Indore, India</li>
            <li>khanfaizan000@gmail.com</li>
            <li>+91 7879690308</li>
          </ul>
        </div>
        <div>
          <h4>Quil Links</h4>
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/jobs"}>Jobs</Link></li>
            {isAuthenticated && (
            <li><Link to={"/dashboard"}>Dashboard</Link></li>
            )}
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <Link to={"/"}>
                <span><FaSquareXTwitter/></span>
                <span>Twitter (X)</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <span><FaSquareInstagram/></span>
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <span><FaSquareGithub/></span>
                <span>Github</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <span><FaLinkedin/></span>
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="copyright">
        &copy; CopyRight 2025. All Rights Reserved By Faizan Khan
      </div>
    </>
  )
}

export default Footer