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
import { Alert, Button, Paper } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import AlertError from "./Alert";

/**
 * @author
 * @function Header
 **/

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.products.auth);
  const authenticating = useSelector(
    (state) => state?.products?.auth?.authenticating
  );
  const authenticated = useSelector(
    (state) => state?.products?.auth?.authenticated
  );
  const errorData = useSelector((state) => state?.products?.auth?.errorData);
  // console.log(errorData, "errorData");
  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };

  function CircularStatic() {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 10
        );
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);

    return <CircularProgressWithLabel value={progress} />;
  }

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
    <>
      <Layout>
        <Paper sx={{ marginLeft: "5%", marginRight: "5%" }}>
          <div>
            <main>
              <h1> Login</h1>

              <Box
                sx={{ display: "flex", alignItems: "flex-end", margin: "30px" }}
              >
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />

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

      {authenticating ? (
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <CircularStatic />
        </div>
      ) : null}
      {errorData ? (
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <AlertError />
        </div>
      ) : null}
      {authenticated ? (
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <Alert severity="success">You are successfully logged !</Alert>
        </div>
      ) : null}
    </>
  );
}

export default LoginPage;
