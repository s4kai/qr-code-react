export const getBackCamera = async (): Promise<string | null> => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter((device) => device.kind === "videoinput");

  if (videoDevices.length === 0) throw new Error("No video devices found");

  const backCamera = videoDevices.find(
    (device) =>
      device.label.toLowerCase().includes("back") && device.label.includes("0")
  );

  return backCamera?.deviceId || videoDevices[0]?.deviceId || null;
};

export const startWebcam = async (
  videoRef: React.RefObject<HTMLVideoElement | null>
) => {
  if (!videoRef?.current) return;

  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" },
  });

  if (videoRef.current) {
    videoRef.current.srcObject = stream;
  }

  return stream;
};

export const stopWebcam = (
  mediaStream: MediaStream | null,
  setMediaStream: React.Dispatch<React.SetStateAction<MediaStream | null>>
) => {
  mediaStream?.getTracks().forEach((track) => track.stop());
  setMediaStream(null);
};

export const toggleFlashlight = async (
  mediaStream: MediaStream | null,
  isFlashlightOn: boolean,
  setIsFlashlightOn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const track = mediaStream?.getVideoTracks()[0];

  if (track) {
    await track.applyConstraints({
      advanced: [{ torch: !isFlashlightOn } as MediaTrackConstraintSet],
    });

    setIsFlashlightOn(!isFlashlightOn);
  }
};
