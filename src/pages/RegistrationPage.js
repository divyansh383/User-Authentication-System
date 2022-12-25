
import React,{useContext, useState} from 'react'
import LoginPage from './LoginPage';
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

export default function RegistrationPage() {
  let {registerUser}=useContext(AuthContext);
  let{errormsg}=useContext(AuthContext);
  return (
    <>
    {errormsg?(<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>{errormsg}</strong>       
        <button type="button" class="btn btn-outline-warning" data-bs-dismiss="alert" aria-label="Close">x</button>
    </div>):(console.log("none"))}
    
    <form onSubmit={registerUser}>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

        
      <MDBInput wrapperClass='mb-4' label='First Name' type='text' name="first_name" required/>
      <MDBInput wrapperClass='mb-4' label='Last Name' type='text' name="last_name" required/>
      <MDBInput wrapperClass='mb-4' label='Username' type='text' name="username" required/>
      <MDBInput wrapperClass='mb-4' label='Email' type='email' name="email" required/>
      <MDBInput wrapperClass='mb-4' label='Password' type='password' name="password1" required/>
      <MDBInput wrapperClass='mb-4' label='confirm passoword' id='form2' type='password' name="password2" required/>

      <MDBBtn className="mb-4" onSubmit={registerUser}>Sign up</MDBBtn>

      <div className="text-center">
        <p>Already a member? <Link to="/login">Login</Link></p>
        <p>or sign up with:</p>

        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm"/>
          </MDBBtn>

        </div>
      </div>

    </MDBContainer>
    </form>
    </>
  )  
}
