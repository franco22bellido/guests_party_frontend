import QrScanner from 'qr-scanner';
import { useState } from 'react';
import { useGuest } from '../context/GuestContext';
import { Link, useNavigate } from 'react-router-dom';
import Errors from './Errors/Errors';
import Button from './Buttons/Button';
import Loader from './Loader';


const ScanQrComponent = () => {

  const [videoProperties, setVideoProperties] = useState()
  const [qrDecoded, setQrDecoded] = useState('')
  const [validation, setValidation] = useState(false)
  const { getGuestByToken,loading , errorGuests, setErrorGuests } = useGuest()
  const navigate = useNavigate()

  const openCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        })
        videoProperties.srcObject = stream
        videoProperties.play()

        const qrScanner = new QrScanner(videoProperties,
          result => {
            setQrDecoded(result)
            return validateInvitation(result)
          })
        qrScanner.start()
      } catch (error) {
        console.log(error)
      }
    }
  }
  const validateInvitation = async (url) => {
    let urlValid = url.includes(`${window.location.origin}/see-invitation/?token=`)
    if (!urlValid) return setErrorGuests(['the scanned url is not valid'])
    let tokenFound = url.replace(`${window.location.origin}/see-invitation/?token=`, '')
    const res = await getGuestByToken(tokenFound)
    navigate(`/see-invitation/?token=${tokenFound}`)
    if (res) {
      console.log(res)
      setValidation(true)
    }
    else {
      console.log(errorGuests)
      setValidation(false)
    }
  }


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

        <Button className={'bg-yellow-400 px-2 py-1'} onClick={() => openCamera()}>Open camera</Button>
        {validation &&
          <Link to={qrDecoded} target="_blank" rel="noopener noreferrer">view invitation</Link>}
      </div>
    </section>
  )
}

export default ScanQrComponent