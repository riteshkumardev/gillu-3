import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Card, CardContent, Typography } from "@material-ui/core";
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
  const auth = useSelector((state) => state?.products.auth);
  const user = useSelector((state) => state?.products.user);
  const chatStatus = useSelector((state) => state?.products.user?.chatStatus);
  const isLoading = useSelector((state) => state?.products.auth.isLoading);

  console.log(isLoading, "isLoading");
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
                      <p
                        style={{
                          maxWidth: "220px",
                          wordWrap: "break-word",
                        }}
                      >
                        {con.message}
                      </p>
                    </CardContent>
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
