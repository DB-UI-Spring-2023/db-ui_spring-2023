import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { CartItem, CartOrderSummary } from "../components";

import "../css/Dashboard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

export const ShoppingCart = () => {
  const { cartItems, setCartItems } = useCart();
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {})
  );

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.Cost * quantities[item.id],
      0
    );
  };

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Flex className="header-color" h="auto" justifyContent="center">
        <Heading
          mt="2rem"
          mb="2rem"
          as="h1"
          size="2xl"
          color="#fff"
          fontWeight="medium"
        >
          Textbook Marketplace
        </Heading>
      </Flex>
      <Box
        maxW={{
          base: "3xl",
          lg: "7xl",
        }}
        mx="auto"
        px={{
          base: "4",
          md: "8",
          lg: "12",
        }}
        py={{
          base: "6",
          md: "8",
          lg: "12",
        }}
      >
        <Stack
          direction={{
            base: "column",
            lg: "row",
          }}
          align={{
            lg: "flex-start",
          }}
          spacing={{
            base: "8",
            md: "16",
          }}
        >
          <Stack
            spacing={{
              base: "8",
              md: "10",
            }}
            flex="2"
          >
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shopping Cart ({cartItems.length} items)
            </Heading>

            <Stack spacing="6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.book_id}
                  itemId={item.book_id}
                  name={item.Title}
                  description={item.Author}
                  imageUrl={item.imageUrl}
                  price={item.Cost}
                  quantity={quantities[item.id]}
                  setQuantity={handleQuantityChange}
                />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary subtotal={calculateSubtotal()} />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link
                onClick={handleNavigation}
                color={mode("#49C5F6")}
              >
                Continue shopping
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};
