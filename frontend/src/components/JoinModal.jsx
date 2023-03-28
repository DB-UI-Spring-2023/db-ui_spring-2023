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
  ButtonGroup
} from "@chakra-ui/react";

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
          <ModalHeader>Create profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt="1rem" isRequired>
              <FormLabel>First name:</FormLabel>
              <Input type="text" placeHolder="First name" />
              <FormLabel mt="1rem">Last name:</FormLabel>
              <Input type="text" placeHolder="Last name" />
              <FormLabel mt="1rem">Email:</FormLabel>
              <Input type="email" placeHolder="name@email.com" />
              <FormLabel mt="1rem">School name:</FormLabel>
              <Input type="text" placeHolder="SMU" />
              <FormLabel mt="1rem">Create password:</FormLabel>
              <Input type="text" placeHolder="" />
              <FormLabel mt="1rem">Confirm password:</FormLabel>
              <Input type="text" placeHolder="" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup gap='2'>
            <Button onClick={onClose} color='white' bg="#0C97FA" variant='outline' _hover={{ bg: "white", color: "#0C97FA", border: '2px'}}>Create</Button>
            <Button onClick={onClose}>Close</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
