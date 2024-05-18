import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import GuestComponent from '../components/GuestComponent';
import QRCodeComponent from '../components/QRCodeComponent';
import Main from '../components/elements/Main';
import Card from '../components/elements/Card';
import SectionContainer from '../components/elements/SectionContainer';
import Button from '../components/Buttons/Button';

const Regenerate = () => {

    let { guestId } = useParams();
    const { regenerateTokenGuest, data, setStateGuest, loading, setLoading} = useGuest();

    const markArrival = async () => {
        await setStateGuest(data.token);
        return regenerateTokenGuest(data.guest.id);
    }
    
    const getDataIfParamExist = async () => {
        if (guestId) {
            await regenerateTokenGuest(guestId);
        }
    }

    useEffect(() => {
        setLoading(true);
        getDataIfParamExist();
    }, [])

    return (
        <Main>
            <SectionContainer>
            {
                loading === false ?
                        <Card className={'max-w-xl'}>
                            <GuestComponent guest={data.guest} />
                            <QRCodeComponent token={data?.token} />
                            <Button className={'bg-blue-950 w-full'} onClick={() => markArrival()}>Authorize entry</Button>
                        </Card>
                    : <h1>loading...</h1>
                }
            </SectionContainer>
        </Main>
    )
}

export default Regenerate