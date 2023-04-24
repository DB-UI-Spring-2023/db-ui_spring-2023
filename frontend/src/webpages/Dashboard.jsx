
import { InputGroup,InputLeftElement,Box, Wrap, WrapItem, Checkbox, CheckboxGroup, Text, Input, Button, Grid, GridItem, Stack, Menu, MenuButton, IconButton, useColorMode } from "@chakra-ui/react";

import { useState, useRef, useEffect } from "react"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { CreateListing, BookList } from "../components";

import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { MdDensityMedium, MdSearch } from 'react-icons/md';
import Sidebar from "../components/Sidebar";

export const Dashboard = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);

  const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [privileges, setPrivileges] = useState("");

  const [navSize, setNavSize] = useState("large");

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchBooksBySeller = async (email) => {
        try {
          const response = await axios.get(`http://localhost:8000/books/${email}`);
          console.log('Books fetched successfully:', response.data);
          setMyBooks(response.data);
          return response.data;
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
    fetchBooksBySeller(email);
  },[email]);

  useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/dashboard-books`,{
            params: {
              searchTerm,
            },
          });
          setBooks(response.data);
        } catch (error) {
          console.error("Error fetching books data:", error);
        }
      };
      fetchBooks();
    },[searchTerm]);

  const nav = useNavigate();

    const [loginStatus, setLoginStatus] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/login").then((response) => {
          if (response.data.loggedIn == true){
            setLoginStatus(response.data.user[0].email)
            setEmail(response.data.user[0].email)

          } else {
            nav("/")
            setLoginStatus("Not logged in.")
          }
        })
      })

      useEffect(() => {
        const fetchUserInfo = async (email) => {
            try {
              const response = await axios.get(`http://localhost:8000/users/${email}`);
              console.log('User info fetched successfully:', response.data);
              setFirst(response.data[0].firstName);
              setLast(response.data[0].lastName);
              setEmail(response.data[0].email);
              setPrivileges(response.data[0].privileges)
              return response.data;
            } catch (error) {
              console.error('Error fetching User:', error);
            }
          };
        fetchUserInfo(email);
      },[loginStatus]);


  

  return (

    <Grid
      templateAreas={`"header header"
                      "nav main"
                      "footer footer"`}
      gridTemplateRows={"auto 1fr auto"}
      gridTemplateColumns={"12% 1fr"}
      h="auto"
      gap="2"
      color="blackAlpha.700"
      fontWeight="bold"
    >
    
      <GridItem className="header-color" area={"header"}>
        <Stack direction="row">
          <InputGroup className="input-group" m="2rem auto" w="50%">
            <InputLeftElement
              pointerEvents='none'
              children={<MdSearch color='#606060' />}
            />
            <Input value={searchTerm} onChange={handleSearchTermChange} variant='filled' bgColor="#82AAAD" color="#606060" placeholder='Search for a textbook' />
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

      >
        <Box
          p={4}
        >
          <Text color="white">Current Listings</Text>
          <Wrap spacing={2} zIndex={1}>
            {books.map((book) => (
              <Box key={book.IBSN} transform="scale(0.8)" transformOrigin="center" zIndex={1}>
                <BookList book={book} privileges={privileges} />
              </Box>
            ))}
          </Wrap>
        </Box>
      </GridItem>
      

      <GridItem 
        p={2}
        pl="1"
        bgColor="#82AAAD"
        area={"footer"}
        marginLeft={navSize == "small" ? "75px" : "200px"}
        h="30rem"
        display="flex"
        flexDirection="column"
      
        overflowY="auto"
      >
        <Box flexGrow="1">
            <Text color="white">Your Listings</Text>
            <Wrap spacing={2}  mx="2">
              {myBooks.map((book2) => (
                <Box key={book2.IBSN} transform="scale(0.8)" transformOrigin="center" >
                  <BookList book={book2} privileges={"Admin"} />
              </Box>
              ))}
            </Wrap>
        </Box>
      </GridItem>

    </Grid>

  );
};









