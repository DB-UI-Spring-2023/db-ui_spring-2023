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
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Settings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("http://localhost:8000/logout")
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  };

  return (
    <>
      <Flex direction="column" className="header-color" py="2rem">
        <h1>
          <b>Settings</b>
        </h1>
      </Flex>
      <Grid
        templateColumns="12% 1fr"
        gap={10}
        m="2rem 2rem auto 2rem"
      >
        <GridItem>
          <Sidebar />
        </GridItem>

        <Box gridColumn="2" height="auto">
          <Stack pt="2rem" pl="2rem" direction="row">
            <Text mt="0.5rem">Change dark/light mode:</Text>
            <Button
              onClick={toggleColorMode}
              _hover={{ bg: "#252525", color: "#fff" }}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
          <Stack direction="row">
            <Button
              mt="1rem"
              ml="2rem"
              w="20%"
              onClick={handleLogout}
              color="white"
              bg="red"
              variant="outline"
              _hover={{
                bg: "white",
                color: "red",
                border: "2px",
              }}
            >
              Log Out
            </Button>
          </Stack>
        </Box>
      </Grid>
    </>
  );
};
