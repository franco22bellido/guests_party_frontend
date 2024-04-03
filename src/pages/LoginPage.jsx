import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom'


const LoginPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const {signIn, isAuthenticated, errorAuth} = useAuth();
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
        {
          errorAuth && 
          errorAuth.map((error, i)=> (
            <p className="alert alert-secondary" role="alert" key={i}>{error}</p>
          ))
        }

        <form onSubmit={onSubmit} className="form">

        <label htmlFor="email" className="form-label">Email address</label>
        <input className='form-control' type="email"
        {...register('email', {required: true})} />
        {
          errors.email && (
            <p className="alert alert-danger mt-3" role="alert">
              email is required
            </p>
          )
        }

        <label htmlFor="password" className="form-label">Password</label>
        <input className='form-control' type="password" 
        {...register('password', {required: true})} />
        {
          errors.password && (
            <p className="alert alert-danger mt-3" role="alert">
              password is required
            </p>
          )
        }

        <button className="btn btn-primary" type='submit'>Login</button>
      </form>
      <p>You do not have an account?</p>
      <Link to={'/register'}>Register</Link>
    </div>
  )
}

export default LoginPage
