import {
  Grid,
  GridItem,
  Input,
  Stack,
  Menu,
  MenuButton,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { MdDensityMedium } from "react-icons/md";
import Sidebar from "./Sidebar";

export const Dashboard = () => {
  // const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Grid
      templateAreas={`"header header"
                      "nav main"`}
      gridTemplateRows={""}
      gridTemplateColumns={"12% 1fr"}
      h="auto"
      gap="2"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem bg="salmon" area={"header"}>
        <Stack direction="row">
          <Input
            m="2rem auto"
            w="90%"
            variant="filled"
            placeholder="Search for a textbook"
          />
        </Stack>
      </GridItem>
      <GridItem pl="2" area={"nav"}>
        <Sidebar />
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        Main
      </GridItem>
    </Grid>
  );
};
