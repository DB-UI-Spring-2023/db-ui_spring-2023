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

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [privileges, setPrivileges] = useState("");
  const [createpword, setCreatepword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const [books, setBooks] = useState([]);
  const [confirmpword, setConfirmpword] = useState("");
  const [updateFirst, setUpdateFirst] = useState("");
  const [updateLast, setUpdateLast] = useState("");
  const [updatePass, setUpdatePass] = useState("");

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
    const fetchUserInfo = async (email) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/${email}`
        );
        console.log("User info fetched successfully:", response.data);
        setFirst(response.data[0].firstName);
        setLast(response.data[0].lastName);
        setEmail(response.data[0].email);
        setCreatepword(response.data[0].createPass);
        setPrivileges(response.data[0].privileges);
        return response.data;
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };
    fetchUserInfo(email);
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/login`).then((response) => {
      if (response.data.loggedIn == true) {
        setEmail(response.data.user[0].email);
      } else {
        nav("/");
      }
    });
  });

  const handleUpdateName = async () => {
    try {
      const updatedProfile = {
        firstName: updateFirst,
        lastName: updateLast,
        email: email,
      };

      const response = await axios.put(
        `http://localhost:8000/profile/update-name`,
        updatedProfile
      );

      if (response.status === 200) {
        alert("Profile updated successfully");
        setFirst(updateFirst);
        setLast(updateLast);
        handleTogglePersonalInfo();
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  const handleUpdatePassword = async () => {
    if (createpword == confirmpword) {
      try {
        const updatedProfile = {
          password: updatePass,
          email: email,
        };

        const response = await axios.put(
          `http://localhost:8000/profile/update-password`,
          updatedProfile
        );

        if (response.status === 200) {
          alert("Profile updated successfully");
          handleTogglePasswordReset();
        } else {
          alert("Error updating profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile");
      }
    } else {
      alert("Current Password Incorrect");
    }
  };

  const handleDeleteListing = (listingId) => {
    // Logic to delete a user's listing
    // ...
  };

  // useState hook to manage the visibility of personal information
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showPasswordReset, setShowPasswordRest] = useState(false);

  // Function to toggle the visibility of personal information
  const handleTogglePersonalInfo = () => {
    setShowPersonalInfo(!showPersonalInfo);
  };

  // Function to toggle the visibility of personal information
  const handleTogglePasswordReset = () => {
    setShowPasswordRest(!showPasswordReset);
  };

  return (
    <>
      <Flex direction="column" className="header-color" py="2rem">
        <h1><b>Profile</b></h1>
      </Flex>
      <Grid templateColumns="12% 1fr" gap={10} m="2rem 2rem auto 2rem">
        <GridItem>
          <Sidebar />
        </GridItem>

        <Box gridColumn="2" bg="tomato" height="auto">
          <div className="container">
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

              <Flex justifyContent="center">
                <Box mt="4">
                  <Button
                    colorScheme="teal"
                    onClick={handleTogglePersonalInfo}
                    mb={4}
                  >
                    Update Name
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
                                onChange={(e) => setUpdateFirst(e.target.value)}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Last Name</FormLabel>
                              <Input
                                type="text"
                                placeholder={last}
                                onChange={(e) => setUpdateLast(e.target.value)}
                              />
                            </FormControl>
                            <Button
                              colorScheme="teal"
                              onClick={handleUpdateName}
                            >
                              Update Name
                            </Button>
                          </Stack>
                        </Box>
                      </Flex>
                    </Box>
                  </Collapse>
                </Box>
              </Flex>

              <Box>
                <Flex justifyContent="center">
                  <Box>
                    <Button
                      colorScheme="teal"
                      onClick={handleTogglePasswordReset}
                      mb={4}
                    >
                      Reset Password
                    </Button>
                    <Collapse in={showPasswordReset}>
                      {/* Personal Information */}
                      <Box>
                        <Flex justifyContent="center">
                          <Box mt="4">
                            <Text fontSize="2xl" fontWeight="bold">
                              Password Reset
                            </Text>
                            <Divider />
                            <Stack spacing={4}>
                              <FormControl>
                                <FormLabel> Current Password</FormLabel>
                                <Input
                                  type="password"
                                  placeholder={createpword}
                                  onChange={(e) =>
                                    setConfirmpword(e.target.value)
                                  }
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel> New Password</FormLabel>
                                <Input
                                  type="password"
                                  placeholder={createpword}
                                  onChange={(e) =>
                                    setUpdatePass(e.target.value)
                                  }
                                />
                              </FormControl>
                              <Button
                                colorScheme="teal"
                                onClick={handleUpdatePassword}
                              >
                                Reset Password
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
              <Textarea
                w="50%"
                placeholder="Write a review"
                rows="4"
                bgColor="white"
                mb="1rem"
              />
              <Button colorScheme="teal">
                Submit
              </Button>
              <h4>Temp #Listings</h4>

              <Stack direction="row" alignItems="center" justifyContent="center" spacing={4} width="100%" mb="2rem">
                {books.map((book) => (
                  <BookList key={book.IBSN} book={book} />
                ))}
              </Stack>

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
                      Quidem, ipsam illum quis sed voluptatum quae eum fugit
                      earum
                    </ListItem>
                    {/* You can also use custom icons from react-icons */}
                    <ListItem>
                      <ListIcon as={WarningIcon} color="green.500" />
                      Quidem, ipsam illum quis sed voluptatum quae eum fugit
                      earum
                    </ListItem>
                  </List>
                </Box>
              </Container>
            </div>
          </div>
        </Box>
      </Grid>
    </>
  );
};
