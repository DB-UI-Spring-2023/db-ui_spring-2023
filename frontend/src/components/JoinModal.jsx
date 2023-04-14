/*
 * Author:          Rudy Lucas
 * filename:        JoinModal.jsx
 * Date:            03-20-2023
 * Description:     This component is a modal that activates when 
 *                  attempting to sign up for an account.
 */

import axios from "axios";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  ButtonGroup,
  Text,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const JoinModal = () => {
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
  // const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const navigate = useNavigate();

  const url = "http://localhost:8000";

  // check if we are connecting
  const checkAPI = () => {
    axios
      .get(url + "/")
      .then((respone) => {
        alert(respone.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // assign firstName, lastName, email, and password to user
  const user = {
    firstName: newUserFirstName,
    lastName: newUserLastName,
    email: newUserEmail,
    password: newUserPassword,
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

  // send and post the new user data to the backend and table,
  // then, navigate the new user to their dashboard
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

  const getNewUsers = () => {
    axios
      .get(url + "/newusers")
      .then((response) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearUsers = () => {
    axios
      .put(url + "/newusers/clear")
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button class="sign-up-button" type="button" onClick={onOpen}>
        <span class="sign-up-button-span">Sign up</span>
      </button>
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
                bgGradient='linear(to-r, #49C5F6, #FF2AEF)'
                variant="outline"
                _hover={{
                  color: '#252525',
                  bg: '#FFF',
                  borderColor: '#252525'
                }}
                onClick={sendNewUser}
              >
                Create
              </Button>
              {/*<Button
                color="white"
                bgGradient='linear(to-r, #49C5F6, #FF2AEF)'
                variant="outline"
                _hover={{
                  color: '#252525',
                  bg: '#FFF',
                  borderColor: '#252525'
                }}
                onClick={clearUsers}
              >
                Clear Users
              </Button>*/}
              <Button
                onClick={onClose}
                _hover={{
                  color: "red",
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
