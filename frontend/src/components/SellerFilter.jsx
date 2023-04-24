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
    <Stack direction="row" justifyContent="center" alignItems="center">
      <InputGroup className="input-group" w="50%">
        <InputLeftElement
          pointerEvents="none"
          children={<MdSearch color="#FFF" />}
        />
        <Input
          variant="filled"
          bgColor="#72bfde"
          color="#FFF"
          placeholder="Search by seller"
          _placeholder={{ color: '#FFF' }}
          type="text"
          mb={4}
          value={sellerSearch}
          onChange={(e) => setSellerSearch(e.target.value)}  
        />
        <Menu ml="1rem">
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}z
              color="black"
            >
              Sellers
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
          </>
        )}
      </Menu>
      </InputGroup>
      
    </Stack>
  );
};

export default SellerFilter;
