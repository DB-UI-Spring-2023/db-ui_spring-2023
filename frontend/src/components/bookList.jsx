import { Card, CardHeader, CardBody, CardFooter} from '@chakra-ui/react'
import { cardAnatomy } from '@chakra-ui/anatomy'
import { Image } from '@chakra-ui/react'
import { Stack, Heading, Text } from '@chakra-ui/react'
import { Button, ButtonGroup} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import css from '../css/bookList.css';
export const BookList = () => {
    return <>
        <stack>
        <Card maxW='sm'>
            <CardBody>
                <Image
                src='frontend/src/images/sorcererStone.png'
                alt='Harry Potter and the Philosopher Stone'
                borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                <Heading size='md'>Harry Potter and the Philosopher's Stone</Heading>
                <Text>
                    This sofa is perfect for modern tropical spaces, baroque inspired
                    spaces, earthy toned spaces and for people who love a chic design with a
                    sprinkle of vintage design.
                </Text>
                <Text color='blue.600' fontSize='2xl'>
                    $35.00
                </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue'>
                    Buy now
                </Button>
                <Button variant='ghost' colorScheme='blue'>
                    Add to cart
                </Button>
                </ButtonGroup>
            </CardFooter>
            </Card>
        </stack>
    </>
}