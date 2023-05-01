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
import { useState, useEffect } from "react";
import axios from "axios";

export const Settings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [privileges, setPrivileges] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  
>>>>>>> 1aac9932a37c7222f737a491b3090354a42e70eb
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


  useEffect(() => {
    const fetchUserInfo = async (email) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/${email}`
        );
        console.log("User info fetched successfully:", response.data);
        setFirst(response.data[0].firstName);
        setLast(response.data[0].lastName);
        setEmail(response.data[0].email);
        setPrivileges(response.data[0].privileges);
        if (response.data[0].privileges == "Admin") {
          setIsAdmin(true)
        }
        return response.data;
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };
    fetchUserInfo(email);
  }, [email]);

  useEffect(() => {
    axios.get("http://localhost:8000/login").then((response) => {
      if (response.data.loggedIn == true) {
        setEmail(response.data.user[0].email);
      } else {
        navigate("/");
      }
    });
  },[]);

  const handleAdminDashboard = () => {
    navigate("/admin-dashboard");
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
          <Stack
            direction="column"
            mt="1rem"
            ml="2rem"
            w="20%"
          >
            <Button
              
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
            {isAdmin && (
              <Button
                onClick={handleAdminDashboard}
                color="white"
                bg="blue"
                variant="outline"
                _hover={{
                  bg: "white",
                  color: "blue",
                  border: "2px",
                }}
              >
                Admin Dashboard
              </Button>
            )}
          </Stack>
        </Box>
      </Grid>
    </>
  );
};
