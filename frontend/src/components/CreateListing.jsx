import React, { useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import "../css/CreateListing.css";
import { useNavigate } from "react-router";

export default function CreateListing({
  icon,
  title,
  active,
  navSize,
}) {
    const navigate = useNavigate();

    const handleNavigation = () => {
      navigate("/listings");
    };

    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Menu placement="right">
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
      <MenuList isOpen={isOpen} onClose={onClose} py={0} border="none" h="20rem" ml={4}>
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
            />
            <FormLabel mt=".5rem">Author:</FormLabel>
            <Input
              className="listing-input"            
              bgColor="#82AAAD"
              type="text"
              placeHolder="Author"
            />
            <FormLabel mt=".5rem">ISBN:</FormLabel>
            <Input
              className="listing-input"
              bgColor="#82AAAD"
              type="email"
              placeHolder="ISBN"
            />
            <FormLabel mt=".5rem">Condition:</FormLabel>
            <Input
              className="listing-input"
              bgColor="#82AAAD"
              type="text"
              placeHolder="Condition"
            />
            <FormLabel mt=".5rem">Format:</FormLabel>
            <Input
              className="listing-input"
              bgColor="#82AAAD"
              type="text"
              placeHolder="Format"
            />
            <FormLabel mt=".5rem">Price:</FormLabel>
            <Input
              className="listing-input"
              bgColor="#82AAAD"
              type="text"
              placeHolder="Price"
            />
          </FormControl>
          <ButtonGroup gap="2">
            <Button
              onClick={handleNavigation}
              color="white"
              bg="#21575c"
              variant="outline"
              _hover={{
                bg: "white",
                color: "#2d676c",
                border: "2px",
              }}
            >
              Submit
            </Button>
            <Button
              onClick={onClose}
              color="white"
              bg="#21575c"
              variant="outline"
              _hover={{
                bg: "white",
                color: "#2d676c",
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
