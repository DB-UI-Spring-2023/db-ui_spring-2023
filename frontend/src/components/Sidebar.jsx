import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
  Center,
} from "@chakra-ui/react";
import {
  FiHome,
  FiSettings,
  FiPlusCircle,
  FiPackage,
  FiUser,
  FiAlignLeft,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import Profile from "./Profile";
import CreateListing from "./CreateListing";
import Home from "./Home";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ViewListings from "./ViewListings";
import NavSettings from "./NavSettings";

export default function Sidebar() {
  const nav = useNavigate();

  const [navSize, changeNavSize] = useState("large");
  const [firstName, setFirstName] = useState("Not Logged In");
  const [lastName, setLastName] = useState("Please Log In");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/login").then((response) => {
      if (response.data.loggedIn == true) {
        setFirstName(response.data.user[0].firstName);
        setLastName(response.data.user[0].lastName);
        setEmail(response.data[0].email);
      } else {
      }
    });
  }, [firstName, lastName]);

  return (
    <Flex
      pos="sticky"
      left="5"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.5)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Home navSize={navSize} icon={FiHome} id="home" title="Home" />
      <Profile
        navSize={navSize}
        icon={FiUser}
        id="profile"
        title="Profile"
        action={() => nav("/profile")}
      />

      <CreateListing
        navSize={navSize}
        icon={FiPlusCircle}
        id="create-listing"
        title="Create Listing"
      />
      <ViewListings
        navSize={navSize}
        icon={FiPackage}
        id="view-listing"
        title="View Listings"
      />
      <NavSettings
        navSize={navSize}
        icon={FiSettings}
        id="settings"
        title="Settings"
      />
    </Flex>
  );
}
