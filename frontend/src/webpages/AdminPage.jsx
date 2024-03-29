import {
  InputGroup,
  InputLeftElement,
  Box,
  Wrap,
  Text,
  Input,
  Grid,
  GridItem,
  Stack,
  VStack,
  Flex,
  SimpleGrid,
  Center,
  Heading,
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  DrawerBody,
  Image,
  useColorModeValue,
  useDisclosure,
<<<<<<< HEAD
  AdminTab,
} from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
=======
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
>>>>>>> 1aac9932a37c7222f737a491b3090354a42e70eb
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "../components";
import { Icon } from "@chakra-ui/react";
import { TbBooks } from "react-icons/tb";
import { TbReportMoney } from "react-icons/tb";
import { TbUsers } from "react-icons/tb";
import { TbMessageReport } from "react-icons/tb";
<<<<<<< HEAD
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
// import {BookSearch} from '../components/BookSearch'
import { UserAdminTab } from "../components/UserAdminTab";
import { BookAdminTab } from "../components/BookAdminTab";
import { ReportAdminTab } from "../components/ReportAdminTab";
=======
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
// import {BookSearch} from '../components/BookSearch'
import {UserAdminTab} from '../components/UserAdminTab';
import {BookAdminTab} from '../components/BookAdminTab';
import {ReportAdminTab} from '../components/ReportAdminTab';
import {FlagUserAdminTab} from '../components/FlagUserAdminTab';
import {FlagBookAdminTab} from '../components/FlagBookAdminTab';
import {FlagReportAdminTab} from '../components/FlagReportAdminTab';
>>>>>>> 1aac9932a37c7222f737a491b3090354a42e70eb
import Sidebar from "../components/Sidebar";

