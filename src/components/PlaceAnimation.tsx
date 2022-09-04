import React from "react";
import { useRedux } from "../hooks/index";
import Lottie from "lottie-react-web";

interface PlaceholderAnimationProps {
  children?: any;
  url:any;
  height: any;
}

const PlaceholderAnimation = ({
  url,
  height,
}: PlaceholderAnimationProps) => {
  const { useAppSelector } = useRedux();

  return (
    <>
        <Lottie
          height={height}
          options={{
            animationData: url,
          }}
        />
    </>
  );
};

export default PlaceholderAnimation;
