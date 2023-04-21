import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import Bird from "./Components/Bird";
import Obstacles from "./Components/Obstacles";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("window").height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [leftObstacle, setLeftObstacle] = useState(screenWidth);
  const [obstacleSpeed, setObstacleSpeed] = useState(4);
  const [rouletteHeigh, setRouletteHeigh] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [visible, setVisible] = useState(false);
  const [score, setScore] = useState(0);
  const obstacleWidth = 50;
  const gap = 120;
  const obstacleHeight = (screenHeight - gap) / 2;
  const initDecalage = 150;
  const gravity = 8;
  let gameTimerId;
  let obstaclesTimerId;

  const saut = () => {
    setBirdBottom((prev) => prev + 40);
  };

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [birdBottom]);

  useEffect(() => {
    if (leftObstacle > 0 - obstacleWidth) {
      obstaclesTimerId = setInterval(() => {
        setLeftObstacle((leftObstacle) => leftObstacle - obstacleSpeed);
      }, 30);

      return () => {
        clearInterval(obstaclesTimerId);
      };
    } else {
      setLeftObstacle(screenWidth);
      setObstacleSpeed((prev) => prev + 0.3);
      setRouletteHeigh(Math.random() * 300 - initDecalage);
      console.log(rouletteHeigh);
      setScore((prev) => prev + 1);
    }
  }, [leftObstacle]);
  useEffect(() => {
    if (
      (birdBottom < obstacleHeight + rouletteHeigh + 20 ||
        birdBottom > obstacleHeight + rouletteHeigh + gap - 20) &&
      leftObstacle > screenWidth / 2 - 25 &&
      leftObstacle < screenWidth / 2 + 25
    ) {
      console.log("game over");
      console.log(birdBottom < obstacleHeight + 15);
      console.log(birdBottom > obstacleHeight + gap - 15);
      console.log(birdBottom, obstacleHeight, gap);
      console.log(leftObstacle, screenWidth / 2 - 10, screenWidth / 2 + 10);
      gameOver();
    }
  });

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesTimerId);
    setIsGameOver(true);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => saut()}>
        {isGameOver ? (
          <View style={styles.endPartie}>
            <Text>Unfortunately GameOver Man</Text>
            <Text>
              Score : {score}
              {"\n"}{" "}
            </Text>

            <Button
              title="Play Again"
              onPress={() => {
                setIsGameOver(false);
                setBirdBottom(screenHeight / 2);
                setLeftObstacle(screenWidth);
                setObstacleSpeed(4);
                setScore(0);
              }}
            ></Button>
          </View>
        ) : (
          <View style={styles.container}>
            <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
            <Obstacles
              obstacleWidth={obstacleWidth}
              leftObstacle={leftObstacle}
              rouletteHeigh={rouletteHeigh}
              obstacleHeight={obstacleHeight}
            />
          </View>
        )}
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  endPartie: {
    flex: 1,
    backgroundColor: "beige",
    alignItems: "center",
    justifyContent: "center",
  },
});
