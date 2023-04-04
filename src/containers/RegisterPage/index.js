import React, { useState } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { signup } from "../../actions";
import { Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PasswordIcon from "@mui/icons-material/Password";
import "./style.css";
import { Alert, Box, Button, Paper, TextField } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";
import AlertError from "../LoginPage/Alert";

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
  const auth = useSelector((state) => state?.products.auth);
  const authenticating = useSelector(
    (state) => state?.products?.auth?.authenticating
  );
  const authenticated = useSelector(
    (state) => state?.products?.auth?.authenticated
  );
  const errorData = useSelector((state) => state?.products?.auth?.REGerrorData);
  const error = useSelector((state) => state?.products?.auth?.error);
  // console.log();

  const registerUser = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    if (firstName == "") {
      alert("FirstName is required");
      return;
    }
    if (lastName == "") {
      alert("LastName is required");
      return;
    }
    if (email == "") {
      alert("Email is required");
      return;
    }
    if (password == "") {
      alert("password is required");
      return;
    }
    if (!password == "" || lastName == "" || email == "" || firstName == "") {
      dispatch(signup(user));
    }

    dispatch(signup(user));
  };
  ///////////////////////////////////////////////////////////////////////////////

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

  /////////////////////////////////////////////////////////////////////////

  if (auth.authenticated) {
    return <Navigate to={`/`} />;
  }
  return (
    <>
      <Layout>
        <div>
          <Paper sx={{ marginLeft: "5%", marginRight: "5%" }}>
            <h1>Sign Up</h1>

            <Box
              sx={{ display: "flex", alignItems: "flex-end", margin: "30px" }}
            >
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
            <Box
              sx={{ display: "flex", alignItems: "flex-end", margin: "30px" }}
            >
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />

              <TextField
                fullWidth
                id="input-with-sx"
                label="Last Name"
                variant="standard"
                required
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "flex-end", margin: "30px" }}
            >
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
            <Box
              sx={{ display: "flex", alignItems: "flex-end", margin: "30px" }}
            >
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
      {authenticating ? (
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <CircularStatic />
        </div>
      ) : null}
      {errorData ? (
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <AlertError errorData={errorData} />
        </div>
      ) : null}
      {authenticated ? (
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <Alert severity="success">You are successfully Register !</Alert>
        </div>
      ) : null}
    </>
  );
}

export default RegisterPage;
