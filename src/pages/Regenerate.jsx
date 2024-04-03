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
        <div className='container'>
            {
                loading === false ?
                      <div className="card row mt-3">
                          <div className='card-img-top mt-3' style={{width: '64rem'}}><QRCodeComponent token={data?.token} /></div>
                            <GuestComponent guest={data.guest} />
                            <button className='btn btn-success col-md-2' onClick={() => markArrival()}>authorize entry</button>
                      </div>
                    : <h1>loading...</h1>
                }
        </div>
    )
}

export default Regenerate