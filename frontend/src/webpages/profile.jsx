import css from '../css/profile.css';
import React from 'react';
import { Button, Heading } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { ReviewCard } from '../components';

export const Profile = () => {

    return (
        <>
        <Heading mt= '2rem' as='h1' size='2xl' textAlign='center' class='head'>Account</Heading>
        <div class="profileInfo">
            <Image mt='.5rem' borderRadius='full' boxSize='150px'src='https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.webp' alt='default pic' />
            <Badge>Default</Badge>
            <h2>Username</h2>

            <h4>Average Rating</h4>
            
            <h4>Reviews</h4>
            <Flex>  
                <ReviewCard/>
                <ReviewCard/>
            </Flex>
            <h4>Temp #Purchases Log</h4>

            <h4>Temp #Wishlist</h4>





        
        </div>
        </>
    )
};
