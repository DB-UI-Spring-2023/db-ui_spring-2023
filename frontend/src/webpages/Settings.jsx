import {
  Flex,
    Grid,
    GridItem,
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
  } from "@chakra-ui/react";
  import Sidebar from "../components/Sidebar";
  import "../css/Settings.css";
  import { MdSearch } from "react-icons/md";
  
  export const Settings = () => {
    // const { colorMode, toggleColorMode } = useColorMode();
  
    return (
      <>
      <Flex direction="column" className="header-color" py="2rem">
        <h1><b>Settings</b></h1>
      </Flex>
      <Grid templateColumns="12% 1fr" gap={10} m="2rem 2rem auto 2rem">
      <GridItem>
        <Sidebar />
      </GridItem>

      <Box gridColumn="2" bg="tomato" height="auto">
        settings
      </Box>
    </Grid>
    </>
    );
  };
  