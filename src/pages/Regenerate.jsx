import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import GuestComponent from '../components/GuestComponent';
import QRCodeComponent from '../components/QRCodeComponent';

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
        } else {
         
        }
    }

    useEffect(() => {
        setLoading(true);
        getDataIfParamExist();
    }, [])

    return (
        <div>
            {
                loading === false ?
                    <div>
                        <GuestComponent guest={data?.guest}/>
                        <QRCodeComponent token={data?.token}/>
                    </div>

                    : <h1>loading...</h1>
            }
            <button onClick={() => markArrival()}>authorize entry</button>
        </div>
    )
}

export default Regenerate