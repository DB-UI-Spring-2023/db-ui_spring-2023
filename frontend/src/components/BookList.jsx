import { Card, CardHeader, CardBody, CardFooter, Container} from '@chakra-ui/react'
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


import * as React from 'react';
//import css from '../css/bookList.css';
export const BookList = ({book}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [summary, setSummary] = useState("Summary Loading...");


    const API_Body = {
        "model": "text-davinci-003",
        "prompt": `Can you generate a summary for a book with the title "${book.Title}"`,
        "temperature": 0,
        "max_tokens": 64,
        "top_p": 1.0,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0
    };

    // const configuration = new Configuration({
    //     organization: "org-evB9KrNJdZTi6iyFSCm9Ujql",
    //   
    // });
    // const openai = new OpenAIApi(configuration);
   
    async function callAPI(){
        
        await fetch("https://api.openai.com/v1/completions",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer key"
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

    // useEffect(() => {
    //     // Fetch book summary using OpenAI API when component mounts
    //     const fetchSummary = async () => {
    //         try {
    //             const response = await openai.textCompletions.create({
    //                 prompt: `Generate a summary of the book "${book.Title}"`, // Prompt for generating summary
    //                 max_tokens: 100, // Maximum number of tokens in the generated text
    //                 n: 1, // Number of completions to generate
    //                 stop: ['\n'], // Stop condition for generated text
    //             });
    //             alert(response.choices[0]?.text )
    //             setSummary(response.choices[0]?.text || ''); // Set the book summary in state
    //         } catch (error) {
    //             console.error('Failed to generate book summary:', error);
    //         }
    //     };

    //     fetchSummary(); // Call fetchSummary function
    // }, [onOpen]);
    
        


    

    return (
        <stack>
        <Container>
            <Card maxW='sm'>
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
                        {book.Cost}
                    </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='pink'>
                        Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='teal'>
                        Add to cart
                    </Button>
                    
                    <Button variant='ghost' ref={btnRef} colorScheme='pink' onClick={openChange}>
                        Details
                    </Button>
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
                                    <h2> Publisher</h2>
                                    <Text> Bloomsbury Publishing</Text>
                                    <Divider />
                                    <h2> Published Date</h2>
                                    <Text> 26 June 1997</Text>
                                    <Divider />
                                    <h2> ISBN</h2>
                                    <Text> {book.IBSN}</Text>
                                    <Divider />
                                </Stack>
                            </DrawerBody>
                            
                            <DrawerFooter>
                                <Button variant='ghost' colorScheme='blue'>
                                    Merchant Info
                                </Button>  
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </Container>
        </stack>
        );
    };