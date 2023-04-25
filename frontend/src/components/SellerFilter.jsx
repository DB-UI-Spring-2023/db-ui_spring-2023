import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  InputLeftElement,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { MdSearch } from "react-icons/md";

export const SellerFilter = ({
  selectedSellers,
  setSelectedSellers,
}) => {
  const [sellers, setSellers] = useState([]);
  const [sellerSearch, setSellerSearch] = useState("");

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/sellers"
        );
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
    <Menu>
      <MenuButton as={Button} color="black">
        Sellers <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        {filteredSellers.map((seller, index) => (
          <MenuItem
            color="black"
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
    </Menu>
  );
};
