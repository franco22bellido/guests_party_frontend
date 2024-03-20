import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const {register, handleSubmit} = useForm();
    const {signUp, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    
    useEffect(()=> {
        if(isAuthenticated){
            navigate('/home');
        }
    }, [isAuthenticated]);


    const onSubmit = handleSubmit(async (values)=> {
        signUp(values);
    });


  return (
    <div className='col-md-6 mx-auto my-5'>
      <form onSubmit={onSubmit} className="form">

        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" className='form-control'
            {...register('username', {required: true})}
        />

        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className='form-control'
        {...register('email', {required: true})} />

        <label htmlFor="password" className="form-label">Password</label>
        <input type="password"  className='form-control'
        {...register('password', {required: true})} />

        <button type='submit' className='btn btn-primary'>register</button>
      </form>
      <p>Do you already have an account?</p>
      <Link to={'/login'}>Login</Link>
    </div>
  )
}

export default RegisterPage
