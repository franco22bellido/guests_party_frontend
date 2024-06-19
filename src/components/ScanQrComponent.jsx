import QrScanner from 'qr-scanner';
import { useEffect, useState } from 'react';
import { useGuest } from '../context/GuestContext';
import { Link, useNavigate } from 'react-router-dom';
import Errors from './Errors/Errors';
import Button from './Buttons/Button';
import Loader from './Loader';


const ScanQrComponent = () => {

  const [videoProperties, setVideoProperties] = useState()
  const [qrDecoded, setQrDecoded] = useState('')
  const [ScannerState, setScannerState] = useState()
  const [stream, setStream] = useState(null)
  const [validation, setValidation] = useState(false)
  const { getGuestByToken,loading , errorGuests, setErrorGuests } = useGuest()
  
  const navigate = useNavigate()

  const stopCamera = async () => {
    if (stream) {
      console.log("cerrando camara")
      await stream.getTracks().forEach(track => track.stop());
      ScannerState.stop()
      console.log("camara cerrada")
    }
  };
  useEffect(()=> {
    return () => {
      stopCamera();
    };
  }, [stream])

  const openCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        let newStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        setStream(newStream)
        videoProperties.srcObject = newStream
        videoProperties.play()
        const qrScanner = new QrScanner(videoProperties,
            result => {
              return setQrDecoded(result)
            })
        setScannerState(qrScanner)
        qrScanner.start()
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(()=> {
    const validateInvitation = async () => {
      try {
        console.log(qrDecoded)
        let urlValid = qrDecoded.includes(`${window.location.origin}/see-invitation/?token=`)
        if (!urlValid) return setErrorGuests(['the scanned url is not valid'])
        let tokenFound = qrDecoded.replace(`${window.location.origin}/see-invitation/?token=`, '')
        const res = await getGuestByToken(tokenFound)
        stopCamera()
        navigate(`/see-invitation/?token=${tokenFound}`)
        if (res) {
          setValidation(true)
        }
        else {
          setValidation(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if(qrDecoded){
      validateInvitation()
    }
  },[qrDecoded])

  return (
    <section className='w-11/12 flex flex-col items-center mx-auto'>
      <Errors errors={errorGuests} />
      <Loader loading={loading}/>
      <video className='border w-full h-auto rounded md:w-[60%]' id='video' autoPlay ref={video => { setVideoProperties(video) }}></video>
      <div className=''>
        {validation ?
          <p className='card-title'>the token is valid!!</p>
          :
          <p className='card-title'>awaiting for token...</p>}
        <button className='bg-red-600 px-2 py-1 rounded-full text-white transition-all active:scale-90' onClick={()=> stopCamera()}>cerrar camara</button>
        <Button className={'bg-yellow-400 px-2 py-1'} onClick={() => openCamera()}>Open camera</Button>
        {validation &&
          <Link to={qrDecoded} target="_blank" rel="noopener noreferrer">view invitation</Link>}
      </div>
    </section>
  )
}

export default ScanQrComponent