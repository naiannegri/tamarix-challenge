import React from "react";
import { useRedux } from "../hooks/index";
import { Player } from '@lottiefiles/react-lottie-player';

interface PlaceholderAnimationProps {
  animation: any;
  height: string;
  width:string;
}

const PlaceholderAnimation = ({
  animation,
  height,
  width
}: PlaceholderAnimationProps) => {
  const { useAppSelector } = useRedux();

  return (
    <>
        <Player
        src={animation}
        className="player"
        loop
        autoplay
        style={{height: height, width: width}}
        />
    </>
  );
};

export default PlaceholderAnimation;
