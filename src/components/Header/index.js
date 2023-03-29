import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import TouchAppIcon from "@mui/icons-material/TouchApp";

import { NavLink, Link } from "react-router-dom";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions";
import { Grid } from "@mui/material";

/**
 * @author
 * @function Header
 **/

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const user = useSelector((state) => state?.auth);
  const chatUser = useSelector((state) => state?.user?.userName);
  const ChatStatus = useSelector((state) => state.ChatStatus);
  console.log(chatUser, "user");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const authenticated = useSelector((state) => state?.auth?.authenticated);
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
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "#1976D2", color: "white" }}
      >
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            sx={{ margin: "auto", textAlign: "center", display: "flex" }}
          >
            {authenticated
              ? `Hi ${user.firstName} ${user.lastName} `
              : `Welcome To Gillu Chat  `}

            <div>&nbsp; &#x2194; &nbsp;{chatUser} </div>
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

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
