import React,{useContext} from 'react'
import RegistrationPage from './RegistrationPage';
import {Link} from 'react-router-dom'
//-----
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}from 'mdb-react-ui-kit';
//---
import AuthContext from '../context/AuthContext'

export default function LoginPage() {
  let {loginUser}=useContext(AuthContext);
  return (
    <form onSubmit={loginUser}>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' name="username"/>
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name="password"/>

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn className="mb-4" onSubmit={loginUser}>Sign in</MDBBtn>

      <div className="text-center">
        <p>Not a member? <Link to="/registration">Register</Link></p>
        
      </div>

    </MDBContainer>
    </form>
  )  
}
{/* 
          <input type="text"  placeholder='enter username'/><br/>
          <input type="password" name="password" placeholder='enter password'/><br/>
          <input type="submit"/>
       </form> */}