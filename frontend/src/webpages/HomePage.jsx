import { Header, JoinModal } from "../components";
import hero from "../images/hero.png";
import "../css/HomePage.css";
import {
  SimpleGrid,
  Box,
  Image,
  Grid,
  GridItem,
  Heading,
  Center,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Divider,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const handleInputChange = (e) => setInput(e.target.value);

  return (
    <>
      <Grid
        templateAreas={`"nav nav"
                        "main hero"
                        "main hero"`}
        gridTemplateRows={`auto 1fr`}
        gridTemplateColumns="60% 1fr"
        gap="4"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem area={"nav"} bg="blue.300">
          Header
        </GridItem>
        <GridItem area={"main"} m="auto">
          <Heading
            as="h1"
            size="2xl"
            margin="auto auto"
            textAlign="center"
          >
            TUTORS 4 LESS
          </Heading>
          <Heading as="h2" size="lg" mt="2rem" textAlign="center">
            Need help? Find a tutor
          </Heading>
          <FormControl mt="2rem" isRequired>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              value={input}
              placeHolder="name@email.com"
              onChange={handleInputChange}
            />

            <FormLabel mt="1rem">Password:</FormLabel>
            <Input
              type="email"
              value={input}
              placeHolder=""
              onChange={handleInputChange}
            />
          </FormControl>
          <a class="login-button" href="/home">
            <span class="login-button-span">Sign in</span>
          </a>
          <div className="left-right-divider">
            <p className="divider-text">or</p>
          </div>
          <JoinModal />
        </GridItem>
        <GridItem area={"hero"} m="auto">
          <Image src={hero} alt="college students tutoring" />
        </GridItem>
      </Grid>
    </>
  );
};
