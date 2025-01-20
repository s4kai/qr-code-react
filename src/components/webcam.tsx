"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { BarcodeDetector } from "barcode-detector"; // Bibliotecas BarcodeDetector para leitura de QR code

// Define styled components for styling
const WebcamContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 600px) {
    max-width: 100%;
    height: 100vh;
    margin: 0 auto;
  }

  @media (min-width: 600px) and (orientation: landscape) {
    max-width: 100%;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
  }

  @media (min-width: 768px) and (orientation: landscape) {
    max-width: 100%;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
  }
`;

const WebcamVideo = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const WebcamCanvas = styled.canvas`
  display: none;
`;

const QRCodeScannerContainer = styled.div`
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  @media (min-width: 768px) and (orientation: landscape) {
    top: -5%;
  }
`;

const QRCodeScanner = styled.div`
  position: relative;
  width: calc(100vw - 80px);
  aspect-ratio: 1/1;

  top: -5%;

  border: 4px solid #1a97df;
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) and (orientation: landscape) {
    top: 0%;
    max-width: 300px;
  }

  @keyframes scanning-animate {
    from {
      top: 0;
    }
    to {
      top: 100%;
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 2%;
    width: 96%;
    height: 5px;
    background-color: #3789d6;
    box-shadow: 0 0 10px #3789d6;

    border-radius: 5px;

    animation: scanning-animate 1.5s ease-out infinite;
  }
`;

const WebcamButton = styled.button`
  position: absolute;
  bottom: 20%;

  padding: 10px 20px;

  background-color: #1a97df;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  @media (min-width: 768px) and (orientation: landscape) {
    bottom: 10%;
    right: 10%;
  }
`;

const WebcamCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null); // State to store QR code data

  const getBackCamera = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      const backCamera = videoDevices.find((device) => {
        return (
          device.label.toLowerCase().includes("back") &&
          device.label.includes("0")
        );
      });

      if (backCamera) {
        return backCamera.deviceId;
      }

      return videoDevices[0]?.deviceId || videoDevices[1].deviceId;
    } catch (error) {
      console.error("Error getting devices", error);
      return null;
    }
  };

  const startWebcam = async () => {
    try {
      const deviceId = await getBackCamera();

      if (deviceId) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: deviceId } },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setMediaStream(stream);
      }
    } catch (error) {
      console.error("Error accessing webcam", error);
    }
  };

  const stopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
    }
  };

  const scanQRCode = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context && video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        const barcodeDetector = new BarcodeDetector({
          formats: ["qr_code", "code_128", "code_39"],
        });

        try {
          const barcodes = await barcodeDetector.detect(imageData);
          if (barcodes.length > 0) {
            setQrCode(barcodes[0].rawValue);
            stopWebcam();

            alert(barcodes[0].rawValue);
          }
        } catch (error) {
          console.error("Error detecting barcode", error);
        }
      }
    }
  };

  useEffect(() => {
    if (qrCode) return;
    const interval = setInterval(scanQRCode, 100);
    return () => clearInterval(interval);
  }, [qrCode]);

  const resetState = () => {
    stopWebcam();
    setQrCode(null);

    startWebcam();
  };

  useEffect(() => {
    startWebcam();

    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <WebcamContainer>
        <>
          <WebcamVideo ref={videoRef} autoPlay muted />
          <QRCodeScannerContainer>
            <QRCodeScanner />

            <WebcamButton onClick={resetState}>Reset</WebcamButton>
          </QRCodeScannerContainer>
          <WebcamCanvas ref={canvasRef} />
        </>
      </WebcamContainer>
    </div>
  );
};

export default WebcamCapture;
