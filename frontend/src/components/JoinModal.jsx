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
  Link
} from "@chakra-ui/react";
import { useRouter } from "react-router-dom";
import { useState, useRef } from "react";

export const JoinModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newUserFirstName, setNewUserFirstName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewUserFirstName = (e) => setNewUserFirstName(e.target.value);
  const handleNewUserLastName = (e) => setNewUserLastName(e.target.value);
  const handleNewUserEmail = (e) => setNewUserEmail(e.target.value);
  const handleNewUserPassword = (e) => setNewUserPassword(e.target.value);
  // const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const url = 'http://localhost:8000';

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

  const user = {
    "firstName": newUserFirstName,
    "lastName": newUserLastName,
    "email": newUserEmail,
    "password": newUserPassword
  }

const sendJSON = () => {
  console.log(user);

  axios.put(url + '/parse', user).then((response) => {
    alert(response.data)
  }).catch((error) => {
    console.log(error)
  })
}  

const sendNewUser = () => {
  axios.post(url + '/user', user).then((response) => {
    alert(response.data)
  }).catch((error) => {
    console.log(error)
  })
}

const getNewUsers = () => {
  axios.get(url + '/users').then((response) => {
    alert(JSON.stringify(response.data))
  }).catch((error) => {
    console.log(error)
  })
}

const clearUsers = () => {
  axios.put(url + '/users/clear').then((response) => {
    alert(response.data)
  }).catch((error) => {
    console.log(error)
  })
}

  return (
    <>
      <button class="join-button" type="button" onClick={onOpen}>
        <span class="join-button-span">Join now</span>
      </button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isRequired>
              <FormLabel>First name:</FormLabel>
              <Input type="text" placeHolder="First name" onChange={handleNewUserFirstName}/>
              <FormLabel mt=".5rem">Last name:</FormLabel>
              <Input type="text" placeHolder="Last name" onChange={handleNewUserLastName}/>
              <FormLabel mt=".5rem">Email:</FormLabel>
              <Input type="email" placeHolder="name@email.com" onChange={handleNewUserEmail}/>
              <FormLabel mt=".5rem">Create password:</FormLabel>
              <Input type="text" placeHolder="" onChange={handleNewUserPassword}/>
              {/* <FormLabel mt=".5rem">Confirm password:</FormLabel>
              <Input type="text" placeHolder="" onChange={handleConfirmPassword}/> */}
            </FormControl>
          </ModalBody>
          <ModalFooter>
          <ButtonGroup gap='2'>
            <Button color='white' bg="#0C97FA" variant='outline' _hover={{ bg: "white", color: "#0C97FA", border: '2px'}} onClick={sendNewUser}>Create</Button>
            <Button onClick={onClose} _hover={{ bg: "white", color: "#FF176B", border: '2px'}}>Close</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    </>
  );
};
