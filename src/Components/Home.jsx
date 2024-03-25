
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleLogin from './GoogleLogin'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const Home = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  // console.log(user)
  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
    <h1> This is Home Page</h1>
    <p>{user?.displayName}</p>
    <p>{user?.email}</p>
    {token && <img src={`${user?.photoURL}`} />}
    {token? <button onClick={handleLogout}>LogOut</button> : <GoogleLogin/>}
    
    </div>
  )
}

export default Home