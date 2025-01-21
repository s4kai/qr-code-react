"use client";

import Scanner from "@/components/Scanner";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const QRCodePage = () => {
  const router = useRouter();

  const sendBackWithError = useCallback(() => {
    try {
      router.replace("/nota-fiscal?error=camera_not_found");
    } catch (e) {
      console.error(e);
    }
  }, [router]);

  return (
    <Scanner
      delay={100}
      onCameraNotFound={sendBackWithError}
      onDetected={(result) => {
        router.replace(`/nota-fiscal?qrcode=${result}`);
      }}
      onManualInput={() => router.replace("/nota-fiscal")}
    />
  );
};

export default QRCodePage;
