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
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [newUserFirstName, setNewUserFirstName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  const handleUserEmail = (e) => setUserEmail(e.target.value);
  const handleUserPassword = (e) => setUserPassword(e.target.value);

  const handleNewUserFirstName = (e) =>
    setNewUserFirstName(e.target.value);
  const handleNewUserLastName = (e) =>
    setNewUserLastName(e.target.value);
  const handleNewUserEmail = (e) => setNewUserEmail(e.target.value);
  const handleNewUserPassword = (e) =>
    setNewUserPassword(e.target.value);

  return (
    <>
      <Header />
      <SimpleGrid columns={[1, 1, 1, 2, 2]} spacing={4}>
        <Box mt="4rem">
          <Heading
            as="h1"
            size="2xl"
            margin="auto auto"
            textAlign="center"
          >
            Books 4 Less
          </Heading>
          <Heading as="h2" size="lg" m="1rem auto" textAlign="center">
            Buy. Sell. Trade. Textbooks.
          </Heading>
          <FormControl w="50%" m="2rem auto" isRequired>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              w="100%"
              placeHolder="name@email.com"
              onChange={handleUserEmail}
            />

            <FormLabel mt="1rem">Password:</FormLabel>
            <Input
              type="text"
              w="100%"
              placeHolder=""
              onChange={handleUserPassword}
            />
          </FormControl>
          <a class="login-button" href="/">
            <span class="login-button-span">Login</span>
          </a>
          <div className="left-right-divider">
            <p className="divider-text">or</p>
          </div>
          <JoinModal />
        </Box>
        <Box mt="4rem">
          <Center justifyContent="center">
            <Image
              className="hero"
              src={hero}
              alt="college students tutoring"
            />
          </Center>
        </Box>
      </SimpleGrid>
    </>
  );
};
