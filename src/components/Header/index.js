import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Link } from "react-router-dom";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, setChatStarted, setOpen } from "../../actions";
import { Grid } from "@mui/material";

/**
 * @author
 * @function Header
 **/

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const user = useSelector((state) => state?.products?.auth);
  const chatUser = useSelector((state) => state?.products?.user?.userName);
  const chatStatus = useSelector((state) => state?.products.user?.chatStatus);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const authenticated = useSelector(
    (state) => state?.products?.auth?.authenticated
  );
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  React.useEffect(() => {}, [chatUser]);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const auth = useSelector((state) => state?.products.auth);

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    dispatch(setOpen(true));
  };
  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "#1976D2", color: "white" }}
      >
        <Toolbar disableGutters>
          <MenuIcon
            onClick={handleDrawerOpen}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />

          <MenuIcon
            onClick={handleDrawerOpen}
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: {
                md: "flex",
              },
              margin: "auto",

              justifyContent: "center", // Add this line to center horizontally
              alignItems: "center", // Add this line to center vertically
            }}
          >
            <Grid Container>
              <Grid
                item={12}
                sx={{
                  width: "100%",

                  display: "flex",
                  justifyContent: "center", // Add this line to center horizontally
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                  }}
                >
                  {authenticated
                    ? `Hi ${user.firstName} ${user.lastName} `
                    : `Welcome To Gillu Chat  `}
                  {chatStatus ? (
                    <div>
                      &#128073;&nbsp; &#x2194; &nbsp;&#128072;{chatUser}
                    </div>
                  ) : null}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}> */}

          {/* </Box> */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!auth.authenticated ? (
                <Grid Container sx={{ backgroundColor: "black" }}>
                  <Grid item={12} className="topnav">
                    <a href="/login" className="active">
                      Login
                    </a>
                  </Grid>
                  <Grid item={12} className="topnav">
                    <a href="/signup" className="active">
                      Sign up
                    </a>
                  </Grid>
                </Grid>
              ) : (
                <Grid Container sx={{ backgroundColor: "black" }}>
                  <Grid item={12} className="topnav">
                    <a
                      href="#"
                      className="active"
                      onClick={() => {
                        dispatch(logout(auth.uid));
                        dispatch(setChatStarted(false));
                      }}
                    >
                      Logout
                    </a>
                  </Grid>
                </Grid>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
