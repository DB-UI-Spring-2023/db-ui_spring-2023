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
import { useState } from "react";
import { useRouter } from "react-router-dom";
import axios from 'axios';



export const JoinModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [firstReg, setFirstReg] = useState("");
  const [lastReg, setLastReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [createpwordReg, setCreatepwordReg] = useState("");
  const [confirmpwordReg, setConfirmpwordReg] = useState("");

  const register = () => {
    axios.post("http://localhost:8000/register", {
      firstName: firstReg,
      lastName: lastReg,
      email: emailReg,
      createPass: createpwordReg,
      confirmPass: confirmpwordReg
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <button className="join-button" type="button" onClick={onOpen}>
        <span className="join-button-span">Join now</span>
      </button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isRequired>
              <FormLabel>First name:</FormLabel>
              <Input type="text" placeholder="First name" 
              onChange={(e) => {
                setFirstReg(e.target.value);
                }}
              />
              <FormLabel mt=".5rem">Last name:</FormLabel>
              <Input type="text" placeholder="Last name" 
              onChange={(e) => {
                setLastReg(e.target.value);
                }}
              />
              <FormLabel mt=".5rem">Email:</FormLabel>
              <Input type="email" placeholder="name@email.com" 
              onChange={(e) => {
                setEmailReg(e.target.value);
                }}
              />
              <FormLabel mt=".5rem">Create password:</FormLabel>
              <Input type="text" placeholder="" 
              onChange={(e) => {
                setCreatepwordReg(e.target.value);
                }}
              />
              <FormLabel mt=".5rem">Confirm password:</FormLabel>
              <Input type="text" placeholder=""
              onChange={(e) => {
                setConfirmpwordReg(e.target.value);
                  if (createpwordReg != confirmpwordReg) {
                    console.log({meassage: "Passwords Don't Match"})
                  }
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
          <ButtonGroup gap='2'>
            <Button onClick={register} color='white' bg="#0C97FA" variant='outline' _hover={{ bg: "white", color: "#0C97FA", border: '2px'}}>Create</Button>
            <Button onClick={onClose} _hover={{ bg: "white", color: "#FF176B", border: '2px'}}>Close</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
