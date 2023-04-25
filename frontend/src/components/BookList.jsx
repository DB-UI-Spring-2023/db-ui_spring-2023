import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Box,
  Flex,
  Center,
  Link,
} from "@chakra-ui/react";
import { VStack, HStack } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import "../css/HomePage.css";
import { useState, useEffect } from "react";
import { Image } from "@chakra-ui/react";
import { Stack, Heading, Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
//import SorcererStone from '../images/sorcererStone.png'
import { useDisclosure } from "@chakra-ui/react";
//import { Configuration, OpenAIApi } from "openai"; // Import OpenAI modules
import SellerPopup from "./SellerPopup";
import axios from "axios";
import placeholderImg from "../images/book-placeholder.png";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CartItem } from "./CartItems";
import { CartOrderSummary } from "./CartOrderSummary";
import { CartProductDescription } from "./CartProductDescription";
import { useCart } from '../CartContext';

//import css from '../css/bookList.css';
export const BookList = ({
  setRefreshListings,
  refreshListings,
  book,
  privileges,
  currentUserEmail,
  addToCart,
}) => {
  const [isHoverd, setIsHovered] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [summary, setSummary] = useState("Summary Loading...");

  const navigate = useNavigate();
  const [bookImageUrl, setBookImageUrl] = useState("");

  const { cartItems, setCartItems } = useCart();


  const API_Body = {
    model: "text-davinci-003",
    prompt: `Can you generate a summary for a book with the title "${book.Title}"`,
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  async function callAPI() {
    const res = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify(API_Body),
    });
    if (res.status !== 200) return;
    const data = await res.json().catch(() => {});
    console.log(data);
    setSummary(data);
  }

  function openChange() {
    callAPI();
    onOpen();
  }

  const fetchBookImage = async (isbn) => {
    try {
      const proxyUrl = "https://api.allorigins.win/raw?url=";
      const targetUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyDnJ6BrGDIpKvDxXPeGvzF-Ia5DJMwEZxw`;
      const response = await axios.get(proxyUrl + targetUrl);
      if (response.data.items && response.data.items.length > 0) {
        const thumbnail = response.data.items[0].volumeInfo.imageLinks.thumbnail;
        setBookImageUrl(thumbnail);
      } else {
        console.error("No image found for the book.");
      }
    } catch (error) {
      console.error("Error fetching book image:", error);
    }
  };

  useEffect(() => {
    fetchBookImage(book.IBSN);
  }, []);

  const handleRemoveBook = async () => {
    if (privileges != "Admin" && book.Seller != currentUserEmail) {
      alert("You don't have the permissions to remove this book.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/remove-listing",
        { bookID: book.book_id }
      );
      if (response.status === 200) {
        alert("Listing removed successfully.");
        setRefreshListings(!refreshListings);
      } else {
        alert("An error occurred while removing the listing.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while removing the listing.");
    }
  };

  const handleAddToCart = (book) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find((item) => item.id === book.book_id);
  
      if (existingCartItem) {
        return prevCartItems.map((item) =>
          item.id === book.book_id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
  
      return [...prevCartItems, { ...book, id: book.book_id, quantity: 1 }];
    });
  };
  


  return (
    <>
      <Card maxWidth="sm" borderRadius="1.875rem">
        <CardBody>
          <Center>
            <Image
                src={bookImageUrl || placeholderImg}
                width="50%"
                maxH="15rem"
                alt={book.Title}
            />
          </Center>
          <Stack mt="6" spacing="3" w="100%">
            <Heading size="md" w="80%">
              {book.Title}
            </Heading>
            <Heading size="sm">{book.Author}</Heading>
            <Text color="black" fontSize="2xl">
              ${book.Cost} ({book.bookFormat}) {book.book_id}
            </Text>
            <Button
              w="100%"
              variant="solid"
              colorScheme="green"
              size="lg"
              fontWeight="bold"
            >
              Buy now
            </Button>
            <Button
              w="100%"
              variant="solid"
              color="#FF176B"
              bgColor="#fff"
              size="lg"
              fontWeight="bold"
              border=".25rem solid red"
              _hover={{ bg: "#FF176B", color: "white" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleRemoveBook}
            >
              <MdDelete size={30} />
            </Button>
          </Stack>
        </CardBody>
        <div className="left2-right2-divider2"></div>
        <CardFooter>
          <VStack alignItems="flex-start" spacing={1}>
            <HStack spacing={1}>
              <Text></Text>
              <Link to="/cart">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  size="sm"
                  onClick={() => {
                    handleAddToCart(book);
                  }}
                >
                  Add to cart
                </Button>
              </Link>
              <Button
                variant="ghost"
                ref={btnRef}
                colorScheme="pink"
                size="sm"
                onClick={openChange}
              >
                Details
              </Button>

              <Popover>
                <PopoverTrigger>
                  <Button variant="ghost" colorScheme="blue">
                    Seller Info
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Seller Information</PopoverHeader>
                  <PopoverBody>
                    <Text>
                      Name: {book.SellerFirstName}{" "}
                      {book.SellerLastName}
                    </Text>
                    <Text>Email: {book.SellerEmail}</Text>

                    <Button
                      mt={2}
                      colorScheme="teal"
                      onClick={() =>
                        navigate(
                          `/seller-profile/${book.SellerEmail}`
                        )
                      }
                    >
                      View Profile
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
          </VStack>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />

              <DrawerHeader>Book Details</DrawerHeader>

              <DrawerBody>
                <Stack>
                  <div>
                    <h2> Summary </h2>
                    <Text>{summary}</Text>
                  </div>
                  <Divider />
                  <h2> Author </h2>
                  <Text>{book.Author}</Text>
                  <Divider />
                  <h2> Format</h2>
                  <Text> {book.bookFormat} </Text>
                  <Divider />
                  <h2> Condition</h2>
                  <Text> {book.bookCondition} </Text>
                  <Divider />
                  <h2> ISBN</h2>
                  <Text> {book.IBSN}</Text>
                  <Divider />
                </Stack>
              </DrawerBody>

              <DrawerFooter>
                <Popover>
                  <PopoverTrigger>
                    <Button variant="ghost" colorScheme="blue">
                      Merchant Info
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <SellerPopup sellerEmail={book.Seller} />
                  </PopoverContent>
                </Popover>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </CardFooter>
      </Card>
    </>
  );
};
