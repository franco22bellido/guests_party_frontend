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
    <div>
        <form onSubmit={onSubmit}>
        <input type="email"
        {...register('email', {required: true})} />
        <input type="password" 
        {...register('password', {required: true})} />
        <button type='submit'>Login</button>
      </form>
      <p>You do not have an account?</p>
      <Link to={'/register'}>Register</Link>
    </div>
  )
}

export default LoginPage
