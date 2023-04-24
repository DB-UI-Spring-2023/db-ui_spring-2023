import { useState, useEffect, useNavigate } from "react";
import "../css/CreateListing.css";
import { useRouter } from "react-router-dom";
import axios from "axios";

import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Button,
  Flex,
  Link,
  Icon,
  Text,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
} from "@chakra-ui/react";

export default function CreateListing({
  icon,
  title,
  description,
  active,
  navSize,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [input, setInput] = useState("");
  const handleInputChange = (e) => setInput(e.target.value);

  const [ibsn, setibsn] = useState("");
  const [bookTitle, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [condition, setCondition] = useState("");
  const [format, setFormat] = useState("");
  const [cost, setCost] = useState("");
  const [seller, setSeller] = useState("");

  const postListing = () => {
    axios
      .post("http://localhost:8000/post-listing", {
        ibsn: ibsn,
        title: bookTitle,
        author: author,
        bookCondition: condition,
        bookFormat: format,
        cost: cost,
        seller: seller,
      })
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:8000/login").then((response) => {
      if (response.data.loggedIn == true) {
        setSeller(response.data.user[0].email);
      } else {
        setSeller("Not logged in.");
      }
    });
  }, [seller]);

  return (
    <>
      <Link
        onClick={onOpen}
        backgroundColor={active && "#AEC8CA"}
        p={3}
        borderRadius={8}
        _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
        w={navSize === "large" && "100%"}
      >
        <Flex>
          <Icon
            as={icon}
            fontSize="xl"
            color={active ? "#82AAAD" : "gray.500"}
          />
          <Text ml={5} display={{ base: "none", lg: "flex" }}>
            {title}
          </Text>
        </Flex>
      </Link>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mb={4}>
              <FormLabel>Title:</FormLabel>
              <Input
                bgColor="white"
                color="black"
                type="text"
                placeHolder="Title"
                onChange={(e) => {
                  handleInputChange(e);
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
                  handleInputChange(e);
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
                  handleInputChange(e);
                  setibsn(e.target.value);
                }}
              />
              <FormLabel mt=".5rem">Condition:</FormLabel>
              <Select
                placeholder="Select"
                bgColor="white"
                color="black"
                type="text"
                placeHolder="Condition"
                onChange={(e) => {
                  handleInputChange(e);
                  setCondition(e.target.value);
                }}
              >
                <option>New</option>
                <option>Used</option>
              </Select>
              <FormLabel mt=".5rem">Format:</FormLabel>
              <Select
                placeholder="Select"
                bgColor="white"
                color="black"
                type="text"
                placeHolder="Condition"
                onChange={(e) => {
                  handleInputChange(e);
                  setFormat(e.target.value);
                }}
              >
                <option>Hard cover</option>
                <option>Paperback</option>
              </Select>
              <FormLabel mt=".5rem">Price:</FormLabel>
              <Input
                bgColor="white"
                color="black"
                type="text"
                placeHolder="Price"
                onChange={(e) => {
                  handleInputChange(e);
                  setCost(e.target.value);
                }}
              />
              <Flex justifyContent="center">
                <Button mt={4} colorScheme="teal" type="submit">
                  Submit
                </Button>
                <Button
                  mt={4}
                  ml={4}
                  colorScheme="gray"
                  type="submit"
                  border="1px solid red"
                  color="red"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Flex>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