export const AdminPage = () => {
  const colors = useColorModeValue(
    ["blue.50", "teal.50", "red.50", "purple.50"],
    ["blue.100", "teal.900", "red.50", "purple.900"]
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];
  const [data, setData] = useState({
    users: [],
    books: [],
    sellerReviews: [],
  });

<<<<<<< HEAD
  const fetchData = async () => {
    try {
      const usersResponse = await fetch(
        `http://localhost:8000/admin/users`
      );
      const booksResponse = await fetch(
        `http://localhost:8000/admin/books`
      );
      const sellerReviewsResponse = await fetch(
        `http://localhost:8000/admin/seller_reviews`
      );

      const users = await usersResponse.json();
      const books = await booksResponse.json();
      const sellerReviews = await sellerReviewsResponse.json();

      setData({ users, books, sellerReviews });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

=======
    const [flaggedUsers, setFlaggedUsers] = useState([]);
    const [flaggedBooks , setFlaggedBooks] = useState([]);
    const [flaggedReviews, setFlaggedReviews] = useState([]);

    const handleFlagU = (item) => {
        setFlaggedUsers((prevFlaggedItems) => [...prevFlaggedItems, item]);
    };
    const handleFlagB = (item) => {
        setFlaggedBooks((prevFlaggedItems) => [...prevFlaggedItems, item]);
        };
    const handleFlagR = (item) => {
        setFlaggedReviews((prevFlaggedItems) => [...prevFlaggedItems, item]);
        };



  const fetchData = async () => {
    try {
      const usersResponse = await fetch(`http://localhost:8000/admin/users`);
      const booksResponse = await fetch(`http://localhost:8000/admin/books`);
      const sellerReviewsResponse = await fetch(
        `http://localhost:8000/admin/seller_reviews`
      );

      const users = await usersResponse.json();
      const books = await booksResponse.json();
      const sellerReviews = await sellerReviewsResponse.json();

      setData({ users, books, sellerReviews });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

>>>>>>> 1aac9932a37c7222f737a491b3090354a42e70eb
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
<<<<<<< HEAD
=======
      <Flex direction="column" className="header-color" py="2rem">
        <h1>
          <b>Admin Page</b>
        </h1>
      </Flex>
>>>>>>> 1aac9932a37c7222f737a491b3090354a42e70eb
      <Grid
        templateAreas={`"header header"
                            "sideBar Dashboard"
                            "sideBar footer"
            `}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"200px 1fr"}
        h="600px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
        border={"1px"}
        borderColor="gray.200"
      >
        <GridItem pl="2" area={"header"}>
          <Center>
            <Heading
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontWeight="bold"
            >
              Admin Page{" "}
            </Heading>
          </Center>
        </GridItem>
        <GridItem pl="2" area={"sideBar"}>
          <Sidebar />
        </GridItem>
        <GridItem
          pl="2"
          bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
          area={"Dashboard"}
        >
          Dashboard
          <Stack direction="row" spacing={4} align="center">
            <Card flex={1} textAlign="center">
              <CardHeader bgGradient="linear(to-b, purple.500, blue.500)">
                <Heading size="md" color={"white"}>
                  Shelf{" "}
                </Heading>
              </CardHeader>
              <CardBody>
                <Icon as={TbBooks} w={8} h={8} color="blue.200" />
                <Stat>
                  <StatLabel>Book Count</StatLabel>
                  <StatNumber>0.00</StatNumber>
                </Stat>
              </CardBody>
              <CardFooter justifyContent="center">
                <Clock />
              </CardFooter>
            </Card>
            <Card flex={1} textAlign="center">
              <CardHeader bgGradient="linear(to-b, green.200, teal.400)">
                <Heading size="md" color={"white"}>
                  {" "}
                  Sales
                </Heading>
              </CardHeader>
              <CardBody>
                <Icon
                  as={TbReportMoney}
                  w={8}
                  h={8}
                  color="green.200"
                />
                <Stat>
                  <StatLabel> Shelf Value </StatLabel>
                  <StatNumber>0.00</StatNumber>
                </Stat>
              </CardBody>
              <CardFooter justifyContent="center">
                <Clock />
              </CardFooter>
            </Card>
            <Card
              flex={1}
              textAlign="center"
              border="2px"
              borderColor="red.500"
              borderRadius="md"
            >
<<<<<<< HEAD
              <CardHeader bgGradient="linear(to-r, red.400, pink.500)">
                <Heading size="md" color={"white"}>
                  {" "}
                  Report{" "}
                </Heading>
              </CardHeader>
              <CardBody>
                <Icon
                  as={TbMessageReport}
                  w={8}
                  h={8}
                  color="red.400"
                />
                <Stat>
                  <StatLabel>Number of Report</StatLabel>
                  <StatNumber>0.00</StatNumber>
                </Stat>
              </CardBody>
              <CardFooter justifyContent="center">
                <Clock />
              </CardFooter>
            </Card>
            <Card flex={1} textAlign="center">
              <CardHeader bgGradient="linear(to-b, pink.200, pink.400)">
                <Heading size="md" color={"white"}>
                  {" "}
                  User
                </Heading>
              </CardHeader>
              <CardBody>
                <Icon as={TbUsers} w={8} h={8} color="pink.200" />
                <Stat>
                  <StatLabel>User Count</StatLabel>
                  <StatNumber>0.00</StatNumber>
                </Stat>
              </CardBody>
              <CardFooter justifyContent="center">
                <Clock />
              </CardFooter>
            </Card>
          </Stack>
          <Divider />
          <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
            <TabList>
              <Tab>Shelf</Tab>
              <Tab>Listing</Tab>
              <Tab>Report</Tab>
              <Tab>Users</Tab>
            </TabList>
            <TabPanels p="2rem">
              <TabPanel>
                {data.users.map((user, index) => (
                  <UserAdminTab key={index} item={user} />
                ))}
              </TabPanel>
              <TabPanel>
                {data.books.map((book, index) => (
                  <AdminTab key={index} item={book} />
                ))}
              </TabPanel>
              <TabPanel>
                {data.sellerReviews.map((review, index) => (
                  <AdminTab key={index} item={review} />
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </>
  );
};
=======
                <GridItem pl='2' area={'header'}>
                    <Center>   
                    <Heading
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        fontWeight='bold'
                        >Admin Page </Heading>
                    </Center>
                </GridItem>
                <GridItem pl='2'  area={'sideBar'}>
                    <Sidebar />
                </GridItem>
                <GridItem pl='2' bgGradient='linear(red.100 0%, orange.100 25%, yellow.100 50%)' area={'Dashboard'}>
                    Dashboard
                        <Stack direction='row' spacing={4} align='center'>
                            <Card flex={1} textAlign='center'>
                                <CardHeader bgGradient="linear(to-b, purple.500, blue.500)" >
                                    <Heading size='md' color={"white"}>Shelf </Heading>
                                </CardHeader>
                                <CardBody>
                                    <Icon as={ TbBooks } w={8} h={8} color='blue.200' />
                                    <Stat>
                                        <StatLabel>Book Count</StatLabel>
                                        <StatNumber>{data.books.length}</StatNumber>
                                    </Stat>
                                </CardBody>
                                <CardFooter justifyContent='center'>
                                    <Clock />
                                </CardFooter>
                            </Card>
                            <Card flex={1} textAlign='center'>
                                <CardHeader  bgGradient="linear(to-b, green.200, teal.400)">
                                    <Heading size='md' color={"white"} > Sales</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Icon as={ TbReportMoney } w={8} h={8} color='green.200' />
                                    <Stat>
                                        <StatLabel> Shelf Value </StatLabel>
                                        <StatNumber>{data.books.length}</StatNumber>
                                    </Stat>
                                </CardBody>
                                <CardFooter justifyContent='center'>
                                    <Clock />
                                </CardFooter>
                            </Card>
                            <Card flex={1} textAlign="center" border="2px" borderColor="red.500" borderRadius="md">
                                <CardHeader bgGradient="linear(to-r, red.400, pink.500)">
                                    <Heading size='md' color={"white"}> Report </Heading>
                                </CardHeader>
                                <CardBody>
                                    <Icon as={ TbMessageReport } w={8} h={8} color='red.400' />
                                    <Stat>
                                        <StatLabel>Number of Reviews</StatLabel>
                                        <StatNumber>{data.sellerReviews.length}</StatNumber>
                                    </Stat>
                                </CardBody>
                                <CardFooter justifyContent='center'>
                                    <Clock />
                                </CardFooter>
                            </Card>
                            <Card flex={1} textAlign='center'>
                                <CardHeader bgGradient="linear(to-b, pink.200, pink.400)">
                                    <Heading size='md' color={"white"}> User</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Icon as={ TbUsers } w={8} h={8} color='pink.200' />
                                    <Stat>
                                        <StatLabel>User Count</StatLabel>
                                        <StatNumber>{data.users.length}</StatNumber>
                                    </Stat>
                                </CardBody>
                                <CardFooter justifyContent='center'>
                                    <Clock />
                                </CardFooter>
                            </Card>
                        </Stack>
                        <Divider />
                        <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
                            <TabList>
                                <Tab>Shelf</Tab>
                                <Tab>Listing</Tab>
                                <Tab>Report</Tab>
                                <Tab>Users</Tab>
                                <Tab>FlaggedUsers</Tab>
                                <Tab>FlaggedReviews</Tab>
                                <Tab>FlaggedBooks</Tab>
                            </TabList>
                            <TabPanels p='2rem'>
                            <TabPanel>
                                {data.books.map((book, index) => (
                                    <BookAdminTab item={book} onFlag={handleFlagB} />
                                ))}
                            </TabPanel>
                            <TabPanel>
                                {data.books.map((book, index) => (
                                    <BookAdminTab item={book} onFlag={handleFlagB} />
                                ))}
                            </TabPanel>
        
                            <TabPanel>
                                {data.sellerReviews.map((review, index) => (
                                    <ReportAdminTab item={review} onFlag={handleFlagR} />
                                ))}
                            </TabPanel>
                            <TabPanel>
                                {data.users.map((user, index) => (
                                    <UserAdminTab item={user} onFlag={handleFlagU} />
                                ))}
                            </TabPanel>
                            <TabPanel>
                                {flaggedUsers.map((user, index) => (
                                    <FlagUserAdminTab item={user} onFlag={handleFlagU} />
                                ))}
                            </TabPanel>
                            <TabPanel>
                                {flaggedReviews.map((user, index) => (
                                    <FlagReportAdminTab item={user} onFlag={handleFlagU} />
                                ))}
                            </TabPanel>
                            <TabPanel>
                                {flaggedBooks.map((user, index) => (
                                    <FlagBookAdminTab item={user} onFlag={handleFlagU} />
                                ))}
                            </TabPanel>
                            </TabPanels>
                        </Tabs>
                </GridItem>
                <GridItem pl='2' bg='blue.300' area={'footer'}>
                    Footer
                </GridItem>
            </Grid>     
        </>
    );
}
>>>>>>> 1aac9932a37c7222f737a491b3090354a42e70eb

export default AdminPage;
