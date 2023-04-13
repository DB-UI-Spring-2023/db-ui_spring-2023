import axios from "axios";
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
import { useNavigate, useRouter } from "react-router-dom";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserEmail = (e) => setUserEmail(e.target.value);
  const handleUserPassword = (e) => setUserPassword(e.target.value);

  const url = "http://localhost:8000";
  const user = {
    email: userEmail,
    password: userPassword,
  };
  // package all the data in user as a JSON
  const sendJSON = () => {
    console.log(user);
    axios
      .put(url + "/parse", user)
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendLogin = async (event) => {
    event.preventDefault(); // prevent default behavior of the <a> element

    try {
      const response = await axios.post(url + "/login", user);
      // alert(response.data);
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

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
          <FormControl w="50%" m="2rem auto 1rem auto" isRequired>
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
              placeHolder="smu2023"
              onChange={handleUserPassword}
            />
          </FormControl>
          <Center>
            {errorMessage && (
              <p className="error-message">
                <b>{errorMessage}</b>
              </p>
            )}
          </Center>
          <a className="login-button" href="/" onClick={sendLogin}>
            <span className="login-button-span">Login</span>
          </a>
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
