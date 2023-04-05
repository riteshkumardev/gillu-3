import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Typography, styled } from "@material-ui/core";

import moment from "moment";
import {
  getRealtimeUsers,
  updateMessage,
  getRealtimeConversations,
  setChatUser,
  setChatStarted,
  setOpen,
  deleteMessage,
} from "../../actions";

import { Box } from "@mui/system";
import {
  CssBaseline,
  Drawer,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CircularColor from "./LoadingCircularProgress";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const User = (props) => {
  const { user, onClick } = props;

  const timestamp = user?.lastSeen;
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );

  return (
    <>
      <div onClick={() => onClick(user)} className="displayName">
        <div className="displayPic">
          <img
            src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
            alt=""
          />
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            margin: "0 10px",
          }}
        >
          <span style={{ fontWeight: 500 }}>
            {user.firstName}
            {user.lastName}
          </span>

          <span
            className={user.isOnline ? `isOnline` : `onlineStatus off`}
          ></span>
        </div>
      </div>
      <p
        style={{
          fontSize: "10px",
          marginTop: "-20px",
          backgroundColor: user.isOnline ? "green" : "blue",
          color: "white",
          borderRadius: "5px",
          marginLeft: "5px",
          marginRight: "5px",
          padding: "3px",
        }}
      >
        {user.isOnline ? (
          "Online"
        ) : (
          <span>
            {" "}
            Lastseen:-{moment(date).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
        )}
      </p>
    </>
  );
};
const drawerWidth = 150;
const HomePage = (props) => {
  const dispatch = useDispatch();
  const messageContainerRef = useRef(null);
  const auth = useSelector((state) => state?.products.auth);
  const user = useSelector((state) => state?.products.user);

  const open = useSelector((state) => state?.products?.user?.open);

  const chatStatus = useSelector((state) => state?.products.user?.chatStatus);
  const isLoading = useSelector((state) => state?.products.auth.isLoading);

  const [chatUser, setchatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState(null);
  let unsubscribe;

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [user.conversations]);
  useEffect(() => {
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //console.log(user);

  //componentWillUnmount
  useEffect(() => {
    return () => {
      //cleanup
      unsubscribe.then((f) => f()).catch((error) => console.log(error));
    };
  }, []);

  const initChat = (user) => {
    setchatUser(`${user.firstName} ${user.lastName}`);
    dispatch(setChatStarted(true));
    dispatch(setChatUser(`${user.firstName} ${user.lastName}`));

    setUserUid(user.uid);

    // console.log(user);

    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
  };
  const timestamp = new Date().getTime();
  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      timestamp: timestamp,
      message,
    };

    if (message !== "") {
      dispatch(updateMessage(msgObj)).then(() => {
        setMessage("");
      });
    }

    //console.log(msgObj);
  };
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const theme = useTheme();
  // const [open, setOpen] = useState(true);
  const handleDrawerClose = () => {
    dispatch(setOpen(false));
  };
  const [lastDateDisplayed, setLastDateDisplayed] = React.useState(null);

  // user.conversations.map((item, i) => {
  //   setLastDateDisplayed([...lastDateDisplayed, item.createdAt]);
  // });

  // console.log(lastDateDisplayed, "lastDateDisplayed");

  return (
    <Layout>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          // marginTop: "50px",
          flexShrink: 0,
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <div className="listOfUsers" onClick={handleDrawerClose}>
            {user.users.length > 0
              ? user.users.map((user) => {
                  const datats = user.uid !== auth.uid;
                  if (datats) {
                    return (
                      <User onClick={initChat} key={user.uid} user={user} />
                    );
                  }
                })
              : null}
          </div>
        </List>
      </Drawer>
      <section className="container">
        <div className="chatArea">
          <div className="messageSections" ref={messageContainerRef}>
            {chatStatus
              ? user.conversations.map((con, i) => (
                  <React.Fragment key={i}>
                    <Box
                      className={`message__card ${
                        con.user_uid_1 == auth.uid // Check if the message was sent by the logged-in user
                          ? "message__user__card"
                          : "message__guest__card"
                      }`}
                      variant="outlined"
                    >
                      <Box>
                        <Typography
                          color="textSecondary"
                          size="small"
                          gutterBottom
                        >
                          {!con && `${con.username || "Anonymous"}`}
                        </Typography>
                        <p
                          style={{
                            maxWidth: "325px",
                            padding: "10px",
                            paddingBottom: "0px",
                            wordWrap: "break-word",
                          }}
                        >
                          {con.message}
                        </p>
                      </Box>
                      {con.user_uid_1 == auth.uid && ( // Show the delete button only if the message was sent by the logged-in user
                        <IconButton
                          onClick={() => dispatch(deleteMessage(con.message))} // Dispatch the deleteMessage action with the message's ID
                          // style={{ position: "absolute", top: 5, right: 5 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                    <p
                      style={{
                        width: "100%",
                        // border: "1px solid red",
                        marginTop: "-15px",
                        marginBottom: "-10px",
                        paddingLeft: "20px",
                        paddingRight: "20px",

                        // padding: "10px",
                        // wordWrap: "break-word",
                        textAlign:
                          con.user_uid_1 == auth.uid ? "right" : "left",
                        color: "black",
                        backgroundColor: "none",
                      }}
                    >
                      {moment(
                        new Date(
                          con.createdAt.seconds * 1000 +
                            con.createdAt.nanoseconds / 1000000
                        )
                      ).format(" h:mm A")}
                    </p>
                  </React.Fragment>
                ))
              : null}

            {isLoading ? (
              <>
                <div style={{ margin: "35%" }}>
                  <CircularColor />
                </div>
                <p style={{ margin: "5%" }}>
                  Thanks for using Gillu Chat .....
                </p>
              </>
            ) : null}
          </div>

          <Box>
            {chatStatus ? (
              <Box sx={{ mr: 1, flex: 1 }}>
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <OutlinedInput
                    value={message}
                    placeholder="Message"
                    sx={{
                      width: "95%",
                      height: "40px",
                      borderRadius: "40px",
                      margin: "auto",
                      bottom: "3%",

                      position: "fixed",
                      marginRight: "17px",
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={submitMessage} edge="end">
                          <TelegramIcon sx={{ marginRight: "15px" }} />
                        </IconButton>
                      </InputAdornment>
                    }
                    // label="Message"
                  />
                </FormControl>
              </Box>
            ) : null}
          </Box>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
