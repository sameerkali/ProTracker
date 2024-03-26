import React from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleLogin from './GoogleLogin'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { google, gradient } from '../assets/index'


const Home = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
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
      <p>{user ? user.displayName : "no name"}</p>
      <p>{user ? user.email : "no email"}</p>
      {user && user.photoURL ? (
        <img src={user.photoURL} alt="User" />
      ) : (
        <img src={gradient} className='h-10 w-10' alt="User" />
      )}
      <br />
      {token ? (
        <button onClick={handleLogout}>LogOut</button>
      ) : (
        <GoogleLogin />
      )}

     
    </div>
  )
}

export default Home
