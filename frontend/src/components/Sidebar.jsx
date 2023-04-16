import { Avatar, Divider, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { FiHome,
         FiSettings,
         FiPlusCircle,
         FiPackage,
         FiUser,
         FiAlignLeft
} from "react-icons/fi";
import { useState, useEffect } from "react";
import NavItem from "./NavItem";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CreateListing } from "./CreateListing";

export default function Sidebar({ setNavSize }) {
  const [ navSize, changeNavSize ] = useState("large");
  const [ firstName, setFirstName ] = useState("Not Logged In");
  const [ lastName, setLastName ] = useState("Please Log In");
  const [ email, setEmail ] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/login").then((response) => {
      if (response.data.loggedIn == true){
        setFirstName(response.data.user[0].firstName)
        setLastName(response.data.user[0].lastName)
        setEmail(response.data[0].email)
      } else {
        nav("/")
      }
    })
  },[firstName, lastName])

  const nav = useNavigate();
  return (
    <Flex
      pos="sticky"
      top="2.5vh"
      left="5"
      h="80vh"
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
              if (navSize == "small") {
                changeNavSize("large");
                setNavSize("large");
              } else {
                changeNavSize("small");
                setNavSize("small");
              }
            }}
          />
          <NavItem navSize={navSize} icon={FiHome} id="dashboard" title="Dashboard" description="This is the description for the dashboard." action={() => nav('/dashboard')}/>
          <Profile navSize={navSize} icon={FiUser} id="profile" title="Profile" action={() => nav('/profile')} />
          <NavItem navSize={navSize} icon={FiPlusCircle} id="create-listing" title="Create Listing" />
          <NavItem navSize={navSize} icon={FiPackage} id="view-listing" title="View Listings" action={() => nav('/listings')} />
          <NavItem navSize={navSize} icon={FiSettings} id="settings" title="Settings" action={() => nav('/listings')} />
          <CreateListing/>
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
              <Heading as="h3" size="sm">{firstName} {lastName}</Heading>
              {/* <Text color="gray">{email}</Text> */}
            </Flex>
        </Flex> 
      </Flex>    
    </Flex>
  )
}