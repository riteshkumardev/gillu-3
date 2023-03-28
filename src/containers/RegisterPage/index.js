import React, { useState } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { signup } from "../../actions";
import { Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PasswordIcon from "@mui/icons-material/Password";
import "./style.css";
import { Box, Button, Paper, TextField } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
/**
 * @author
 * @function RegisterPage
 **/

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const registerUser = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signup(user));
  };

  if (auth.authenticated) {
    return <Navigate to={`/`} />;
  }
  return (
    <Layout>
      <div>
        <Paper sx={{ marginLeft: "5%", marginRight: "5%" }}>
          <h1>Sign Up</h1>

          <Box sx={{ display: "flex", alignItems: "flex-end", margin: "30px" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />

            <TextField
              fullWidth
              id="input-with-sx"
              label="First Name"
              variant="standard"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", margin: "30px" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />

            <TextField
              fullWidth
              id="input-with-sx"
              label="Last Name"
              variant="standard"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", margin: "30px" }}>
            <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />

            <TextField
              fullWidth
              id="input-with-sx"
              label="Email"
              variant="standard"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", margin: "30px" }}>
            <PasswordIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />

            <TextField
              fullWidth
              id="input-with-sx"
              label="Password"
              variant="standard"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Box>

          <Button
            variant="contained"
            sx={{ marginBottom: "20px" }}
            onClick={registerUser}
          >
            Sign up
          </Button>
        </Paper>
      </div>
    </Layout>
  );
}

export default RegisterPage;
