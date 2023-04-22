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
} from "@chakra-ui/react";

import "../css/Listings.css";
import { useState, useRef, useEffect } from "react";
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
  const sellersRef = useRef();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/books", {
          params: {
            searchTerm,
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
    fetchBooks();
  }, [searchTerm, minPrice, maxPrice, selectedSellers]);

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
  };

  return (
    <>
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "footer footer"`}
        gridTemplateRows={""}
        gridTemplateColumns={"15% 1fr"}
        h="auto"
        gap="2"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem p={2} className="header-color" area={"header"}>
          <Stack direction="column">
            <InputGroup className="input-group" mx="auto" my="auto" w="50%">
              <InputLeftElement
                pointerEvents="none"
                children={<MdSearch color="#606060" />}
              />
              <Input
                variant="filled"
                bgColor="#82AAAD"
                color="#606060"
                placeholder="Search for a textbook"
                mb={4}
                value={searchTerm}
                onChange={(event) => searchBooks(event.target.value)}
              />
            </InputGroup>

            <BookFilter
              selectedBooks={selectedBooks}
              setSelectedBooks={setSelectedBooks}
            />
            <Stack direction="row" justifyContent="center" alignItems="center">
              <InputGroup className="input-group"  w="10rem">
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdSearch color="#606060" />}
                />
                <Input
                  variant="filled"
                  bgColor="#82AAAD"
                  color="#606060"
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                />
              </InputGroup>

              <InputGroup className="input-group"  w="10rem">
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdSearch color="#606060" />}
                />
                <Input
                  variant="filled"
                  bgColor="#82AAAD"
                  color="#606060"
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                />
              </InputGroup>
            </Stack>

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
          </Stack>
        </GridItem>

        <GridItem pl="2" h="30rem" area={"nav"}>
          <Sidebar />
        </GridItem>
        <GridItem
          p={5}
          bgColor="#82AAAD"
          area={"main"}
          display="flex"
          flexDirection="column"
          overflowY="auto"
        >
          <Wrap spacing={4} width="100%">
            {books.map((book) => (
              <BookList key={book.IBSN} book={book} />
            ))}
          </Wrap>
        </GridItem>
      </Grid>
    </>
  );
};
