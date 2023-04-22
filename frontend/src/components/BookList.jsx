import { Card, CardHeader, CardBody, CardFooter, Container, Box} from '@chakra-ui/react'
import { VStack, HStack } from '@chakra-ui/react';
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
  } from '@chakra-ui/react'


import { useState, useEffect } from "react";
import { Image } from '@chakra-ui/react'
import { Stack, Heading, Text } from '@chakra-ui/react'
import { Button, ButtonGroup} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
//import SorcererStone from '../images/sorcererStone.png'
import { useDisclosure } from '@chakra-ui/react'
import { Configuration, OpenAIApi } from 'openai'; // Import OpenAI modules
import SellerPopup from './SellerPopup';



import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
//import css from '../css/bookList.css';
export const BookList = ({book}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [summary, setSummary] = useState("Summary Loading...");

    const nav = useNavigate();

    
    const API_Body = {
        "model": "text-davinci-003",
        "prompt": `Can you generate a summary for a book with the title "${book.Title}"`,
        "temperature": 0,
        "max_tokens": 64,
        "top_p": 1.0,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0
    };

    
   
    async function callAPI(){
        
        await fetch("https://api.openai.com/v1/completions",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify(API_Body)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
            setSummary(data.choices[0].text.trim());
        })
    }

    function openChange(){
        callAPI();
        onOpen();
    }

    const [isAdmin, setIsAdmin] = useState(false); // Add a new state for isAdmin (set it to true for admin users)

  // Add a new function to handle book removal
  const handleRemoveBook = () => {
    if (!isAdmin) {
      alert("You don't have the permissions to remove this book.");
      return;
    }

    // Logic to remove the book from the database
    // ...
  };

    
    return (
        <Box zIndex={1}>
        <stack>
        <Container>
            <Card maxW='sm' >
            <Button
              position="absolute"
              top={2}
              right={2}
              variant="outline"
              colorScheme="red"
              size="sm"
              onClick={handleRemoveBook}
            >
              <MdDelete size={18} color="darkred" />
            </Button>
                <CardBody>
                    {/* <Image
                    src={SorcererStone}
                    alt='Harry Potter and the Philosopher Stone'
                    class = 'bookImage'
                    borderRadius='lg'
                    /> */}
                    <Stack mt='6' spacing='3'>
                    <Heading size='md'>{book.Title}</Heading>
                    <Text color='purple' fontSize='2xl'>
                        {book.Cost}  ({book.bookFormat})
                    </Text>
                    <Button
                            w="100%"
                            variant="solid"
                            colorScheme="pink"
                            size="lg"
                            fontWeight="bold"
                        >
                            Buy now
                        </Button>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <VStack alignItems="flex-start" spacing={1}>
                        
                        <HStack spacing={1}>
                            <Text></Text>
                            <Button variant="ghost" colorScheme="teal" size="sm">
                            Add to cart
                            </Button>
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
                            <PopoverContent >
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Seller Information</PopoverHeader>
                            <PopoverBody>
                                <Text>Name: {book.SellerFirstName} {book.SellerLastName}</Text>
                                <Text>Email: {book.SellerEmail}</Text>

                                <Button mt={2} colorScheme="teal" onClick={() => nav(`/profile/${book.SellerEmail}`)}>
                                View Profile
                                </Button>
                            </PopoverBody>
                            </PopoverContent>
                        </Popover>
                        </HStack>
                        
                    </VStack>
                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        onClose={onClose}
                        finalFocusRef={btnRef}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            
                            <DrawerHeader>Book Details</DrawerHeader>

                            <DrawerBody >
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
                                    <Button variant='ghost' colorScheme='blue'>
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
        </Container>
        </stack>
        </Box>
        );
    };

