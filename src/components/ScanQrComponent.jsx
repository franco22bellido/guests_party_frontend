import QrScanner from 'qr-scanner';
import { useState } from 'react';
import { useGuest } from '../context/GuestContext';
import { Link } from 'react-router-dom';


const ScanQrComponent = () => {

  const [videoProperties ,setVideoProperties] = useState()
  const [qrDecoded, setQrDecoded] = useState('')
  const [validation, setValidation] = useState(false)
  const {seeInvitationGuest, errorGuests, setErrorGuests} = useGuest()


  const openCamera = async ()=> {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
       try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {facingMode: 'environment'}
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
  const validateInvitation = async (url)=> {
    let urlValid = url.includes(`${window.location.origin}/see-invitation/?token=`)
    if(!urlValid) return setErrorGuests(['the scanned url is not valid'])
    let tokenFound = url.replace(`${window.location.origin}/see-invitation/?token=`, '')
    const res = await seeInvitationGuest(tokenFound)
    if(res){
       setValidation(true)}
       else{
        console.log(errorGuests)
        setValidation(false)
       }
  }

  // validateInvitation('http://localhost:5173/see-invitation/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY2LCJpYXQiOjE3MTIxNzc2NDZ9.szisMGGJGxqWxgUsJJYSF6xxXGw2zayeQ4AlhUzB1zc')

  return (
    <section className='container'>
      {
        errorGuests.map((err, i)=> (
            <p key={i} className="alert alert-danger" role="alert">
              {err}
            </p>
        ))
      }
      <div className='row'>
      <div className='card col-md-8 mx-auto'>
        <video className='card-img-top mx-auto mt-3' id='video' autoPlay ref= {video => {setVideoProperties(video)}}></video>
        <div className='card-body'>
          {
            validation ?
            <h5 className='card-title'>the token is valid!!</h5>
            :
            <h5 className='card-title'>awaiting for token...</h5>

          }
          <button onClick={()=> openCamera()}>Open camera</button>

          {
            validation &&
            <Link to={qrDecoded} target="_blank" rel="noopener noreferrer">view invitation</Link>
          }
        </div>
      </div>
      </div>
    </section>
  )
}

export default ScanQrComponent