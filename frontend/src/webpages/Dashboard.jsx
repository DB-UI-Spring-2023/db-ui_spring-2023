
import { Box, Wrap, WrapItem, Checkbox, CheckboxGroup, Text, Input, Button, Grid, GridItem, Stack, Menu, MenuButton, IconButton, useColorMode } from "@chakra-ui/react";

import { useState, useRef, useEffect } from "react"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { CreateListing, BookList } from "../components";

import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { MdDensityMedium } from 'react-icons/md';
import Sidebar from "../components/Sidebar";

export const Dashboard = () => {
  

  const nav = useNavigate();

    const [loginStatus, setLoginStatus] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/login").then((response) => {
          if (response.data.loggedIn == true){
            setLoginStatus(response.data.user[0].email)
          } else {
            nav("/")
            setLoginStatus("Not logged in.")
          }
        })
      },[loginStatus])

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
      gridTemplateRows={""}
      gridTemplateColumns={"3 1fr"}
      h="20rem"
      gap="2"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <div>
      <>Welcome {loginStatus}</>
      <CreateListing />
      </div>
      <GridItem bg="salmon" area={"header"}>
        <Stack direction='row'>
          <Input mt='2rem' ml='auto' mr='auto' w='90%' variant='filled' placeholder='Enter Textbook Keywords...' />
          
          <Menu>
              <MenuButton mt='2rem' mr='auto' as={IconButton} icon={<MdDensityMedium />} variant='outline' />
          </Menu>
      </Stack>
      </GridItem>
      <GridItem w="3" pl="2" bg="" area={"nav"}>
        <Sidebar />
      </GridItem>
      
      <GridItem pl="2" bg="green.300" area={"main"}>
          Main
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
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









