import { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  List,
  ListItem,
} from "@chakra-ui/layout";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [dice, setDice] = useState(1);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);

  const numbers = [1, 2, 3, 4, 5, 6];

  const startGameHandler = () => {
    setGameStarted(true);
  };

  const onClickedNumber = (value) => {
    setSelectedNumber(value);
    setError(null);
  };

  const getRandomNo = () => {
    if (selectedNumber) {
      const generatedNo = Math.ceil(Math.random() * 6);
      setDice(generatedNo);

      if (selectedNumber === generatedNo) {
        setScore((prev) => prev + generatedNo);
      } else {
        setScore((prev) => prev - 2);
      }
    } else {
      setError("Please Select Number");
    }
  };
  return (
    <>
      {gameStarted ? (
        <>
          <Flex justify="flex-end" align="center" mr={20} mt={10}>
            <Button bg="black" color="white" _hover={{ bg: "grey" }}>
              Home
            </Button>
          </Flex>
          <Stack
            justify="center"
            align="center"
            maxW="1300px"
            mx="auto"
            h="80vh"
          >
            <Heading
              as="h1"
              color={error ? "red" : "black"}
              fontSize="6xl"
              mb="8"
            >
              {error ? error : "Select Numbers"}
            </Heading>
            <Flex pb="10">
              {numbers.map((value) => (
                <Flex
                  bg={selectedNumber === value ? "green" : "black"}
                  color="white"
                  h="50px"
                  w="50px"
                  justify="center"
                  align="center"
                  fontSize="2xl"
                  cursor="pointer"
                  key={value}
                  mr={4}
                  borderRadius="md"
                  onClick={() => onClickedNumber(value)}
                >
                  {value}
                </Flex>
              ))}
            </Flex>
            <Box onClick={getRandomNo} cursor="pointer">
              <Image src={`/dice/dice${dice}.png`} />
            </Box>
            <Text as="p" fontSize="2xl">
              Click on dice to roll
            </Text>
            <Text
              color={score < 0 ? "red" : "green"}
              fontSize="8xl"
              fontWeight="bold"
            >
              {score}
            </Text>
            <Text fontSize="6xl" fontWeight="bold">
              Total Score
            </Text>
            <Button
              bg="blackAlpha.700"
              color="white"
              _hover={{ bg: "green" }}
              onClick={() => setScore(0)}
            >
              Reset Score
            </Button>
          </Stack>

          <Stack maxW="900px" mx="auto" bg="black" color="white" pl={5}>
            <Heading as="h2">Game Rules :</Heading>
            <List>
              <ListItem>Select Number any number</ListItem>
              <ListItem>Click on dice image to roll it</ListItem>
              <ListItem>
                Select number is equal to obtained dice result then you will get
                same point of dice
              </ListItem>
              <ListItem>
                if You are Wrong Score will be deducted by 2 points
              </ListItem>
            </List>
          </Stack>
        </>
      ) : (
        <Flex justify="center" align="center">
          <Image width="50%" src="./dices.png" alt="dice" />
          <Stack>
            <Heading as="h1" fontSize="7xl">
              The Dice Game
            </Heading>
            <Button
              alignSelf="flex-end"
              bg="black"
              color="white"
              _hover={{ bg: "grey" }}
              onClick={startGameHandler}
            >
              Start Game
            </Button>
          </Stack>
        </Flex>
      )}
    </>
  );
}

export default App;
