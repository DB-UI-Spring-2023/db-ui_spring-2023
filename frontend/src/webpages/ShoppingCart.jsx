import {
    Box,
    Flex,
    Heading,
    HStack,
    Link,
    Stack,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { CartItem, CartOrderSummary } from '../components';
  import { products } from "../api/products";
  import "../css/Dashboard.css";
  
  export const ShoppingCart = () => (
    <>
    <Flex className="header-color" h='auto' justifyContent='center'>
        <Heading
        mt='2rem'
        mb='2rem'
        as='h1'
        size='2xl'
        color='#fff'
        fontWeight='medium'
        >
            Textbook Marketplace
        </Heading>
      </Flex>
    <Box
      maxW={{
        base: '3xl',
        lg: '7xl',
      }}
      mx="auto"
      px={{
        base: '4',
        md: '8',
        lg: '12',
      }}
      py={{
        base: '6',
        md: '8',
        lg: '12',
      }}
    >
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        align={{
          lg: 'flex-start',
        }}
        spacing={{
          base: '8',
          md: '16',
        }}
      >
        <Stack
          spacing={{
            base: '8',
            md: '10',
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart (3 items)
          </Heading>
  
          <Stack spacing="6">
            {products.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
        </Stack>
  
        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link color={mode('#49C5F6')}>Continue shopping</Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
    </>
  )