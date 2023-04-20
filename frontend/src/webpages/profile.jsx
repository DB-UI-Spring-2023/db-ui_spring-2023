import css from '../css/profile.css';
import React from 'react';
import { Button, Heading } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Rating, ReviewCard } from '../components';
import { useState } from 'react';
import { Input } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import Charlie from '../images/TATRL2264-U02CE73QUAD-e9adc8067891-512.jpeg'

export const Profile = () => {
    const options = [
        { value: 1, label: '1 stars' },
        { value: 2, label: '2 stars' },
        { value: 3, label: '3 stars' },
        { value: 4, label: '4 stars' },
        { value: 5, label: '5 stars' }
    ];


    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [ratingOptions] = useState(options);

    return (
        <>
        <Heading mt= '2rem' as='h1' size='2xl' textAlign='center' class='head'>Account</Heading>
        <div class="profileInfo">
            <Image mt='.5rem' borderRadius='full' boxSize='150px'src={Charlie} alt='default pic' />
            <Badge>User</Badge>
            <h2>Charlie#69-420</h2>

            <h4>Average Rating</h4>     
            <Rating value={4.5}/>

            <h4>Reviews</h4>
            <Flex>  
                <ReviewCard/>
            </Flex>
            <Card>
                <h4>Reviews Entree</h4>
                <div class = "reviewEntree">
                    <Input placeholder="Enter a comment" onChange={(e) => setComment(e.target.value)} />
                    <select onChange={(e) => setRating(e.target.value)}>
                        {ratingOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                        <Rating value={rating}/>
                    <Button colorScheme="teal" onClick={() => console.log(rating, comment)}>Submit</Button>
                </div>
            </Card>

            {/* <h4>Temp #Purchases Log</h4> */}


        </div>
        </>
    )
};
