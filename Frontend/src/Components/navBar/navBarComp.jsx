import * as React from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import "./navBarComp.css";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFFF",
    },
  },
});

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // Check if email is present in local storage
  const isUserLoggedIn = Boolean(localStorage.getItem("email"));
  const user = localStorage.getItem("email");

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("email");
    signOut(auth);
    setTimeout(() => navigate("/"), 2000);
  };
  const handleNavigate = () => {
    handleMenuClose();
    setTimeout(() => navigate("/editprofile"), 2000);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleNavigate}>Edit Profile</MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="primary" sx={{ marginBottom: "5%" }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div" color="secondary">
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Trivia Titans
              </Link>
            </Typography>
            {isUserLoggedIn && user !== "admin@game.com" && (
              <Button
                sx={{
                  "padding-bottom": "0px",
                  "padding-left": "15px",
                }}
                href="/user-teams"
                variant="text"
                color="secondary"
              >
                My Teams
              </Button>
            )}

            {isUserLoggedIn && user !== "admin@game.com" && (
              <Button
                sx={{
                  "padding-bottom": "0px",
                  "padding-left": "15px",
                }}
                href="/lobby"
                variant="text"
                color="secondary"
              >
                Game Lobby
              </Button>
            )}

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex" }}>
              {!isUserLoggedIn && (
                <>
                  <Button href="/login" variant="text" color="secondary">
                    Login
                  </Button>
                  <Button href="/register" variant="text" color="secondary">
                    Register
                  </Button>
                </>
              )}
              {isUserLoggedIn && user === "admin@game.com" && (
                <>
                  <Button href="/admin" variant="text" color="secondary">
                    Game Management
                  </Button>
                  <Button href="/questions" variant="text" color="secondary">
                    Questions
                  </Button>
                </>
              )}
              {isUserLoggedIn && user === "admin@game.com" && (
                <>
                  <Button href="/leaderboard" variant="text" color="secondary">
                    Leaderboard
                  </Button>
                </>
              )}
              {isUserLoggedIn && (
                <Button onClick={handleLogout} variant="text" color="secondary">
                  Logout
                </Button>
              )}
              {/* {isUserLoggedIn && (
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="secondary"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon color="secondary" />
                  </Badge>
                </IconButton>
              )} */}

              {isUserLoggedIn && (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="secondary"
                >
                  <AccountCircle color="secondary" />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
    </ThemeProvider>
  );
}
