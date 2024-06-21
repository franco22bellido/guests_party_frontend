import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import GuestComponent from '../components/GuestComponent';
import QRCodeComponent from '../components/QRCodeComponent';
import Main from '../components/elements/Main';
import Card from '../components/elements/Card';
import SectionContainer from '../components/elements/SectionContainer';
import Button from '../components/Buttons/Button';
import DownloadImage from '../components/DownloadImage';
import Loader from '../components/Loader';

const Regenerate = () => {

    let { guestId } = useParams();
    const { getGuestById, data, markArrival, setData} = useGuest();


    const getDataIfParamExist = async () => {
        if (guestId) {
            await getGuestById(guestId);
        }
    }

    useEffect(() => {
        getDataIfParamExist();
        return ()=> setData(null)
    }, [])

    return (
        <Main>
            <SectionContainer>
                {
                    data && data.guest?.id == guestId &&
                    <Card className={'md:w-[400px] md:h-auto'}>
                        <DownloadImage>
                            <GuestComponent guest={data?.guest} />
                            <QRCodeComponent token={data?.token} />
                        </DownloadImage>
                        <Button
                            className={'bg-blue-950 w-full'}
                            onClick={() => markArrival()}>Authorize entry</Button>
                        <Link to={`/event-guests/${data?.guest.eventId}`} className='text-blue-600 text-lg font-semibold'>Go back</Link>
                    </Card>
                }
                <Loader />
            </SectionContainer>
        </Main>
    )
}

export default Regenerate