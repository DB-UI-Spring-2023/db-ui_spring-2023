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

export const JoinModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <Input type="text" placeHolder="First name" />
              <FormLabel mt=".5rem">Last name:</FormLabel>
              <Input type="text" placeHolder="Last name" />
              <FormLabel mt=".5rem">Email:</FormLabel>
              <Input type="email" placeHolder="name@email.com" />
              <FormLabel mt=".5rem">Create password:</FormLabel>
              <Input type="text" placeHolder="" />
              <FormLabel mt=".5rem">Confirm password:</FormLabel>
              <Input type="text" placeHolder="" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
          <ButtonGroup gap='2'>
            <Button color='white' bg="#0C97FA" variant='outline' _hover={{ bg: "white", color: "#0C97FA", border: '2px'}}>Create</Button>
            <Button onClick={onClose} _hover={{ bg: "white", color: "#FF176B", border: '2px'}}>Close</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    </>
  );
};
