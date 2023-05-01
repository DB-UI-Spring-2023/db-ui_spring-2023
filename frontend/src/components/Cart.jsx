import React, { useState } from "react";
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
  Flex,
  StackDivider,
} from "@chakra-ui/react";
import { FaShoppingCart, FaTimes, FaTrash } from "react-icons/fa";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";

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
      <Flex flexDirection="row" m="0 0">
        <Popover>
          <PopoverTrigger>
            <IconButton icon={<FaShoppingCart />} size="lg" mr={-3} />
          </PopoverTrigger>
          <Flex
            justifyContent="center"
            alignItems="flex-start"
            mt="-4px"
          >
            <Badge
              borderRadius="full"
              px="2"
              color="#fff"
              bg="red"
              zIndex="9999"
            >
              {cartItems.length}
            </Badge>
          </Flex>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <HStack>
                <Text>Cart</Text>
                <Badge
                  ml="1"
                  colorScheme="red"
                  color="#252525"
                  fontSize=".875rem"
                >
                  {cartItems.length}
                </Badge>
              </HStack>
            </PopoverHeader>
            <PopoverBody>
              <VStack spacing={2}>
                {cartItems.map((item, index) => (
                  <VStack
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={4}
                    align="stretch"
                    key={index}
                    justifyContent="space-between"
                  >
                    <Box>Title: {item.Title}</Box>
                    <Box>Author: {item.Author}</Box>
                    <Box>Price: ${item.Cost}</Box>
                    <Box>Seller: {item.Seller}</Box>
                    <Flex justifyContent="center" alignItems="center">
                      <IconButton
                        w="40%"
                        ml="auto"
                        mr="auto"
                        onClick={() => removeFromCart(index)}
                        icon={<FaTrash />}
                        colorScheme="red"
                      />
                    </Flex>
                  </VStack>
                ))}
                <Button
                  w="40%"
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
      </Flex>
    </Box>
  );
};

export default Cart;
