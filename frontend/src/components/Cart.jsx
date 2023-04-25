import React, { useState } from 'react';
import {
  Box,
  IconButton,
  VStack,
  HStack,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Badge,
  Button,
} from '@chakra-ui/react';
import { FaShoppingCart, FaTimes, FaTrash } from 'react-icons/fa';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();


  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const handleNavigation = () => {
    navigate("/cart");
  };

  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <IconButton
            icon={<FaShoppingCart />}
            size="lg"

            mr={5}
          />

        </PopoverTrigger>
        <Badge
            borderRadius="full"
            px="2"
            colorScheme="purple"
            variant="subtle"
          >
            {cartItems.length}
          </Badge>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <HStack>
              <Text>Cart</Text>
              <Badge ml="1" colorScheme="purple" fontSize="0.8em">
                {cartItems.length}
              </Badge>
            </HStack>
          </PopoverHeader>
          <PopoverBody>
            <VStack spacing={2}>
              {cartItems.map((item, index) => (
                <HStack key={index} justifyContent="space-between" w="100%">
                    <Text>
                      Title: {item.Title}, Author: {item.Author}, Price: ${item.Cost}, Seller: {item.Seller}
                    </Text>
                    <IconButton
                      onClick={() => removeFromCart(index)}
                      icon={<FaTrash />}
                      size="sm"
                      colorScheme="red"
                      ml={2}
                    />
                </HStack>
              ))}
              <Button
                color="white"
                bg="#38A169"
                variant="outline"
                _hover={{
                  bg: "white",
                  color: "#38A169",
                  border: "2px",
                }}
                onClick={handleNavigation}
              >
                Checkout
              </Button>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default Cart;
