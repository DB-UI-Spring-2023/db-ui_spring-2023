import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import Sidebar from "./components/Sidebar";
import { Box, Stack } from "@mui/material"
import Navbar from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";

function App() {

  return (
    <Dashboard />
    // <Box>
    //   {/* Navbar */}
    //   <Navbar />
    //   <Stack direction="row" spacing={2} justifyContent="space-evenly">
    //     <Sidebar/>
    //     <Feed/>
    //     <Rightbar/>
    //   </Stack>
    // </Box>
  );
}

export default App;