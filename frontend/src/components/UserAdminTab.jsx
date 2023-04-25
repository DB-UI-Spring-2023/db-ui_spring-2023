import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    Wrap,
    VStack,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import { Button, ButtonGroup } from "@chakra-ui/react";
  import { Icon } from "@chakra-ui/react";
  import { TbFlag3Filled } from "react-icons/tb";
  import { TbTrashXFilled } from "react-icons/tb";
  import { TbEyeCheck } from "react-icons/tb";
  import { useToast, status } from "@chakra-ui/react";
  
  export const UserAdminTab = ({ item }) => {
    const toast = useToast();
    const [open, setOpen] = useState(false);
  
    return (
      <>
        <Card mt="3px">
          <CardBody>
            <VStack alignItems="flex-start" spacing={2}>
              <Text>Email: {item.email}</Text>
              <Text>Privileges: {item.privileges}</Text>
              <Text>First Name: {item.firstName}</Text>
              <Text>Last Name: {item.lastName}</Text>
            </VStack>
            <Wrap spacing="30px">
              <ButtonGroup variant="outline" spacing="6" alignContent={"left"}>
                <Button colorScheme="blue">
                  <Icon as={TbEyeCheck} w={6} h={6} />
                  View
                </Button>
                <Button
                  colorScheme="yellow"
                  onClick={() =>
                    toast({
                      title: "Flagged.",
                      description:
                        "This content is now flagged on the database.",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    })
                  }
                >
                  <Icon as={TbFlag3Filled} w={6} h={6} />
                  Flag
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() =>
                    toast({
                      title: "Deleted.",
                      description:
                        "This content is now deleted from the database.",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    })
                  }
                >
                  <Icon as={TbTrashXFilled} w={6} h={6} />
                  Delete
                </Button>
              </ButtonGroup>
            </Wrap>
          </CardBody>
        </Card>
      </>
    );
  };
  