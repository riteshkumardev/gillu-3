import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";

import { signin } from "../../actions";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Button, Paper } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";

/**
 * @author
 * @function Header
 **/

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userLogin = (e) => {
    e.preventDefault();

    if (email == "") {
      alert("Email is required");
      return;
    }
    if (password == "") {
      alert("Password is required");
      return;
    }

    dispatch(signin({ email, password }));
  };

  if (auth.authenticated) {
    return <Navigate to={`/`} />;
  }

  return (
    <Layout>
      <Paper sx={{ marginLeft: "5%", marginRight: "5%" }}>
        <div>
          <main>
            <h1> Login</h1>

            <Box
              sx={{ display: "flex", alignItems: "flex-end", margin: "30px" }}
            >
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />

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
            <Box
              sx={{ display: "flex", alignItems: "flex-end", margin: "30px" }}
            >
              <PasswordIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />

              <TextField
                fullWidth
                id="input-with-sx"
                label="Password"
                variant="standard"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <Button
              variant="contained"
              sx={{ marginBottom: "20px" }}
              onClick={userLogin}
            >
              Login
            </Button>
          </main>
        </div>
      </Paper>
    </Layout>
  );
}

export default LoginPage;
