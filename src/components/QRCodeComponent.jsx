import QRCode from 'react-qr-code'

const QRCodeComponent = ({token}) => {
  return (
    <>
       <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "60%", width: "60%" }}
              value={`${window.location.origin}/see-invitation/?token=${token}`}
              viewBox={`0 0 256 256`} />
        <h2>scan this qr at reception</h2>
    </>
  )
}

export default QRCodeComponent
