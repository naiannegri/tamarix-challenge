import React from "react";
import { useRedux } from "../hooks/index";

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
        {/* <Lottie
          style={{height:height}}
          options={{
            animationData: url,
          }}
        /> */}
    </>
  );
};

export default PlaceholderAnimation;
