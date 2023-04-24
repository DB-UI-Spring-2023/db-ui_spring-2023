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
  Select,
  Button,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


//import { Alert } from 'react-alert'

export const HomePage = () => {
  const nav = useNavigate();

  const [input, setInput] = useState("");
  const handleInputChange = (e) => setInput(e.target.value);

  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  
  const [createpword, setCreatepword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const [ errorMessage, setErrorMessage ] = useState("")

  

  
  axios.defaults.withCredentials = true;

  const login = () => {
    axios.post("http://localhost:8000/login", {
      email: email,
      last: last,
      first: first,
      createPass: createpword
    }).then((response) => {
     
      if (response.data.msg) {
        setLoginStatus(response.data.msg)
        setErrorMessage(response.data.msg)
        
      } else {
        setLoginStatus(response.data[0].email)
        setErrorMessage(response.data[0].email)
      }

    });
  };

  useEffect(() => {
    axios.get("http://localhost:8000/login").then((response) => {
      if (response.data.loggedIn == true){
        setLoginStatus(response.data.user[0].email)
  
        nav("/dashboard");
      } else {
        setLoginStatus("Not logged in.")
      }
    })
  },[loginStatus, email])
  
  return (
    <>
      <Header />
      <SimpleGrid columns={[1, 1, 1, 2, 2]} spacing={4}>
        <Box mt="3rem">
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
              onChange={(e) => {
                handleInputChange(e);
                setEmail(e.target.value);
                }}
            />

            <FormLabel mt="1rem">Password:</FormLabel>
            <Input
              type="text"
              w="100%"
              placeHolder=""
              onChange={(e) => {
                handleInputChange(e);
                setCreatepword(e.target.value);
                }}
            />
            
            
            <Flex mt="1rem" textAlign="center">
            {errorMessage && (
              <p className="error-message">
                <b>{errorMessage}</b>
              </p>
            )}
          </Flex>
          </FormControl>
          
          <Button class="login-button" href="/">
            <span onClick={login} class="login-button-span">Login</span>
          </Button>
          <div className="left-right-divider">
            <p className="divider-text">or</p>
          </div>
          <JoinModal />
         
        </Box>
        <Box mt="3rem">
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