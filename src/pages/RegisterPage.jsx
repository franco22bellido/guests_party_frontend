import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Buttons/Button'
import Form from '../components/elements/Form'
import SectionContainer from '../components/elements/SectionContainer'
import Main from '../components/elements/Main'
import Errors from '../components/Errors/Errors';



const RegisterPage = () => {

  const { register, handleSubmit, reset} = useForm();
  const { signUp, isAuthenticated, errors: errorsAuth } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);


  const onSubmit = handleSubmit(async (values) => {
    await signUp(values);
    reset()
  });


  return (
    <Main>
      <SectionContainer className='w-full lg:w-[800px] mx-auto flex flex-col items-center'>
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
          <Errors errors={errorsAuth}/>
        </Form>
      </SectionContainer>
    </Main>
  )
}

export default RegisterPage
