import "./App.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./Component/Navbar"
import Footer from "./Component/Footer"
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard"
import Jobs from "./Pages/Jobs"
import Login from "./Pages/Login"
import NotFound from "./Pages/NotFound"
import PostApplication from "./Pages/PostApplication"
import Register from "./Pages/Register"
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import {getUser} from "./Store/slice/userSlice"
import { useEffect } from "react"

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUser());
  },[])
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/Post/application/:jobId' element={<PostApplication/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
      <ToastContainer position="top-right" theme="dark"/>
    </Router>
    </>
  )
}

export default App
