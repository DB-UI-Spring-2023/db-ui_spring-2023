import React from 'react';
import { Center, Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { BiLike, BiChat, BiShare } from 'react-icons/bi'
import { Box } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import Clark from '../images/TATRL2264-U02BLU5GG7R-c36088063f5f-512.jpeg'
import gunCat from '../images/24900141_10156761403396840_5223982907118387909_n.jpg'
import { Rating } from '../components';

export const ReviewCard = () => {
    return (
        <>  
        <Card maxW='xs'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name='Segun Adebayo' src= {Clark} />
                            <Box>
                            <Heading size='sm'>Clark Boeger</Heading>
                            <Text>Admin, Books 4 Free</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                    <div class="rating" style={{paddingLeft: "1em"}}>
                        <Rating value ={1} />
                    </div>
                <CardBody>
                    <Text>
                    I hate this book. It's so bad. I can't believe I wasted my time reading it. I'm going to give it a 1 star rating.
                    </Text>
                </CardBody>
                <Image
                    objectFit='cover'
                    src={gunCat}
                    alt='Chakra UI'

                />
                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                    '& > button': {
                        minW: '136px',
                    },
                    }}
                >
                    <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                    Like
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                    Comment
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}