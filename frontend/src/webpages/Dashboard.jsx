
import { Box, Flex, Input, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";

import { useState, useRef, useEffect } from "react"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { CreateListing } from "../components";

export const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

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

  useEffect(() => {
    // Example fetch request
    const fetchBooks = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/books?search=${searchTerm}`);
        const data = response.data;
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    
    <Box p={4}>
      <div>
      <>Welcome {loginStatus}</>
      <CreateListing />
      </div>
      <Input
        type="text"
        placeholder="Search for a book..."
        mb={4}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Wrap spacing={4}>
        {books.map((book) => (
          <WrapItem key={book.IBSN}>
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
            >
              <Box p={4}>
                <Text fontSize="xl" mb={2}>
                  {book.Title}
                </Text>
                <Text fontSize="md">{book.Author}</Text>
                <Text fontSize="md">{book.Condition}</Text>
              </Box>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};









