
import React from 'react'
import { Link } from 'react-router-dom'
import GoogleLogin from './GoogleLogin'

const Home = () => {
  return (
    <div>
    <p> this is home</p>
    <GoogleLogin/>
        <Link to="/login">Login</Link>
    </div>
  )
}

export default Home