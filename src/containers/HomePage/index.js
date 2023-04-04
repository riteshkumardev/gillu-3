import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import TelegramIcon from "@mui/icons-material/Telegram";
<<<<<<< HEAD
import { Card, CardContent, Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

=======
import { Card, CardContent, Typography, styled } from "@material-ui/core";
>>>>>>> e88051dd222b701d6bf85064e701e2667e65774a
import "./Message.css";
import {
  getRealtimeUsers,
  updateMessage,
  getRealtimeConversations,
  setChatUser,
  setChatStarted,
  setOpen,
} from "../../actions";

import { Box } from "@mui/system";
import {
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

firebase.initializeApp({
  apiKey: "AIzaSyDR11YqSd5SNL-PIvFseODN6qQYz6VFkKY",
  authDomain: "new-messenger-11851.firebaseapp.com",
  databaseURL: "https://new-messenger-11851-default-rtdb.firebaseio.com",
  projectId: "new-messenger-11851",
  storageBucket: "new-messenger-11851.appspot.com",
  messagingSenderId: "836003557836",
  appId: "1:836003557836:web:97c567c0ed11ac77f3ed69",
  measurementId: "G-NNF99NE147",
});

const database = firebase.database();

const User = (props) => {
  const { user, onClick } = props;

  return (
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
          {/* {user.lastName} */}
        </span>
        <span
          className={user.isOnline ? `isOnline` : `onlineStatus off`}
        ></span>
      </div>
    </div>
  );
};
const drawerWidth = 150;
const HomePage = (props) => {
  const dispatch = useDispatch();
  const messageContainerRef = useRef(null);
  const auth = useSelector((state) => state?.products.auth);
  const user = useSelector((state) => state?.products.user);
  const open = useSelector((state) => state?.products?.user?.open);

  console.log(open, "open");
  const chatStatus = useSelector((state) => state?.products.user?.chatStatus);
  const isLoading = useSelector((state) => state?.products.auth.isLoading);

  console.log(isLoading, "isLoading");
  const [chatUser, setchatUser] = useState("");
  const [Users, setUser] = useState("");
  const [messages, setMessages] = useState("");
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
  useEffect(() => {
    // Listen for changes to the "messages" node in the database and update the state accordingly
    database.ref("messages").on("value", (snapshot) => {
      const messages = snapshot.val();
      if (messages) {
        setMessages(Object.values(messages));
      }
    });

    // Set the current user in the state
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        firebase.auth().signInAnonymously();
      }
    });
  }, []);

  function handleDeleteMessage(messageId) {
    database.ref(`messages/${messageId}`).remove();
  }

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

  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
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

  return (
    <Layout>
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
                  <Box
                    className={`message__card ${
                      con.user_uid_1 == auth.uid
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
                          wordWrap: "break-word",
                        }}
                      >
                        {con.message}
<<<<<<< HEAD

                        {user && message.user === user.uid && (
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            Delete
                          </button>
                        )}
                      </Typography>
                    </CardContent>
                    {/* <CardContent>
                      <Typography>{con.message}</Typography>
                      {!con.user_uid_1 === auth.uid && (
                        <IconButton onClick={() => deleteMessage(con.id)}>
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </CardContent> */}
                  </Card>
=======
                      </p>
                    </Box>
                  </Box>
>>>>>>> e88051dd222b701d6bf85064e701e2667e65774a
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
