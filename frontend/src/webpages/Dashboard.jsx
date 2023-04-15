
import { Box, Wrap, WrapItem, Checkbox, CheckboxGroup, Text, Input, Button } from "@chakra-ui/react";


import { useState, useRef, useEffect } from "react"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { CreateListing, BookList } from "../components";

import { CUIAutoComplete } from "chakra-ui-autocomplete";

export const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleClearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    
    <Box p={4}>
      <div>
      <>Welcome {loginStatus}</>
      <CreateListing />
      </div>
      {/* <Input
        type="text"
        placeholder="Search for a book..."
        mb={4}
        value={searchTerm}
        onChange={handleSearchChange}
      /> */}
      {/* Search bar */}
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
        <Input
        type="text"
        placeholder="Search for a book..."
        mb={4}
        value={searchTerm}
        onChange={handleSearchTermChange}
        />
      {/* Price range filter */}
      <Wrap spacing={4} mb={4}>
        <WrapItem>
          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </WrapItem>
        <WrapItem>
        
          <Input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </WrapItem>
      </Wrap>

      {/* Clear filters button */}
      {(minPrice || maxPrice) && (
        <Button colorScheme="teal" onClick={handleClearFilters} mb={4}>
          Clear Filters
        </Button>
      )}
      <Wrap spacing={4}>
        {books.map((book) => (
          <BookList key={book.IBSN} book = {book} />
        ))}
      </Wrap>

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

    </Box>
  );
};









