/**
 * Author:          Rudy Lucas
 * filename:        Header.jsx
 * Date:            03-20-2023
 * Description:     This component represents the website header.
 *                  It is used in the Login, Registration, HomePage, and
 *                  Landing pages to display the platform logo,
 *                  and the "Sign In"/"Sign Out" buttons
 */
import "../css/Header.css";
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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { JoinModal } from "./JoinModal";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newUserFirstName, setNewUserFirstName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewUserFirstName = (e) =>
    setNewUserFirstName(e.target.value);
  const handleNewUserLastName = (e) =>
    setNewUserLastName(e.target.value);
  const handleNewUserEmail = (e) => setNewUserEmail(e.target.value);
  const handleNewUserPassword = (e) =>
    setNewUserPassword(e.target.value);

  const navigate = useNavigate();

  const url = "http://localhost:8000";

  const user = {
    firstName: newUserFirstName,
    lastName: newUserLastName,
    email: newUserEmail,
    password: newUserPassword,
  };

  const sendNewUser = () => {
    axios
      .post(url + "/newuser", user)
      .then((response) => {
        // alert(response.data)
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                _hover={{
                  bgGradient: "linear(to-r, #0C97FA, #16E1F5)",
                  color: "#fff",
                }}
                hideBelow="350px"
              >
                Login
              </Button>
              <Button
                className="button"
                _hover={{
                  bgGradient: "linear(to-r, #49c5f6, #ff2aef)",
                  color: "#fff",
                }}
                hideBelow="350px"
                onClick={onOpen}
              >
                Sign up
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
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
                bg="#0C97FA"
                variant="outline"
                _hover={{
                  bg: "white",
                  color: "#0C97FA",
                  border: "2px",
                }}
                onClick={sendNewUser}
              >
                Create
              </Button>
              <Button
                onClick={onClose}
                _hover={{
                  bg: "white",
                  color: "#FF176B",
                  border: "2px",
                }}
              >
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
