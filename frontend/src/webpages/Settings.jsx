import {
  Flex,
  Grid,
  GridItem,
  Box,
  Stack,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import "../css/Settings.css";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const Settings = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex direction="column" className="header-color" py="2rem">
        <h1>
          <b>Settings</b>
        </h1>
      </Flex>
      <Grid templateColumns="12% 1fr" gap={10} m="2rem 2rem auto 2rem">
        <GridItem>
          <Sidebar />
        </GridItem>

        <Box gridColumn="2" bg="tomato" height="auto">
          <Stack pt="2rem" pl="1rem" direction="row">
            <Text>Change dark/light mode:</Text>
            <Button
              onClick={toggleColorMode}
              _hover={{ bg: "#252525", color: "#fff" }}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Box>
      </Grid>
    </>
  );
};
