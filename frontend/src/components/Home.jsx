import React from "react";
import {
  Flex,
  Menu,
  Link,
  MenuButton,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export default function Home({
  icon,
  title,
  active,
  navSize,
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/dashboard");
  };

  return (
    
      <Menu placement="right">
        <Link
          backgroundColor={active && "#AEC8CA"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={navSize == "large" && "100%"}
        >
          <MenuButton w="100%" onClick={handleNavigation}>
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#82AAAD" : "gray.500"}
              />
              <Text ml={5} display={{ base: "none", lg: "flex" }}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        
      </Menu>

  );
}
