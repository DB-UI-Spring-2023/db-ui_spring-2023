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
                                    <Text>Adaptation of the first of J.K. Rowling's popular children's novels about Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his life as an unwanted child to become a student at Hogwarts, an English boarding school for wizards. There, he meets several friends who become his closest allies and help him discover the truth about his parents' mysterious deaths.</Text>
                                    </div>
                                    <Divider />

                                    <h2> Auther</h2>
                                    
                                </Stack>
                            </DrawerBody>

                            <DrawerFooter>
                                <Button variant='solid' colorScheme='pink'>
                                    Buy now
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