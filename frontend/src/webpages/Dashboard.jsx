import {
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import "../css/Dashboard.css";
import { MdSearch } from "react-icons/md";
import { CreateListing, Header, Home, Linstings, NavSettings, Profile, Settings, Sidebar, ViewListings } from "../components";

export const Dashboard = () => {

  return (
    <Grid
      templateAreas={`"header header"
                      "nav main"`}
      gridTemplateRows={""}
      gridTemplateColumns={"15% 1fr"}
      h="auto"
      gap="2"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem className="header-color" area={"header"}>
        <Stack direction="row">
          <InputGroup className="input-group" m="2rem auto" w="50%">
            <InputLeftElement
              pointerEvents='none'
              children={<MdSearch color='#606060' />}
            />
            <Input variant='filled' bgColor="#82AAAD" color="#606060" placeholder='Search for a textbook' />
          </InputGroup>
        </Stack>
      </GridItem>
      <GridItem pl="2" area={"nav"}>
        <Sidebar />
      </GridItem>
      <GridItem pl="2" bg="#82AAAD" area={"main"}>
        Main
      </GridItem>
    </Grid>
  );
};
