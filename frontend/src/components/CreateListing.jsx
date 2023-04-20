
  import { useState, useEffect, useDisclosure, useNavigate } from "react";
  import "../css/CreateListing.css";
  import { useRouter } from "react-router-dom";
  import axios from 'axios';

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

export default function CreateListing({ icon, title, description, active, navSize }) {

    //const { isOpen, onOpen, onClose } = useDisclosure();
  
    const [input, setInput] = useState("");
    const handleInputChange = (e) => setInput(e.target.value);

    const [ibsn, setibsn] = useState("");
    const [bookTitle, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [condition, setCondition] = useState("");
    const [format, setFormat] = useState("");
    const [cost, setCost] = useState("");
    const [seller, setSeller ] = useState("");

    const postListing = () => {
        axios.post("http://localhost:8000/post-listing", {
          ibsn: ibsn,
          title: bookTitle,
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
    
    <Menu placement="right"  >
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
          className="menu-listing"
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
              onChange={(e) => {
                handleInputChange(e)
                setTitle(e.target.value);
                }}
            />
            <FormLabel mt=".5rem">Author:</FormLabel>
            <Input
              bgColor="white"
              color="black"
              type="text"
              placeHolder="Author"
              onChange={(e) => {
                handleInputChange(e)
                setAuthor(e.target.value);
                }}
            />
            <FormLabel mt=".5rem">ISBN:</FormLabel>
            <Input
              bgColor="white"
              color="black"
              type="email"
              placeHolder="ISBN"
              onChange={(e) => {
                handleInputChange(e)
                setibsn(e.target.value);
                }}
            />
            <FormLabel mt=".5rem">Condition:</FormLabel>
            <Input
              bgColor="white"
              color="black"
              type="text"
              placeHolder="Condition"
              onChange={(e) => {
                handleInputChange(e)
                setCondition(e.target.value);
                }}
            />
            <FormLabel mt=".5rem">Format:</FormLabel>
            <Input
              bgColor="white"
              color="black"
              type="text"
              placeHolder="Format"
              onChange={(e) => {
                handleInputChange(e)
                setFormat(e.target.value);
                }}
            />
            <FormLabel mt=".5rem">Price:</FormLabel>
            <Input
              bgColor="white"
              color="black"
              type="text"
              placeHolder="Price"
              onChange={(e) => {
                handleInputChange(e)
                setCost(e.target.value);
                }}
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
              onClick={postListing}
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
