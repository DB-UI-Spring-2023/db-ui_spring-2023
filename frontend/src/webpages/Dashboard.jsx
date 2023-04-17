
import { Box, Wrap, WrapItem, Checkbox, CheckboxGroup, Text, Input, Button, Grid, GridItem, Stack, Menu, MenuButton, IconButton, useColorMode } from "@chakra-ui/react";

import { useState, useRef, useEffect } from "react"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { CreateListing, BookList } from "../components";

import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { MdDensityMedium } from 'react-icons/md';
import Sidebar from "../components/Sidebar";

export const Dashboard = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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
          const response = await axios.get("http://localhost:8000/books", {
            params: {
              searchTerm,
              minPrice,
              maxPrice,
            },
          });
          setBooks(response.data);
        } catch (error) {
          console.error("Error fetching books data:", error);
        }
      };
      fetchBooks();
    }, [searchTerm, minPrice, maxPrice]);

  const nav = useNavigate();

    const [loginStatus, setLoginStatus] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/login").then((response) => {
          if (response.data.loggedIn == true){
            setLoginStatus(response.data.user[0].email)
            setFirst(response.data.user[0].firstName)
            setEmail(response.data.user[0].email)
            setLast(response.data.user[0].lastName)
            setPrivileges(response.data.user[0].privileges)
          } else {
            nav("/")
            setLoginStatus("Not logged in.")
          }
        })
      })

      // useEffect(() => {
      //   fetchBooks();
      // }, [searchTerm, minPrice, maxPrice]);

  // const fetchBooks = async () => {
  //   try {
  //     // Construct query string for filters
  //     let queryString = `http://localhost:8000/books?search=${searchTerm}`;
  //     if (minPrice) {
  //       queryString += `&minPrice=${minPrice}`;
  //     }
  //     if (maxPrice) {
  //       queryString += `&maxPrice=${maxPrice}`;
  //     }

  //     const response = await axios.get(queryString);
  //     const data = response.data;
  //     setBooks(data);
  //   } catch (error) {
  //     console.error("Error fetching books:", error);
  //   }
  // };

  

  return (

    <Grid
      templateAreas={`"header header"
                      "nav main"
                      "nav footer"`}
      gridTemplateRows={"auto 1fr auto"}
      gridTemplateColumns={"3 1fr"}
      h="100vh"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
    
      <GridItem p={2} bg="salmon" area={"header"}>
        <Stack direction='row'>
          <Input value={searchTerm} onChange={handleSearchTermChange} mt='2rem' ml='auto' mr='auto' w='90%' variant='filled' placeholder='Enter Textbook Keywords...' />
          
          <Menu >
              <MenuButton mt='2rem' mr='auto' as={IconButton} icon={<MdDensityMedium />} variant='outline' />
          </Menu>
      </Stack>
      </GridItem>
      <GridItem w="3" pl="2" bg="" area={"nav"}>
        <Sidebar setNavSize={setNavSize} />
      </GridItem>
      
      <GridItem
        p={2}
        pl="1"
        bg="green.300"
        area={"main"}
        marginLeft={navSize == "small" ? "75px" : "200px"}
        h="30rem"
        display="flex"
        flexDirection="column"
        overflowY="auto"
        position="relative" // Add this line
      >
        {/* Floating border */}
        <Box
          position="sticky"
          top={0}
          bottom={0}
          left={0}
          right={0}
          border="4px solid"
          borderColor="green.500"
          pointerEvents="none"
          borderRadius="md"
        />

        <Box
          p={4}
        >
          <Text color="white">Current Listings</Text>
          <Wrap spacing={4} mx="2">
            {books.map((book) => (
              <BookList key={book.IBSN} book={book} />
            ))}
          </Wrap>
        </Box>
      </GridItem>
      

      <GridItem 
        p={2}
        pl="1"
        bg="blue.300"
        area={"footer"}
        marginLeft={navSize == "small" ? "75px" : "200px"}
        h="30rem"
        display="flex"
        flexDirection="column"
      
        overflowY="auto"
      >
        <Box flexGrow="1">
            <Text color="white">Your Listings</Text>
            <Wrap spacing={4}  mx="auto">
              {myBooks.map((book2) => (
                <BookList key={book2.IBSN} book = {book2} />
              ))}
            </Wrap>
        </Box>
      </GridItem>

            {/* <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search by title, author, or filter by price"
      /> */}
      {/* <CUIAutoComplete
            label="Search"
            items={books.map(book => ({ label: book.Title, value: book.Title }))}
            inputValue={searchTerm}
            onInputValueChange={(value) => setSearchTerm(value)}
            onSelectItem={(item) => setSearchTerm(item.label)}
            renderInput={(props) => (
              <Input
                type="text"
                value={props.inputValue}
                onChange={props.onInputChange}
                placeholder="Search by title, author, or filter by price"
              />
            )}
          /> */}
        
      
      {/* Display books */}
      {/* <Wrap spacing={4}>
        {books.map((book) => (
          <WrapItem key={book.IBSN}>
            <Box p={4} borderWidth={1} borderRadius="md">
              <Text fontWeight="bold">{book.Title}</Text>
              <Text>{book.Author}</Text>
              <Text>{`Price: $${book.Cost}`}</Text>
            </Box>
          </WrapItem>
        ))}
      </Wrap> */}

    </Grid>

  );
};









