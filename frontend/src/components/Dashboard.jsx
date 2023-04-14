import { Grid, GridItem, Input, Stack, Menu, MenuButton, IconButton, useColorMode } from "@chakra-ui/react";
import { MdDensityMedium } from 'react-icons/md';
import Sidebar from "./Sidebar";

export const Dashboard = () => {
  // const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Grid
      templateAreas={`"header header"
                      "nav main"
                      "nav footer"`}
      gridTemplateRows={""}
      gridTemplateColumns={"3 1fr"}
      h="20rem"
      gap="2"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem bg="salmon" area={"header"}>
        <Stack direction='row'>
          <Input mt='2rem' ml='auto' mr='auto' w='90%' variant='filled' placeholder='Enter Textbook Keywords...' />
          
          <Menu>
              <MenuButton mt='2rem' mr='auto' as={IconButton} icon={<MdDensityMedium />} variant='outline' />
          </Menu>
      </Stack>
      </GridItem>
      <GridItem w="3" pl="2" bg="" area={"nav"}>
        <Sidebar />
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        Main
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
};
