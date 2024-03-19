import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import QRCode from "react-qr-code";
import { useParams, Link} from 'react-router-dom';
import { useGuest } from '../context/GuestContext';

const Guest = ({ data }) => {

    const [loading, setLoading] = useState(true);
    let {guestId} = useParams();
    const {regenerateTokenGuest, guest, setGuest} = useGuest();

    const getDataIfParamExist = async ()=> {
        if(guestId){
            await regenerateTokenGuest(guestId);
            setLoading(false);
        }else{
            setLoading(false);
            return setGuest(data);
        }

    }

    useEffect(()=> {
        setLoading(true);
        getDataIfParamExist();
    }, [data])

    return (
        <div>
            {
                loading === false ? 
                <div>
                    <h1>{guest.guest?.id}</h1>
                <h1>{guest.guest?.firstName}</h1>
                <h1>{guest.guest?.lastName}</h1>
                {
                    guest.guest?.state ? 
                    <h1>state: arrived</h1>
                    : <h1>state: not arrived</h1>
                }
                
                
                    (<QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "25%", width: "25%" }}
                        value={`${window.location.origin}/see-invitation/?token=${guest?.token}`}
                        viewBox={`0 0 256 256`}/>
                    )
                </div>
                
                    : <h1>loading...</h1>
            }
                
            {/* <Link>authorize entry</Link> Proxiamente.*/}
        </div>
    )
}

export default Guest