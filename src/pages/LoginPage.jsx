import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import Form from '../components/elements/Form'
import SectionContainer from '../components/elements/SectionContainer'
import Main from '../components/elements/Main'


const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn, isAuthenticated, errorAuth } = useAuth();
  const navigate = useNavigate();


  const onSubmit = handleSubmit(async data => {
    await signIn(data);
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);


  return (
      <SectionContainer>
        {
          errorAuth &&
          errorAuth.map((error, i) => (
            <p className="alert alert-secondary" role="alert" key={i}>{error}</p>
          ))
        }

        <Form onSubmit={onSubmit}>
          <h1 className='text-4xl text-center mb-7'>Login</h1>
          <label htmlFor="email" className="">Email address</label>
          <input className='border' type="email"
            {...register('email', { required: true })} />
          {
            errors.email && (
              <p className="alert alert-danger mt-3" role="alert">
                email is required
              </p>
            )
          }

          <label htmlFor="password" className="">Password</label>
          <input className='border' type="password"
            {...register('password', { required: true })} />
          {
            errors.password && (
              <p className="alert alert-danger mt-3" role="alert">
                password is required
              </p>
            )
          }

          <button className="bg-blue-500 w-1/2 mx-auto text-white text-base rounded-full hover:scale-105 transition-all mt-3" type='submit'>Login</button>
          <p>You do not have an account?</p>
          <Link className='text-blue-500 mb-5' to={'/register'}>Register</Link>
          </Form>
        </SectionContainer>
  )
}

export default LoginPage
