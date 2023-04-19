
  import { useState, useEffect, useDisclosure, useNavigate } from "react";
  import { useRouter } from "react-router-dom";
  import axios from 'axios';

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
  Modal,
  MenuItem,
} from "@chakra-ui/react";
import "../css/CreateListing.css";

export default function CreateListing({ icon, title, description, active, navSize }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
  
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
        <MenuButton onClick={onOpen} w="100%">
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
      <MenuList isOpen={isOpen} onClose={onClose} py={0} border="none" h="20rem" ml={4} >
        <Flex
          pos="absolute"
          mt="9.5rem"
          ml="-10px"
          width={0}
          height={0}
          borderTop="10px solid transparent"
          borderBottom="10px solid transparent"
          borderRight="10px solid #19252e"
        />
        <Flex
          className="listing-modal"
          h={600}
          w={500}
          flexDir="column"
          alignItems="center"
          justify="center"
          borderRadius="10px"
          color="#fff"
          textAlign="center"
        >
          <Heading size="md" fontWeight="normal">
            {title}
          </Heading>
          <FormControl isRequired w="75%" mb={4}>
            <FormLabel>Title:</FormLabel>
            <Input
              className="listing-input"
              bgColor="#82AAAD"
              type="text"
              placeHolder="Title"
              onChange={(e) => {
                handleInputChange(e)
                setTitle(e.target.value);
                }}
            />
            <FormLabel mt=".5rem">Author:</FormLabel>
            <Input
              className="listing-input"            
              bgColor="#82AAAD"
              type="text"
              placeHolder="Author"
              onChange={(e) => {
                handleInputChange(e)
                setAuthor(e.target.value);
                }}
            />
            <FormLabel mt=".5rem">ISBN:</FormLabel>
            <Input
              className="listing-input"
              bgColor="#82AAAD"
              type="text"
              placeHolder="ISBN"
              onChange={(e) => {
                handleInputChange(e)
                setibsn(e.target.value);
                }}
            />
            <FormLabel mt=".5rem">Condition:</FormLabel>
            <Input
              className="listing-input"
              bgColor="#82AAAD"
              type="text"
              placeHolder="Condition"
              onChange={(e) => {
                handleInputChange(e)
                setCondition(e.target.value);
                }}
            />
            <FormLabel mt=".5rem">Format:</FormLabel>
            <Input
              className="listing-input"
              bgColor="#82AAAD"
              type="text"
              placeHolder="Format"
              onChange={(e) => {
                handleInputChange(e)
                setFormat(e.target.value);
                }}
            />
            <FormLabel mt=".5rem">Price:</FormLabel>
            <Input
              className="listing-input"
              bgColor="#82AAAD"
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
              bg="#21575c"
              border="2px solid #fff"
              borderRadius={4}
              variant="outline"
              _hover={{
                bg: "white",
                color: "#2d676c",
                border: "2px",
              }}
              onClick={postListing}
            >
              Submit
            </Button>
           <MenuItem
            onClick={onClose}
            color="white"
            border="2px solid #fff"
            borderRadius={4}
            width='auto'
              bg="#21575c"
              variant="outline"
              _hover={{
                bg: "white",
                color: "#2d676c",
                border: "2px",
              }}
           >
            
            <b>Close</b>
           </MenuItem>
          </ButtonGroup>
        </Flex>
      </MenuList>
    </Menu>
  );
}
