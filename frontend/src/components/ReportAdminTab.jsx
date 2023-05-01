import { Card, CardBody, Text, VStack, ButtonGroup, Button, Icon, Wrap } from "@chakra-ui/react";
import { TbFlag3Filled, TbTrashXFilled, TbEyeCheck } from "react-icons/tb";
import { useToast } from "@chakra-ui/react";

export const ReportAdminTab = ({ item, onFlag }) => {
  const toast = useToast();

  return (
    <>
      <Card mt="3px">
        <CardBody>
          <VStack alignItems="flex-start" spacing={2}>
            <Text>ID: {item.id}</Text>
            <Text>Seller Email: {item.seller_email}</Text>
            <Text>Rating: {item.rating}</Text>
            <Text>Title: {item.title}</Text>
            <Text>Comment: {item.comment}</Text>
          </VStack>
          <Wrap spacing="30px">
          <ButtonGroup variant="outline" spacing="6" alignContent={"left"}>
                <Button colorScheme="blue">
                  <Icon as={TbEyeCheck} w={6} h={6} />
                  View
                </Button>
                <Button
                    colorScheme="yellow"
                    onClick={() => {
                        onFlag(item);
                        toast({
                        title: "Flagged.",
                        description: "This content is now flagged on the database.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                        });
                    }}
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
