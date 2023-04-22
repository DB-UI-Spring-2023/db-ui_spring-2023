import css from "../css/ProfilePage.css";
import React from "react";
import {
  Button,
  Grid,
  GridItem,
  Heading,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BookList } from "../components";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Wrap,
  Collapse,
} from "@chakra-ui/react";
import {
  Avatar,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import axios from "axios";
import {
  FiHome,
  FiSettings,
  FiPlusCircle,
  FiPackage,
  FiUser,
  FiAlignLeft,
} from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import { MdSearch } from "react-icons/md";

export const ProfilePage = () => {
  // const [rating, setRating] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [privileges, setPrivileges] = useState("");
  const [createpword, setCreatepword] = useState("");
  const [confirmpword, setConfirmpword] = useState("");
  const [books, setBooks] = useState([]);
  const [navSize, setNavSize] = useState("large");
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const nav = useNavigate();

  useEffect(() => {
    const fetchBooksBySeller = async (email) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/books/${email}`
        );
        console.log("Books fetched successfully:", response.data);
        setBooks(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooksBySeller(email);
  }, [email]);

  useEffect(() => {
    axios.get(`http://localhost:8000/login`).then((response) => {
      if (response.data.loggedIn == true) {
        setFirst(response.data.user[0].firstName);
        setEmail(response.data.user[0].email);
        setLast(response.data.user[0].lastName);
        setPrivileges(response.data.user[0].privileges);
      } else {
        setFirst("Not logged in.");
      }
    });
  });

  const handleUpdateProfile = () => {};

  const handleDeleteListing = (listingId) => {
    // Logic to delete a user's listing
    // ...
  };

  // useState hook to manage the visibility of personal information
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  // Function to toggle the visibility of personal information
  const handleTogglePersonalInfo = () => {
    setShowPersonalInfo(!showPersonalInfo);
  };

  return (
    <>
      <Grid
        templateAreas={`"header header"
                      "nav main"
                      "footer footer"`}
        gridTemplateRows={""}
        gridTemplateColumns={"15% 1fr"}
        h="auto"
        gap="2"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem className="header-color" area={"header"}>
          <Stack direction="row">
            <InputGroup className="input-group" m="2rem auto" w="50%">
              <InputLeftElement
                pointerEvents="none"
                children={<MdSearch color="#606060" />}
              />
              <Input
                value={searchTerm}
                onChange={handleSearchTermChange}
                variant="filled"
                bgColor="#82AAAD"
                color="#606060"
                placeholder="Search for a textbook"
              />
            </InputGroup>
          </Stack>
        </GridItem>

        <GridItem pl="2" area={"nav"}>
          <Sidebar />
        </GridItem>

        <GridItem
          p={2}
          pl="1"
          bgColor="#82AAAD"
          area={"main"}
          h="30rem"
          display="flex"
          flexDirection="column"
          overflowY="auto"
          // Insert profile elements below
        >
          <Heading marginY="auto" as="h1" textAlign="center" className="head">
            My Account
          </Heading>
          <div className="profileInfo">
            
            <Image
              mt=".5rem"
              borderRadius="full"
              boxSize="150px"
              src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.webp"
              alt="default pic"
            />
            <Badge>
              {first} {last}{" "}
            </Badge>
            <h2>({privileges})</h2>

            <Box>
              <Flex justifyContent="center">
                <Box mt="4">
                  <Button
                    colorScheme="teal"
                    onClick={handleTogglePersonalInfo}
                    mb={4}
                  >
                    Update Personal Information
                  </Button>
                  <Collapse in={showPersonalInfo}>
                    {/* Personal Information */}
                    <Box>
                      <Flex justifyContent="center">
                        <Box mt="4">
                          <Text fontSize="2xl" fontWeight="bold">
                            Personal Information
                          </Text>
                          <Divider />
                          <Stack spacing={4}>
                            <FormControl>
                              <FormLabel>First Name</FormLabel>
                              <Input
                                type="text"
                                placeholder={first}
                                onChange={(e) => setFirst(e.target.value)}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Last Name</FormLabel>
                              <Input
                                type="text"
                                placeholder={last}
                                onChange={(e) => setLast(e.target.value)}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Email</FormLabel>
                              <Input
                                type="email"
                                placeholder={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Password</FormLabel>
                              <Input
                                type="password"
                                placeholder={createpword}
                                onChange={(e) => setCreatepword(e.target.value)}
                              />
                            </FormControl>
                            <Button
                              colorScheme="teal"
                              onClick={handleUpdateProfile}
                            >
                              Update Profile
                            </Button>
                          </Stack>
                        </Box>
                      </Flex>
                    </Box>
                  </Collapse>
                </Box>
              </Flex>
            </Box>

            <h4>Current Rating</h4>

            <h4>Temp #Reviews</h4>
            <Textarea placeholder="Here is a sample placeholder" />
            <h4>Temp #Listings</h4>

            <Wrap spacing={4} width="100%">
              {books.map((book) => (
                <BookList key={book.IBSN} book={book} />
              ))}
            </Wrap>

            <h4>Temp #Purchases Log</h4>
            <Container>
              <Box>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Assumenda, quia temporibus eveniet a libero incidunt
                    suscipit
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                  </ListItem>
                  {/* You can also use custom icons from react-icons */}
                  <ListItem>
                    <ListIcon as={WarningIcon} color="green.500" />
                    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                  </ListItem>
                </List>
              </Box>
            </Container>
          </div>
        </GridItem>
      </Grid>
    </>
  );
};
