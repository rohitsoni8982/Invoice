import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Invoice Management
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Invoice Form
          </Button>
          <Button color="inherit" component={Link} to="/invoice_list">
            Invoice List
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;