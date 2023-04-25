import {
  InputGroup,
  InputLeftElement,
  Box,
  Wrap,
  Text,
  Input,
  Grid,
  GridItem,
  Stack,
  VStack,
  Flex,
  SimpleGrid,
  Divider
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BookList } from "../components";
import { MdSearch } from "react-icons/md";
import Sidebar from "../components/Sidebar";
import Cart from "../components/Cart"

import "../css/Dashboard.css";


export const Dashboard = () => {

  // Cart Stuff
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };
  //Refresh prop passed to sidebar and createListing
  const [refreshListings, setRefreshListings] = useState(false);

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

  const fetchBooksBySeller = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/books/${email}`
      );
      console.log("Books fetched successfully:", response.data);
      setMyBooks(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/dashboard-books`,
        {
          params: {
            searchTerm: searchTerm,
          },
        }
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books data:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchBooksBySeller(email);
  }, [searchTerm, refreshListings, email]);

  const nav = useNavigate();

  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].email);
        setEmail(response.data.user[0].email);
      } else {
        nav("/");
        setLoginStatus("Not logged in.");
      }
    });
  });

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
        setPrivileges(response.data[0].privileges);
        return response.data;
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };
    fetchUserInfo(email);
  }, [loginStatus]);

  return (
    <>
      <Flex className="header-color">
        <InputGroup className="input-group" m="2rem auto" w="50%">
          <InputLeftElement
            pointerEvents="none"
            children={<MdSearch color="#FFF" />}
          />
          <Input
            value={searchTerm}
            onChange={handleSearchTermChange}
            color="#FFF"
            placeholder="Search for a textbook"
            _placeholder={{ color: '#FFF' }}
          />
        </InputGroup>
        <Flex mt='2rem' mr='2rem'>
          <Cart cartItems={cartItems} setCartItems={setCartItems} />
          </Flex>
      </Flex>
      <Grid templateColumns="12% 1fr" gap={10} m="2rem 2rem auto 2rem">
        <GridItem>
          <Sidebar setRefreshListings={setRefreshListings} refreshListings={refreshListings} />
        </GridItem>

        <Box gridColumn="2" height="auto" >
          <Text color="#5fb1d1" fontWeight='bold'>Current Listings:</Text>
          <Wrap spacing={2} zIndex={1} height="40rem"  overflowY="auto">
            {books.map((book) => (
              <Box
                key={book.book_id}
                transform="scale(0.8)"
                transformOrigin="center"
                zIndex={1}
              >
                <BookList 
                  book={book} 
                  privileges={privileges} 
                  setRefreshListings={setRefreshListings} 
                  refreshListings={refreshListings} 
                  currentUserEmail={email}
                  addToCart={addToCart}
                  />
              </Box>
            ))}
          </Wrap>
        </Box>
        
        <Box gridColumn="2" height="auto">
        <Divider></Divider>
          <Text mt='2rem' color="#5fb1d1" fontWeight='bold'>Your Listings:</Text>
          <Wrap spacing={2} mx="2" height="40rem" overflowY="auto">
            {myBooks.map((book2) => (
              <Box
                key={book2.book_id}
                transform="scale(0.8)"
                transformOrigin="center"
              >
                <BookList 
                  book={book2} 
                  privileges="Admin"
                  setRefreshListings={setRefreshListings} 
                  refreshListings={refreshListings} 
                  currentUserEmail={email}
                  addToCart={addToCart}
                  />
              </Box>
            ))}
          </Wrap>
        </Box>
      </Grid>
    </>
  );
};
