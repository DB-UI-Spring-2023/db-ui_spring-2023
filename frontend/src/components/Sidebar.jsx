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
import NavItem from "./NavItem";
import Profile from "./Profile";
import CreateListing from "./CreateListing";

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
  return (
    <Flex
      pos="sticky"
      left="5"
      h="100%"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.5)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <NavItem
        navSize={navSize}
        icon={FiHome}
        id="dashboard"
        title="Dashboard"
        description="This is the description for the dashboard."
      />
      <Profile
        navSize={navSize}
        icon={FiUser}
        id="profile"
        title="Profile"
      />
      {/* <NavItem navSize={navSize} icon={FiUser} id="profile" title="Profile" /> */}
      <CreateListing
        navSize={navSize}
        icon={FiPlusCircle}
        id="create-listing"
        title="Create Listing"
      />
      <NavItem
        navSize={navSize}
        icon={FiPackage}
        id="view-listing"
        title="View Listings"
      />
      <NavItem
        navSize={navSize}
        icon={FiSettings}
        id="settings"
        title="Settings"
      />
    </Flex>
  );
}
