
  import React, { useState, useEffect } from "react";
    import {
    Box,
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
    Tag,
    TagLabel,
    TagCloseButton,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    InputLeftElement,
} from "@chakra-ui/react";
import axios from "axios";
  import { Search2Icon } from "@chakra-ui/icons";
import { MdSearch } from "react-icons/md";
  
  // ...
  
  const BookFilter = ({ selectedBooks, setSelectedBooks }) => {
    const [books, setBooks] = useState([]);
    const [searchValue, setSearchValue] = useState("");
  
    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await axios.get("http://localhost:8000/book-titles");
          setBooks(response.data);
        } catch (error) {
          console.error("Error fetching books data:", error);
        }
      };
      fetchBooks();
    }, []);
  
    const handleBookSelect = (book) => {
      setSelectedBooks([...selectedBooks, book]);
    };
  
    const handleBookRemove = (bookToRemove) => {
      setSelectedBooks(selectedBooks.filter((book) => book !== bookToRemove));
    };
  
    const filteredBooks = books.filter((book) =>
      book.toLowerCase().includes(searchValue.toLowerCase())
    );
  
    return (
      <Box>
        <InputGroup className="input-group" mx="auto" w="50%">
          <InputLeftElement
            pointerEvents="none"
            children={<MdSearch color="#606060" />}
          />
          <Input
            variant="filled"
            bgColor="#82AAAD"
            color="#606060"
            placeholder="Search for a book"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </InputGroup>
        <VStack spacing={2} maxH="5rem" overflowY="auto">
          {filteredBooks.map((book) => (
            <Button
              color="grey"
              key={book}
              size="sm"
              variant="outline"
              onClick={() => handleBookSelect(book)}
            >
              {book}
            </Button>
          ))}
        </VStack>
        {selectedBooks.map((book) => (
          <Tag key={book} size="sm" borderRadius="full" variant="solid" m={1}>
            <TagLabel>{book}</TagLabel>
            <TagCloseButton onClick={() => handleBookRemove(book)} />
          </Tag>
        ))}
      </Box>
    );
  };
  
  export default BookFilter;