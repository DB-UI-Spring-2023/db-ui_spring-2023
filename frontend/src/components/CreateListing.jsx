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
  import { useState, useEffect } from "react";
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
    const [seller, setSeller ] = useState("");

    const postListing = () => {
        axios.post("http://localhost:8000/post-listing", {
          ibsn: ibsn,
          title: title,
          author: author,
          bookCondition: condition,
          bookFormat: format,
          cost: cost,
          seller: seller,
        }).then((response) => {
         
          console.log(response);
    
        });
      };

      useEffect(() => {
        axios.get("http://localhost:8000/login").then((response) => {
          if (response.data.loggedIn == true){
            setSeller(response.data.user[0].email)
          } else {
            setSeller("Not logged in.")
          }
        })
      },[seller])
  
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
  import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Button,
  Flex,
  Menu,
  Link,
  MenuButton,
  Icon,
  Text,
  MenuList,
  Heading,
} from "@chakra-ui/react";

export default function CreateListing({
  icon,
  title,
  description,
  active,
  navSize,
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu placement="right">
      <Link
        backgroundColor={active && "#AEC8CA"}
        p={3}
        borderRadius={8}
        _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
        w={navSize == "large" && "100%"}
      >
        <MenuButton w="100%">
          <Flex>
            <Icon
              as={icon}
              fontSize="xl"
              color={active ? "#82AAAD" : "gray.500"}
            />
            <Text
              ml={5}
              display={navSize == "small" ? "none" : "flex"}
            >
              {title}
            </Text>
          </Flex>
        </MenuButton>
      </Link>
      <MenuList py={0} border="none" w={200} h={200} ml={5}>
        <Flex
          pos="absolute"
          mt="calc(100px - 7.5px)"
          ml="-10px"
          width={0}
          height={0}
          borderTop="10px solid transparent"
          borderBottom="10px solid transparent"
          borderRight="10px solid #82AAAD"
        />
        <Flex
          h={600}
          w={500}
          // w="100%"
          flexDir="column"
          alignItems="center"
          justify="center"
          backgroundColor="#82AAAD"
          borderRadius="10px"
          color="#fff"
          textAlign="center"
        >
          {/* <Icon as={icon} fontSize="3xl" mb={4} /> */}
          <Heading size="md" fontWeight="normal">
            {title}
          </Heading>
          <FormControl isRequired w="75%" mb={4}>
            <FormLabel>Title:</FormLabel>
            <Input
              bgColor="white"
              color="black"
              type="text"
              placeHolder="Title"
            />
            <FormLabel mt=".5rem">Author:</FormLabel>
            <Input
              bgColor="white"
              color="black"
              type="text"
              placeHolder="Author"
            />
            <FormLabel mt=".5rem">ISBN:</FormLabel>
            <Input
              bgColor="white"
              color="black"
              type="email"
              placeHolder="ISBN"
            />
            <FormLabel mt=".5rem">Condition:</FormLabel>
            <Input
              bgColor="white"
              color="black"
              type="text"
              placeHolder="Condition"
            />
            <FormLabel mt=".5rem">Format:</FormLabel>
            <Input
              bgColor="white"
              color="black"
              type="text"
              placeHolder="Format"
            />
            <FormLabel mt=".5rem">Price:</FormLabel>
            <Input
              bgColor="white"
              color="black"
              type="text"
              placeHolder="Price"
            />
          </FormControl>
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
            >
              Submit
            </Button>
            <Button
              _hover={{
                bg: "white",
                color: "#FF176B",
                border: "2px",
              }}
            >
              Close
            </Button>
          </ButtonGroup>
        </Flex>
      </MenuList>
    </Menu>
  );
}
