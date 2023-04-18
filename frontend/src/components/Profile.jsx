import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Button,
  Flex,
  Menu,
  Link,
  MenuButton,
  Icon,
  Text,
  MenuList,
  Heading,
  Stack,
} from "@chakra-ui/react";
import "../css/Profile.css";

export default function Profile({
  icon,
  title,
  description,
  active,
  navSize,
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu placement="right">
      <Link
        backgroundColor={active && "#AEC8CA"}
        p={3}
        borderRadius={8}
        _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
        w={navSize == "large" && "100%"}
      >
        <MenuButton w="100%">
          <Flex>
            <Icon
              as={icon}
              fontSize="xl"
              color={active ? "#82AAAD" : "gray.500"}
            />
            <Text
              ml={5}
              display={navSize == "small" ? "none" : "flex"}
            >
              {title}
            </Text>
          </Flex>
        </MenuButton>
      </Link>
      <MenuList py={0} border="none" h="20rem" ml={4}>
        <Flex
          pos="absolute"
          mt="9.5rem"
          ml="-10px"
          width={0}
          height={0}
          borderTop="10px solid transparent"
          borderBottom="10px solid transparent"
          borderRight="10px solid #19252e"
        />
        <Flex
          className="listing-modal"
          h={600}
          w={500}
          flexDir="column"
          alignItems="center"
          justify="center"
          borderRadius="10px"
          color="#fff"
          textAlign="center"
        >
          <Heading size="md" fontWeight="normal">
            {title}
          </Heading>
          <Stack direction="column">
            
          </Stack>
        </Flex>
      </MenuList>
    </Menu>
  );
}
