import {
  Box,
  Button,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import React, { useState } from "react";
import Home from "@mui/icons-material/Home";
import AccountBox from "@mui/icons-material/AccountBox";
import AutoStories from "@mui/icons-material/AutoStories";

const StyledModal = styled(Modal)({
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  overflow:"scroll"
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  p: "0 2rem",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
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
            <ListItemButton onClick={e => setOpen(true)} component="a" href="#create-listing">
              <ListItemIcon>
                <AutoStories />
              </ListItemIcon>
              <ListItemText primary="Create Listing" />
            </ListItemButton>
            <StyledModal
              open={open}
              onClose={e => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box width={400} height={280} bgcolor="white" p={3} borderRadius={5}>
                <Typography variant="h6" color="gray" textAlign="center">Search for existing books on database:</Typography>
                <label >
                  Title:{' '}
                  <Search>
                    <InputBase placeholder="Enter Title" />
                  </Search>
                </label>
                <Button>Submit</Button>
                <Typography variant="h6" color="gray" textAlign="center">or</Typography>
                <Typography variant="h6" color="gray" textAlign="center">Fill in information for new book listing:</Typography>
                <label >
                  Title:{' '}
                  <Search>
                    <InputBase placeholder="Enter Title" />
                  </Search>
                </label>
                <label >
                  Author:{' '}
                  <Search>
                    <InputBase placeholder="Enter Author" />
                  </Search>
                </label>
                <label >
                  Condition:{' '}
                  <Search>
                    <InputBase placeholder="Enter Condition" />
                  </Search>
                </label>
                <label >
                  Format:{' '}
                  <Search>
                    <InputBase placeholder="Enter Format" />
                  </Search>
                </label>
                <label >
                  Cost:{' '}
                  <Search>
                    <InputBase placeholder="Enter Cost" />
                  </Search>
                </label>
                <Button>Submit</Button>
              </Box>
            </StyledModal>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
