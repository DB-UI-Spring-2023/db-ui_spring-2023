import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  ListItemButton,
  ListItemIcon,
  TextField,
  Typography,
} from "@mui/material";
import AutoStories from "@mui/icons-material/AutoStories";

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <ListItemButton
        onClick={handleClickOpen("paper")}
        component="a"
        href="#create-listing"
      >
        <ListItemIcon>
          <AutoStories />
        </ListItemIcon>
        Create Listing
      </ListItemButton>
      {/* <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Create Listing</DialogTitle>

        <DialogContent dividers={scroll === "paper"}>
          <Typography variant="h6" color="gray" textAlign="center">
            Search for existing textbooks on database:
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="listing-keyword"
            label="Search Keywords(Author, Title, etc.)"
            fullWidth
            variant="standard"
          />
          <Button>Submit</Button>
          <Typography variant="h6" color="gray" textAlign="center">
            or
          </Typography>
          <Typography variant="h6" color="gray" textAlign="center">
            Fill in information for new book listing:
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="listing-title"
            label="Enter Title"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="listing-author"
            label="Enter Author"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="listing-condition"
            label="Enter Condition"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="listing-format"
            label="Enter Format"
            fullWidth
            variant="standard"
          />
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-price">Price</InputLabel>
          <Input
            id="standard-adornment-price"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
          <Button>Submit</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
