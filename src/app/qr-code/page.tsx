"use client";

import Scanner from "@/components/Scanner";
import { useRouter } from "next/navigation";

const QRCodePage = () => {
  const router = useRouter();

  return (
    <Scanner
      delay={100}
      onCameraNotFound={() => router.replace("/?error=camera_not_found")}
      onDetected={(result) => {
        router.replace(`/?qrcode=${result}`);
      }}
      onManualInput={() => router.replace("/")}
    />
  );
};

export default QRCodePage;
