import css from '../css/profile.css';//????
import React from 'react';
import { Button, Heading } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { useState } from "react";
import { SimpleGrid } from '@chakra-ui/react'
import { CheckCircleIcon,WarningIcon} from '@chakra-ui/icons'
import { Container } from '@chakra-ui/react'
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
  } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

export const Profile = () => {
    // const [rating, setRating] = useState(0);
    return (
        <>
        <Heading mt= '2rem' as='h1' size='2xl' textAlign='center' class='head'>My Account</Heading>
        <div class="profileInfo">
            <Image mt='.5rem' borderRadius='full' boxSize='150px'src='https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.webp' alt='default pic' />
            <Badge>Default</Badge>
            <h2>Username</h2>
            <h4>Current Rating</h4>

            <h4>Temp #Reviews</h4>
            <Textarea placeholder='Here is a sample placeholder' />
            <h4>Temp #Listings</h4>
            <SimpleGrid minChildWidth='120px' spacing='40px'>
                <Box bg='tomato' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
            </SimpleGrid>
            <h4>Temp #Purchases Log</h4>
            <Container>
            <Box>
            <List spacing={3}>
                <ListItem>
                    <ListIcon as={CheckCircleIcon} color='green.500' />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </ListItem>
                <ListItem>
                    <ListIcon as={CheckCircleIcon} color='green.500' />
                    Assumenda, quia temporibus eveniet a libero incidunt suscipit
                </ListItem>
                <ListItem>
                    <ListIcon as={CheckCircleIcon} color='green.500' />
                    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </ListItem>
                {/* You can also use custom icons from react-icons */}
                <ListItem>
                    <ListIcon as={WarningIcon} color='green.500' />
                    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </ListItem>
            </List>
            </Box>
        </Container>
        </div>
        </>
    )
};
