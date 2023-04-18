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
import { useState } from "react";
import NavSettings from "./NavSettings";
import Profile from "./Profile";
import CreateListing from "./CreateListing";
import Home from "./Home";
import ViewListings from "./ViewListings";

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
  return (
    <Flex
      pos="sticky"
      left="5"
      h="100%"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.5)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Home
        navSize={navSize}
        icon={FiHome}
        id="home"
        title="Home"
      />
      <Profile
        navSize={navSize}
        icon={FiUser}
        id="profile"
        title="Profile"
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
