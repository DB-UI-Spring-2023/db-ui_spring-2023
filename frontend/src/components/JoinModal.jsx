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
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useRouter } from "react-router-dom";

export const JoinModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate()

  const [input, setInput] = useState("");
  const handleInputChange = (e) => setInput(e.target.value);

  const [firstReg, setFirstReg] = useState("");
  const [lastReg, setLastReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [createpwordReg, setCreatepwordReg] = useState("");
  const [confirmpwordReg, setConfirmpwordReg] = useState("");

  const [regStatus, setRegStatus] = useState(false);

  const [privileges, setPrivileges] = useState("");

  

  const register = () => {
    axios.post("http://localhost:8000/register", {
      firstName: firstReg,
      lastName: lastReg,
      email: emailReg,
      createPass: createpwordReg,
      confirmPass: confirmpwordReg,
      privileges: privileges
    }).then((response) => {
      navigate("/dashboard");
      console.log(response);
      setRegStatus(true)
     
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    if (regStatus == true) {
      navigate("/dashboard")
    }
  },[regStatus])

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
              <Input type="text" placeholder="First name" 
              onChange={(e) => {
                handleInputChange(e)
                setFirstReg(e.target.value);
                }}
              />
              <FormLabel mt=".5rem">Last name:</FormLabel>
              <Input type="text" placeholder="Last name" 
              onChange={(e) => {
                handleInputChange(e)
                setLastReg(e.target.value);
                }}
              />
              <FormLabel mt=".5rem">Email:</FormLabel>
              <Input type="email" placeholder="name@email.com" 
              onChange={(e) => {
                handleInputChange(e)
                setEmailReg(e.target.value);
                }}
              />
              <FormLabel mt=".5rem">Create password:</FormLabel>
              <Input type="text" placeholder="" 
              onChange={(e) => {
                handleInputChange(e)
                setCreatepwordReg(e.target.value);
                }}
              />
              <FormLabel mt=".5rem">Confirm password:</FormLabel>
              <Input type="text" placeholder=""
              onChange={(e) => {
                handleInputChange(e)
                setConfirmpwordReg(e.target.value);
                }}
              />
              <FormLabel>User Privileges</FormLabel>
              <Select
              placeholder="Select privileges"
              value={privileges}
              onChange={(e) => {setPrivileges(e.target.value);}}
            >
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </Select>
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
