import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import React from "react";
import Home from "@mui/icons-material/Home";
import AccountBox from "@mui/icons-material/AccountBox";
import AutoStories from "@mui/icons-material/AutoStories";

const Sidebar = () => {
  return (
    <Box 
        flex={1} 
        p={2}
        sx={{ display: { xs: "none", sm: "block" } }}
    >
        <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
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
            <ListItemButton component="a" href="#create-listing">
              <ListItemIcon>
                <AutoStories />
              </ListItemIcon>
              <ListItemText primary="Create Listing" />
            </ListItemButton>
            
          </ListItem>
        </List>
        </Box>
    </Box>
  );
};

export default Sidebar;
