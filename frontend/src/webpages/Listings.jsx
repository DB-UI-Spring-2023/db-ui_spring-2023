import { Box, Wrap, WrapItem, Checkbox, CheckboxGroup, Text, Input, Button, Grid, GridItem, Stack, Menu, MenuButton, IconButton, useColorMode } from "@chakra-ui/react";

import { useState, useRef, useEffect } from "react"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { CreateListing, BookList } from "../components";

export const Listings = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

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
        <>
        <Input
          mt='2rem' ml='auto' mr='auto' w='90%' variant='filled'
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
        </>
    );

};