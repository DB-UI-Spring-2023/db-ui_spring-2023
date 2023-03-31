import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import React, { useState } from "react";
import Home from "@mui/icons-material/Home";
import AccountBox from "@mui/icons-material/AccountBox";
import AutoStories from "@mui/icons-material/AutoStories";
import ScrollDialog from "./forms/ScrollDialog";

// const StyledModal = styled(Modal)({
//   display:"flex",
//   alignItems:"center",
//   justifyContent:"center",
//   overflow:"scroll"
// });

// const Search = styled("div")(({ theme }) => ({
//   backgroundColor: "white",
//   p: "0 2rem",
//   borderRadius: theme.shape.borderRadius,
//   width: "40%",
// }));

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#dashboard">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#profile">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ScrollDialog />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
