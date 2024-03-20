import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom'


const LoginPage = () => {

  const {register, handleSubmit} = useForm();
  const {signIn, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async data => {
      await signIn(data);
  })

  useEffect(()=> {
    if(isAuthenticated){
        navigate('/home');
    }
}, [isAuthenticated]);




  return (
    <div className='col-md-6 mx-auto my-5'>
        <form onSubmit={onSubmit} className="form">

        <label htmlFor="email" className="form-label">Email address</label>
        <input className='form-control' type="email"
        {...register('email', {required: true})} />

        <label htmlFor="password" className="form-label">Password</label>
        <input className='form-control' type="password" 
        {...register('password', {required: true})} />

        <button className="btn btn-primary" type='submit'>Login</button>
      </form>
      <p>You do not have an account?</p>
      <Link to={'/register'}>Register</Link>
    </div>
  )
}

export default LoginPage
