import styled from "styled-components";

export const ScannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  margin: 0 auto;
  overflow-y: hidden;
`;

export const WebcamVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const WebcamCanvas = styled.canvas`
  display: none;
`;

export const ScannerBackgroundContainer = styled.div`
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;

  @media (min-width: 768px) and (orientation: landscape) {
    flex-direction: row;
  }
`;

export const QRCodeScanner = styled.div`
  position: relative;
  width: calc(100vw - 80px);
  aspect-ratio: 1/1;

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

export const ScannerButton = styled.button`
  padding: 10px 20px;
  background-color: #1a97df;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const ScannerFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
