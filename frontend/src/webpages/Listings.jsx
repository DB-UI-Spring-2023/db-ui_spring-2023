import {
  Box,
  Wrap,
  WrapItem,
  Text,
  Input,
  Button,
  Grid,
  GridItem,
  Stack,
  Menu,
  MenuButton,
  IconButton,
  useColorMode,
  VStack,
  List,
  ListItem,
  InputLeftElement,
  InputGroup,
  Flex,
} from "@chakra-ui/react";

import "../css/Listings.css";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CreateListing, BookList } from "../components";
import Sidebar from "../components/Sidebar";
import SellerFilter from "../components/SellerFilter";
import BookFilter from "../components/BookFilter";
import { MdSearch } from "react-icons/md";

export const Listings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [navSize, setNavSize] = useState("large");
  const [sellers, setSellers] = useState([]);
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [sellersFilter, setSellersFilter] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [tags, setTags] = useState([]);
  const sellersRef = useRef();

  const fetchBooks = async (searchTerms) => {
    try {
      const response = await axios.get("http://localhost:8000/books", {
        params: {
          searchTerms: searchTerms.join(","),
          minPrice,
          maxPrice,
          sellers: selectedSellers.join(","),
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books data:", error);
    }
  };

  useEffect(() => {
    fetchBooks(tags);
  }, [tags, minPrice, maxPrice, selectedSellers]);

  useEffect(() => {
    const fetchSuggestedBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/book-titles");
        setSuggestedBooks(response.data);
      } catch (error) {
        console.error("Error fetching suggested books data:", error);
      }
    };
    fetchSuggestedBooks();
  }, []);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/sellers");
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers data:", error);
      }
    };
    fetchSellers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sellersRef.current && !sellersRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sellersRef]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setShowSuggestions(true);
  };

  const onEnterPress = (event) => {
    if (event.key === "Enter" && searchTerm) {
      if (!tags.includes(searchTerm)) {
        setTags([...tags, searchTerm]);
      }
      setSearchTerm("");
    }
  };

  const filteredSuggestions = useMemo(() => {
    return suggestedBooks.filter((book) =>
      book.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, suggestedBooks]);

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

  const toggleSellerFilter = (seller) => {
    if (sellersFilter.includes(seller)) {
      setSellersFilter((prev) => prev.filter((s) => s !== seller));
    } else {
      setSellersFilter((prev) => [...prev, seller]);
    }
  };

  const handleSellerClick = (seller) => {
    toggleSellerFilter(seller);
    setShowSuggestions(false);
  };

  const searchBooks = (searchValue) => {
    setSearchTerm(searchValue);
    setShowSuggestions(false);
    if (searchValue && !tags.includes(searchValue)) {
      setTags([...tags, searchValue]);
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    setShowSuggestions(false);
    if (title && !tags.includes(title)) {
      setTags([...tags, title]);
      fetchBooks([...tags, title]); // Fetch books when a new tag is added
    }
  };

  const handleTagRemove = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    fetchBooks(newTags); // Fetch books when a tag is removed
  };

  return (
    <>
      <Flex direction="column" className="header-color" py="2rem">
      
            <InputGroup className="input-group" mx="auto" my="auto" w="50%">
              <InputLeftElement
                pointerEvents="none"
                children={<MdSearch color="#FFF" />}
              />
              <Input
                variant="filled"
                bgColor="#72bfde"
                color="#FFF"
                type="text"
                placeholder="Search for a book"
                _placeholder={{ color: '#FFF' }}
                mb={4}
                value={searchTerm}
                onChange={handleSearchTermChange}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={onEnterPress}
              />
            </InputGroup>
          
          {showSuggestions && (
            <VStack
              borderWidth="1px"
              borderRadius="lg"
              borderColor="gray.200"
              color="#FFF"
              p={2}
              mt={2}
              w="90%"
              ml="auto"
              mr="auto"
              maxH="200px"
              overflowY="scroll"
            >
              {filteredSuggestions.map((book) => (
                <Button
                  key={book}
                  size="sm"
                  variant="outline"
                  onClick={() => handleSuggestionClick(book)}
                >
                  {book}
                </Button>
              ))}
            </VStack>
          )}

          <Wrap mt={4} mb={4}>
            {tags.map((tag) => (
              <WrapItem
                key={tag}
                bg="gray.200"
                borderRadius="md"
                px={2}
                py={1}
                cursor="pointer"
                onClick={() => handleTagRemove(tag)}
              >
                {tag}
              </WrapItem>
            ))}
          </Wrap>
          {/* Clear filters button */}
          {(minPrice || maxPrice) && (
            <Button colorScheme="teal" onClick={handleClearFilters} mb={4}>
              Clear Filters
            </Button>
          )}
          {/* Seller filter */}
          <SellerFilter
            selectedSellers={selectedSellers}
            setSelectedSellers={setSelectedSellers}
          />
      </Flex>
      <Grid templateColumns="12% 1fr" gap={10} m="2rem 2rem auto 2rem">
        <GridItem>
          <Sidebar />
        </GridItem>

        <Box gridColumn="2" bg="tomato" height="auto">
          <Wrap spacing={4} width="100%">
            {books.map((book) => (
              <BookList key={book.IBSN} book={book} />
            ))}
          </Wrap>
        </Box>
      </Grid>
    </>
  );
};
