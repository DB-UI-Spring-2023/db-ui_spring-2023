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
import SorcererStone from '../images/sorcererStone.png'
import { useDisclosure } from '@chakra-ui/react'
import * as React from 'react';
import { Rating} from '../components';
import css from '../css/bookList.css';
export const BookList = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return <>
        <stack>
        <Container>
            <Card maxW='sm'>
                <CardBody>
                    <Image
                    src={SorcererStone}
                    alt='Harry Potter and the Philosopher Stone'
                    class = 'bookImage'
                    borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                    <Heading size='md'>Harry Potter and the Philosopher's Stone</Heading>
                    <Text color='purple' fontSize='2xl'>
                        $35.00
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
                    
                    <Button variant='ghost' ref={btnRef} colorScheme='pink' onClick={onOpen}>
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
                                    <Text>Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school and with the help of his friends, Ron Weasley and Hermione Granger, he faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old.</Text>
                                    </div>
                                    <Divider />
                                    <h2> Author </h2>
                                    <Text>J.K. Rowling</Text>
                                    <Divider />
                                    <h2> Rating </h2>
                                    <Rating value={4} />
                                    <Divider />
                                    <h2> Publisher</h2>
                                    <Text> Bloomsbury Publishing</Text>
                                    <Divider />
                                    <h2> Published Date</h2>
                                    <Text> 26 June 1997</Text>
                                    <Divider />
                                    <h2> ISBN</h2>
                                    <Text> 9780747532743</Text>
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
    </>
}