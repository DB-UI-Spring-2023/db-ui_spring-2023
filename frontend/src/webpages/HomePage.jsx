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
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const handleInputChange = (e) => setInput(e.target.value);

  const [emailReg, setEmailReg] = useState("");
  const [createpwordReg, setCreatepwordReg] = useState("");
  const [confirmpwordReg, setConfirmpwordReg] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));

  const login = () => {
    axios.post("http://localhost:8000/login", {
      email: emailReg,
      createPass: createpwordReg,
      confirmPass: confirmpwordReg
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message)
        setauthenticated(true)
        localStorage.setItem("authenticated", true)
        navigate("/dashboard")
      } else {
        setLoginStatus(response.data[0].email)
      }
    });
  };



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
        <GridItem area={"nav"} bg="red" color='white'>
          <Heading>{loginStatus}</Heading>
        </GridItem>
        <GridItem area={"main"} m="auto">
          <Heading
            as="h1"
            size="2xl"
            margin="auto auto"
            textAlign="center"
          >
            Books 4 Less
          </Heading>
          <Heading as="h2" size="lg" mt="2rem" textAlign="center">
            Buy. Sell. Textbooks.
          </Heading>
          <FormControl mt="2rem" isRequired>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              w='100%'
              placeholder="name@email.com"
              onChange={(e) => {
                handleInputChange(e);
                setEmailReg(e.target.value);
                }}
            />

            <FormLabel mt="1rem">Password:</FormLabel>
            <Input
              type="text"
              w='100%'
              placeholder=""
              onChange={(e) => {
                handleInputChange(e);
                setCreatepwordReg(e.target.value);
                setConfirmpwordReg(e.target.value);
                }}
            />
          </FormControl>
          <a className="login-button" href="/">
            <span onClick={login} className="login-button-span">Sign in</span>
          </a>
          <div className="left-right-divider">
            <p className="divider-text">or</p>
          </div>
          <JoinModal />
        </GridItem>
        <GridItem area={"hero"} m='auto'>
          <Center justifyContent='center'>
          <Image className="hero" src={hero} alt="college students tutoring" /></Center>
        </GridItem>
      </Grid>
    </>
  );
};
