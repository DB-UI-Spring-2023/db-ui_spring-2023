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

  export const CreateListing = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const [input, setInput] = useState("");
    const handleInputChange = (e) => setInput(e.target.value);

    const [ibsn, setibsn] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [condition, setCondition] = useState("");
    const [format, setFormat] = useState("");
    const [cost, setCost] = useState("");

    const postListing = () => {
        axios.post("http://localhost:8000/post-listing", {
          ibsn: ibsn,
          title: title,
          author: author,
          bookCondition: condition,
          bookFormat: format,
          cost: cost
        }).then((response) => {
         
          console.log(response);
    
        });
      };
  
    return (
      <>
        <button class="join-button" type="button" onClick={onOpen}>
          <span class="join-button-span">Create Listing</span>
        </button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a Listing</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <FormControl isRequired>
            <FormLabel>IBSN:</FormLabel>
                <Input type="text" placeholder="IBSN" 
                onChange={(e) => {
                  handleInputChange(e)
                  setibsn(e.target.value);
                  }}
                />
                <FormLabel mt=".5rem">Title:</FormLabel>
                <Input type="text" placeholder="Title" 
                onChange={(e) => {
                  handleInputChange(e)
                  setTitle(e.target.value);
                  }}
                />
                <FormLabel mt=".5rem">Author:</FormLabel>
                <Input type="text" placeholder="Author" 
                onChange={(e) => {
                  handleInputChange(e)
                  setAuthor(e.target.value);
                  }}
                />
                <FormLabel mt=".5rem">Format:</FormLabel>
                <Input type="text" placeholder="Format: (Hardcover, Softcover)" 
                onChange={(e) => {
                  handleInputChange(e)
                  setFormat(e.target.value);
                  }}
                />
                <FormLabel mt=".5rem">Condition:</FormLabel>
                <Input type="text" placeholder="" 
                onChange={(e) => {
                  handleInputChange(e)
                  setCondition(e.target.value);
                  }}
                />
                <FormLabel mt=".5rem">Cost:</FormLabel>
                <Input type="text" placeholder=""
                onChange={(e) => {
                  handleInputChange(e)
                  setCost(e.target.value);
                  }}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
            <ButtonGroup gap='2'>
              <Button onClick={postListing} color='white' bg="#0C97FA" variant='outline' _hover={{ bg: "white", color: "#0C97FA", border: '2px'}}>Post</Button>
              <Button onClick={onClose} _hover={{ bg: "white", color: "#FF176B", border: '2px'}}>Close</Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      
      </>
    );
  };
  