import React from 'react'
import { QRCodeSVG } from 'qrcode.react'

function QRcode({url}) {
   

  return (
    <div >
      <QRCodeSVG value={url} size={100} />
   
    </div>
  )
}

export default QRcode