import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SellerPopup = ({ sellerEmail }) => {
  const [seller, setSeller] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/sellers/${sellerEmail}`);
        console.log('Seller fetched successfully:', response.data);
        setSeller(response.data);
      } catch (error) {
        console.error('Error fetching seller:', error);
      }
    };
    fetchSeller();
  }, [sellerEmail]);

  const handleClick = () => {
    navigate(`/seller-profile/${sellerEmail}`);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} bg="white" boxShadow="md">
      <Text>Name: {seller.first} {seller.last}</Text>
      <Text>Email: {seller.email}</Text>
      <Text>Privileges: {seller.privileges}</Text>
      <Button colorScheme="blue" onClick={handleClick}>
        View Profile
      </Button>
    </Box>
  );
};

export default SellerPopup;
