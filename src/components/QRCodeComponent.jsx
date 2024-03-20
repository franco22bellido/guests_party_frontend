import React from 'react'
import QRCode from 'react-qr-code'

const QRCodeComponent = ({token}) => {
  return (
    <div>
       (<QRCode
              size={256}
              style={{ height: "auto", maxWidth: "25%", width: "25%" }}
              value={`${window.location.origin}/see-invitation/?token=${token}`}
              viewBox={`0 0 256 256`} />
            )
    </div>
  )
}

export default QRCodeComponent
