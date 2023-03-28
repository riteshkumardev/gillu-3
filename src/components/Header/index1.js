import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions";
import { Paper } from "@mui/material";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const logout = () => {
  //   dispatch(logout())
  // }

  return (
    <Paper>
      <nav className="navbar">
        <a href="#" className="logo">
          Stylist App
        </a>
        <div className="nav-links">
          {/* <a href="#" className="nav-link">
          Home
        </a>
        <a href="#" className="nav-link">
          About
        </a> */}
          {!auth.authenticated ? (
            // <button className="nav-link logout" onClick={props.handleLogout}>Logout</button>

            <ul className="nav-link logout">
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/signup"}>Sign up</NavLink>
              </li>
            </ul>
          ) : (
            // <button className="nav-link login" onClick={props.handleLogin}>Login</button>
            <Link
              to={"#"}
              onClick={() => {
                dispatch(logout(auth.uid));
              }}
            >
              Logout
            </Link>
          )}
        </div>
      </nav>
    </Paper>
  );
};

export default Header;
