import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGuest } from '../../context/GuestContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import GuestComponent from '../../components/GuestComponent.jsx';
import SectionContainer from '../../components/elements/SectionContainer.jsx';
import Card from '../../components/elements/Card.jsx';
import Button from '../../components/Buttons/Button.jsx';

const SeeInvitation = () => {


  const [searchParams] = useSearchParams();
  const { data, markArrival, getGuestByToken, loading, setLoading, errorGuests } = useGuest();
  const { user, isAuthenticated } = useAuth();

  const seeInvitation = async () => {
    await getGuestByToken(searchParams.get('token'));
  }

  useEffect(() => {
    setLoading(true);
    seeInvitation();
  }, [])
  return (
    <SectionContainer className={'flex-col items-center'}>
      {
        loading === false && data &&
        <Card className={'md:w-96 md:h-auto p-0'}>
            <GuestComponent guest={data?.guest} />
          {
            user?.id === data.guest?.userId &&
            <Button className={'bg-slate-900 w-full'} onClick={() => markArrival()}>Authorize entry</Button>}
          {isAuthenticated ? <>
            <Link className='text-blue-600 text-base font-semibold' to={'/'}>{`Go home`}</Link></>
            : <Link className='text-blue-600 text-base font-semibold' to={'/login'}>Login</Link>}
        </Card>
      }

      
      {errorGuests &&
        errorGuests.map((error, i) => (
          <>
            <p className='alert alert-danger mt-4' key={i}>{error}</p>
            <Link className='text-blue-600 text-base font-semibold' to={'/login'}>Login</Link>
          </>))}
    </SectionContainer>
  )
}

export default SeeInvitation

