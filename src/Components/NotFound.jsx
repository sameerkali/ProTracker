import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <p>NotFound</p>
        back to Login 
        <Link to={`/login`}> Login</Link>
        <button></button>
    </div>
  )
}

export default NotFound