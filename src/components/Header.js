import React from 'react'
import {Link} from 'react-router-dom'
//16
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function Header() {
  //16
  let {user,logoutUser} = useContext(AuthContext);
  return (
    <div>
      <Link to="/">Home</Link>
      <span>|</span>
      {user? (<button onClick={logoutUser}>Logout</button>):(<Link to="/login">Login</Link>)}
      {user?  <p>Hello {user.username}</p>:<p>log in to enter</p>}
    </div>
  )
} 
