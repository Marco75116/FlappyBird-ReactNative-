import React from "react";
import { View } from "react-native";

const Obstacles = ({
  leftObstacle,
  obstacleWidth,
  rouletteHeigh,
  obstacleHeight,
}) => {
  return (
    <>
      <View
        style={{
          position: "absolute",
          backgroundColor: "green",
          width: obstacleWidth,
          height: obstacleHeight + rouletteHeigh,
          left: leftObstacle,
          bottom: 0,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "green",
          width: obstacleWidth,
          height: obstacleHeight - rouletteHeigh,
          left: leftObstacle,
          bottom: 832 - (obstacleHeight - rouletteHeigh),
        }}
      ></View>
    </>
  );
};

export default Obstacles;
