/*
 * Author:          Rudy Lucas
 * filename:        Header.jsx
 * Date:            03-20-2023
 * Description:     This component represents the website header.
 *                  It is used in the Login, Registration, HomePage, and
 *                  Landing pages to display the platform logo,
 *                  and the "Sign In"/"Sign Out" buttons
 */
import "../css/Header.css";
import "../css/HomePage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import booksIcon from "../images/stack-of-books.png";
import React, { useState, useEffect, ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  useEditable,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { JoinModal } from "./JoinModal";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenSignUp,
    onOpen: onOpenSignUp,
    onClose: onCloseSignUp,
  } = useDisclosure();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState();

  const [newUserFirstName, setNewUserFirstName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  const [registerStatus, setRegisterStatus] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("Not Logged In");
  const [privileges, setPrivileges] = useState("");

  const handleUserEmail = (e) => setUserEmail(e.target.value);
  const handleUserPassword = (e) => setUserPassword(e.target.value);

  const handleNewUserFirstName = (e) =>
    setNewUserFirstName(e.target.value);
  const handleNewUserLastName = (e) =>
    setNewUserLastName(e.target.value);
  const handleNewUserEmail = (e) => setNewUserEmail(e.target.value);
  const handleNewUserPassword = (e) =>
    setNewUserPassword(e.target.value);

  const navigate = useNavigate();

  const url = "http://localhost:8000";

  const login_creds = {
    email: userEmail,
    password: userPassword,
  };

  const user = {
    firstName: newUserFirstName,
    lastName: newUserLastName,
    email: newUserEmail,
    createPass: newUserPassword,
    privileges: privileges,
  };

  const sendLogin = async (event) => {
    event.preventDefault(); // prevent default behavior of the <a> element

    try {
      const response = await axios.post(url + "/login", login_creds);
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

  const sendNewUser = () => {
    axios
      .post(url + "/register", user)
      .then((response) => {
        setRegisterStatus(true);
        setUserEmail(newUserEmail);
        setUserPassword(newUserPassword);
        //alert(registerStatus);
      })
      .catch((error) => {
        setRegisterStatus(false);
        console.log(error);
      });
  };

  const login = () => {
    axios
      .post("http://localhost:8000/login", {
        email: userEmail,
        createPass: userPassword,
      })
      .then((response) => {
        if (response.data.msg) {
          setLoginStatus(response.data.msg);
          setErrorMessage(response.data.msg);
        } else {
          setLoginStatus(response.data[0].email);
          setErrorMessage(response.data[0].email);
        }
      });
  };

  useEffect(() => {
    if (registerStatus == true) {
      onCloseSignUp();
      login();
    }
  }, [registerStatus]);

  useEffect(() => {
    axios.get("http://localhost:8000/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].email);
        navigate("/dashboard");
      } else {
        setLoginStatus("Not logged in.");
      }
    });
  }, [loginStatus]);

  return (
    <>
      <Box bg={useColorModeValue("#fff", "#1A202C")} px=".25rem">
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection="row-reverse"
        >
          <Flex alignItems={"center"} mr="2rem">
            <Stack direction={"row"} spacing={7}>
              <Button
                onClick={toggleColorMode}
                _hover={{ bg: "#252525", color: "#fff" }}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button
                className="button"
                w="5rem"
                _hover={{
                  bgGradient: "linear(to-r, #0C97FA, #16E1F5)",
                  color: "#fff",
                }}
                hideBelow="350px"
                onClick={onOpenLogin}
              >
                Login
              </Button>
              <Modal
                onClose={onCloseLogin}
                isOpen={isOpenLogin}
                isCentered
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Login:</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl isRequired>
                      <FormLabel>Username:</FormLabel>
                      <Input
                        type="text"
                        placeHolder="email@mail.com"
                        onChange={handleUserEmail}
                      />
                      <FormLabel mt=".5rem">Password:</FormLabel>
                      <Input
                        type="text"
                        placeHolder="Password"
                        onChange={handleUserPassword}
                      />
                    </FormControl>
                    <Flex mt="1rem">
                      {errorMessage && (
                        <p className="error-message">
                          <b>{errorMessage}</b>
                        </p>
                      )}
                    </Flex>
                  </ModalBody>
                  <ModalFooter>
                    <ButtonGroup gap="2">
                      <Button
                        color="white"
                        bg="#0C97FA"
                        variant="outline"
                        _hover={{
                          bg: "white",
                          color: "#0C97FA",
                          border: "2px",
                        }}
                        onClick={login}
                      >
                        Login
                      </Button>
                      <Button
                        onClick={onCloseLogin}
                        _hover={{
                          bg: "white",
                          color: "#FF176B",
                          border: "2px",
                        }}
                      >
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Button
                className="button"
                w="5rem"
                _hover={{
                  bgGradient: "linear(to-r, #49c5f6, #ff2aef)",
                  color: "#fff",
                }}
                hideBelow="350px"
                onClick={onOpenSignUp}
              >
                Sign up
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Modal onClose={onCloseSignUp} isOpen={isOpenSignUp} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>First name:</FormLabel>
              <Input
                type="text"
                placeHolder="First name"
                onChange={handleNewUserFirstName}
              />
              <FormLabel mt=".5rem">Last name:</FormLabel>
              <Input
                type="text"
                placeHolder="Last name"
                onChange={handleNewUserLastName}
              />
              <FormLabel mt=".5rem">Email:</FormLabel>
              <Input
                type="email"
                placeHolder="name@email.com"
                onChange={handleNewUserEmail}
              />
              <FormLabel mt=".5rem">Create password:</FormLabel>
              <Input
                type="text"
                placeHolder=""
                onChange={handleNewUserPassword}
              />

              {/* <FormLabel mt=".5rem">Confirm password:</FormLabel>
              <Input type="text" placeHolder="" onChange={handleConfirmPassword}/> */}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup gap="2">
              <Button
                color="white"
                bgGradient="linear(to-r, #49C5F6, #FF2AEF)"
                variant="outline"
                _hover={{
                  color: "#252525",
                  bg: "#FFF",
                  borderColor: "#252525",
                }}
                onClick={sendNewUser}
              >
                Create
              </Button>
              <Button
                onClick={onCloseSignUp}
                _hover={{
                  bg: "white",
                  color: "#FF176B",
                  border: "2px",
                }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
