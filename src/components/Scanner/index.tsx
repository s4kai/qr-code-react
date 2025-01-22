"use client";

import { startWebcam, stopWebcam } from "@/utils/media";

import { BarcodeDetector } from "barcode-detector";

import { useEffect, useRef, useState } from "react";
import {
  QRCodeScanner,
  ScannerBackgroundContainer,
  ScannerButton,
  ScannerContainer,
  ScannerFooter,
  WebcamCanvas,
  WebcamVideo,
} from "./ui";

type QRCodeScannerProps = {
  delay: number;
  onDetected: (data: string) => void;
  onCameraNotFound: (error: unknown) => void;
  onManualInput: () => void;
};

const Scanner = ({
  delay,
  onDetected,
  onCameraNotFound,
  onManualInput,
}: QRCodeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [qrCode] = useState<string | null>(null);

  if (
    !("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices)
  ) {
    onCameraNotFound("Camera not found");
  }

  const initWebcam = async () => {
    try {
      const stream = await startWebcam(videoRef);
      if (stream) setMediaStream(stream);
    } catch {
      onCameraNotFound("Camera not found");
    }
  };

  const scanQRCode = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context && video.videoWidth && video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const barcodeDetector = new BarcodeDetector({
        formats: ["qr_code", "code_128", "code_39"],
      });

      const barcodes = await barcodeDetector.detect(imageData);
      if (barcodes.length > 0) {
        onDetected(barcodes[0].rawValue);
        stopWebcam(mediaStream, setMediaStream);
      }
    }
  };

  useEffect(() => {
    initWebcam();
    const interval = setInterval(scanQRCode, delay);

    return () => {
      clearInterval(interval);
      stopWebcam(mediaStream, setMediaStream);
    };
  }, [qrCode, delay]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <ScannerContainer>
        <WebcamVideo ref={videoRef} autoPlay muted />
        <ScannerBackgroundContainer>
          <QRCodeScanner />
          <ScannerFooter>
            <ScannerButton onClick={onManualInput}>Digitar</ScannerButton>
          </ScannerFooter>
        </ScannerBackgroundContainer>

        <WebcamCanvas ref={canvasRef} />
      </ScannerContainer>
    </div>
  );
};

export default Scanner;
