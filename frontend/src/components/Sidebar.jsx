import { Avatar, Divider, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { FiHome,
         FiSettings,
         FiPlusCircle,
         FiPackage,
         FiUser,
         FiAlignLeft
} from "react-icons/fi";
import { useState } from "react";
import NavItem from "./NavItem";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [ navSize, changeNavSize ] = useState("large");

  const nav = useNavigate();
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.5)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
          <IconButton
            background="none"
            mt={5}
            _hover={{ background: 'none' }}
            icon={<FiAlignLeft/>}
            onClick={() => {
                if (navSize == "small")
                  changeNavSize("large")
                else
                  changeNavSize("small")
            }}
          />
          <NavItem navSize={navSize} icon={FiHome} id="dashboard" title="Dashboard" description="This is the description for the dashboard." />
          <Profile navSize={navSize} icon={FiUser} id="profile" title="Profile" />
          {/* <NavItem navSize={navSize} icon={FiUser} id="profile" title="Profile" /> */}
          <NavItem navSize={navSize} icon={FiPlusCircle} id="create-listing" title="Create Listing" />
          <NavItem navSize={navSize} icon={FiPackage} id="view-listing" title="View Listings" action={nav('/listings')} />
          <NavItem navSize={navSize} icon={FiSettings} id="settings" title="Settings" />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
            <Avatar size="sm" src="avatar-1.jpg" />
            <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
              <Heading as="h3" size="sm">John Doe</Heading>
              <Text color="gray">Admin</Text>
            </Flex>
        </Flex> 
      </Flex>    
    </Flex>
  )
}