import React, { useEffect, useRef } from "react";

const AudioPlayer: React.FC<{ stream: MediaStream }> = ({ stream }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!stream) return;

    if (audioRef.current) audioRef.current.srcObject = stream;
  });

  return (
    <>
      <audio ref={audioRef} autoPlay muted={false} />
    </>
  );
};

export default AudioPlayer;
