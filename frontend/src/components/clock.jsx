import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Text fontSize='sm' fontWeight='light' color={'gray.500'}>
        Current Date and Time:
      </Text>
      <Text fontSize='sm'>{time.toLocaleDateString()}</Text>
      <Text fontSize='sm'>{time.toLocaleTimeString()}</Text>
    </Box>
  );
};


