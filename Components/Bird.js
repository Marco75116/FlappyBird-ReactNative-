import React from "react";
import birdSrc from "../assets/bird-svgrepo-com.svg";
import { View, Image } from "react-native";
import * as Svg from "react-native-svg";

const Bird = ({ birdBottom, birdLeft }) => {
  const birdWidth = 50;
  const birdHeight = 60;

  return (
    <View
      style={{
        position: "absolute",
        // backgroundColor: "blue",
        width: birdWidth,
        height: birdHeight,
        left: birdLeft - birdWidth / 2,
        bottom: birdBottom - birdHeight / 2,
      }}
    >
      <Image
        style={{ width: 50, height: 50 }}
        source={{
          uri: "https://e7.pngegg.com/pngimages/907/801/png-clipart-flappy-bird-sprite-2d-computer-graphics-bird-game-animals.png",
        }}
      />
    </View>
  );
};

export default Bird;
