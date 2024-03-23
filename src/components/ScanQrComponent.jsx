import React from 'react'
import { useEffect } from 'react';


const ScanQrComponent = () => {


  
  let scanning = false;
  useEffect(() => {
  
    // console.log(qrcode);
    const video = document.createElement("video");

    //nuestro camvas
    const canvasElement = document.getElementById("qr-canvas");
    const canvas = canvasElement.getContext("2d");

    const btnScanQR = document.getElementById("btn-scan-qr");

    const encenderCamara = async () => {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
          scanning = true;
          btnScanQR.hidden = true;
          canvasElement.hidden = false;
          video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
          video.srcObject = stream;
          video.play();
          tick();
          
          scan();
        });
    };
    function scan() {
      try {
        window.qrcode.decode();
        
      } catch (e) {
        setTimeout(scan, 300);
      }
    }


    function tick() {
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

      scanning && requestAnimationFrame(tick);
    }

      
      window.qrcode.callback = (respuesta) => {
        if (respuesta) {
          console.log("escaneo completo");
          console.log(respuesta);
          // Swal.fire(respuesta)
          // activarSonido();
          //encenderCamara();    
          // cerrarCamara();    
    
        }
      };

    encenderCamara();
  }, [])



  return (

    <div className="row justify-content-center mt-5">
      <div className="col-sm-4 shadow p-3">
        <h5 className="text-center">Escanear codigo QR</h5>
        <div className="row text-center">
          <a id="btn-scan-qr" href="#" />
          <img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/07/1499401426qr_icon.svg" className="img-fluid text-center" width="175" />
          <a />
          <canvas hidden="" id="qr-canvas" className="img-fluid"></canvas>
        </div>
        <div className="row mx-5 my-3">
          <button className="btn btn-success btn-sm rounded-3 mb-2" >Encender camara</button>
          {/* <button className="btn btn-danger btn-sm rounded-3" onclick="cerrarCamara()">Detener camara</button> */}
        </div>
      </div>
    </div>

  )
}

export default ScanQrComponent

