import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";

const SellerFilter = ({ selectedSellers, setSelectedSellers }) => {
  const [sellers, setSellers] = useState([]);
  const [sellerSearch, setSellerSearch] = useState("");

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/sellers");
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers data:", error);
      }
    };
    fetchSellers();
  }, []);

  const handleSellerSelect = (seller) => {
    setSelectedSellers([...selectedSellers, seller]);
  };

  const handleSellerDeselect = (seller) => {
    setSelectedSellers(selectedSellers.filter((s) => s !== seller));
  };

  const filteredSellers = sellers.filter((seller) =>
    seller.toLowerCase().includes(sellerSearch.toLowerCase())
  );

  return (
    <Box>
      <Input
        mt="2rem"
        ml="auto"
        mr="auto"
        w="80%"
        variant="filled"
        type="text"
        placeholder="Search by seller..."
        mb={4}
        value={sellerSearch}
        onChange={(e) => setSellerSearch(e.target.value)}
      />
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              Sellers
            </MenuButton>
            <MenuList>
              {filteredSellers.map((seller, index) => (
                <MenuItem
                  key={index}
                  onClick={() =>
                    selectedSellers.includes(seller)
                      ? handleSellerDeselect(seller)
                      : handleSellerSelect(seller)
                  }
                >
                  {selectedSellers.includes(seller) ? (
                    <del>{seller}</del>
                  ) : (
                    seller
                  )}
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default SellerFilter;
