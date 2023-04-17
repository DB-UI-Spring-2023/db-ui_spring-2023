
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
  } from "@chakra-ui/react";
  
  import { useState, useRef, useEffect } from "react";
  import axios from "axios";
  import { Link, useNavigate } from "react-router-dom";
  import { CreateListing, BookList } from "../components";
  import Sidebar from "../components/Sidebar";
  import SellerFilter from "../components/SellerFilter";
  import BookFilter from "../components/BookFilter";
  

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
                            "nav footer"`}
            gridTemplateRows={""}
            gridTemplateColumns={"3 1fr"}
            h="20rem"
            gap="1"
            color="blackAlpha.700"
            fontWeight="bold"
          >
            <GridItem p={2} bg="salmon" area={"header"}>
            <Input
                mt="2rem"
                ml="auto"
                mr="auto"
                w="90%"
                variant="filled"
                type="text"
                placeholder="Search for a book..."
                mb={4}
                value={searchTerm}
                onChange={(event) => searchBooks(event.target.value)}
                />
              <BookFilter selectedBooks={selectedBooks} setSelectedBooks={setSelectedBooks} />
              <Wrap spacing={4} mb={4}>
                <WrapItem>
                  <Input
                    mt="2rem"
                    ml="auto"
                    mr="auto"
                    w="90%"
                    variant="filled"
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                  />
                </WrapItem>
                <WrapItem>
                  <Input
                    mt="2rem"
                    ml="auto"
                    mr="auto"
                    w="90%"
                    variant="filled"
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
              {/* Seller filter */}
              <SellerFilter
                selectedSellers={selectedSellers}
                setSelectedSellers={setSelectedSellers}
              />
            </GridItem>
            <GridItem w="3" pl="2" area={"nav"}>
              <Sidebar setNavSize={setNavSize} />
            </GridItem>
            <GridItem
              p={2}
              pl="1"
              bg="green.300"
              area={"main"}
              marginLeft={navSize == "small" ? "75px" : "200px"}
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
