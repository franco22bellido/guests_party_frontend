import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Buttons/Button'
import Form from '../components/elements/Form'
import SectionContainer from '../components/elements/SectionContainer'
import Main from '../components/elements/Main'



const RegisterPage = () => {

  const { register, handleSubmit } = useForm();
  const { signUp, isAuthenticated, errorAuth } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);


  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });


  return (
    <Main>
      <SectionContainer className='w-full lg:w-[800px] mx-auto flex flex-col items-center'>
        {
          errorAuth &&
          errorAuth.map((error, i) => (
            <p key={i} className="alert alert-secondary" role="alert">{error}</p>
          ))
        }

        <Form onSubmit={onSubmit} className="border px-6 w-full md:w-[500px] flex flex-col gap-1 mt-10">

          <h1 className='text-4xl text-center my-4'>Register</h1>
          <label htmlFor="username" className="">Username</label>
          <input type="text" className='border'
            {...register('username', { required: true })}
          />

          <label htmlFor="email" className="">Email address</label>
          <input type="email" className='border'
            {...register('email', { required: true })} />

          <label htmlFor="password" className="">Password</label>
          <input type="password" className='border'
            {...register('password', { required: true })} />

          <Button className={'bg-blue-500 w-1/2 mx-auto'}>sign Up</Button>
          <p>Do you already have an account?</p>
          <Link className='text-blue-500 mb-4' to={'/login'}>Login</Link>
        </Form>
      </SectionContainer>
    </Main>
  )
}

export default RegisterPage
