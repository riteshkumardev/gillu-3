import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Card, CardContent, Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import "./Message.css";
import {
  getRealtimeUsers,
  updateMessage,
  getRealtimeConversations,
  setChatUser,
  setChatStarted,
} from "../../actions";

import { Box } from "@mui/system";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import CircularColor from "./LoadingCircularProgress";

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

const HomePage = (props) => {
  const dispatch = useDispatch();
  const messageContainerRef = useRef(null);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const chatStatus = useSelector((state) => state.user?.chatStatus);
  const isLoading = useSelector((state) => state.auth.isLoading);

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

  return (
    <Layout>
      <section className="container">
        <div className="listOfUsers">
          {user.users.length > 0
            ? user.users.map((user) => {
                const datats = user.uid !== auth.uid;
                if (datats) {
                  return <User onClick={initChat} key={user.uid} user={user} />;
                }
              })
            : null}
        </div>

        <div className="chatArea">
          <div className="messageSections" ref={messageContainerRef}>
            {chatStatus
              ? user.conversations.map((con, i) => (
                  <Card
                    className={`message__card ${
                      con.user_uid_1 == auth.uid
                        ? "message__user__card"
                        : "message__guest__card"
                    }`}
                    variant="outlined"
                  >
                    <CardContent>
                      <Typography
                        color="textSecondary"
                        size="small"
                        gutterBottom
                      >
                        {!con && `${con.username || "Anonymous"}`}
                      </Typography>
                      <Typography sx={{ paddingBottom: "15px" }}>
                        {con.message}

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
                      width: "70%",
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
