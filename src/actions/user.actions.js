import { userConstants } from "./constants";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { v4 as uuidv4 } from "uuid";
uuidv4();
const firestore = firebase.firestore;

export const getRealtimeUsers = (uid) => {
  //console.log('uid', uid)

  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

    const db = firestore();
    const unsubscribe = db
      .collection("users")
      //.where("uid", "!=", uid)
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach(function (doc) {
          if (doc.data().uid != uid) {
            users.push(doc.data());
          }
        });
        //console.log(users);

        dispatch({
          type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
          payload: { users },
        });
      });

    return unsubscribe;
  };
};

export const updateMessage = (msgObj) => {
  return async (dispatch) => {
    const db = firestore();
    db.collection("conversations")
      .add({
        ...msgObj,
        isView: false,
        createdAt: new Date(),
        id: uuidv4(),
        // createdAt: new Date().toLocaleString(),
      })
      .then((data) => {
        console.log(data);
        // const createdAt = new Date().toLocaleString(); // format the date
        // console.log(createdAt, "toLocaleString"); // log
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setChatUser = (user) => {
  return {
    type: userConstants.SET_USER_NAME,
    payload: user,
  };
};
export const setChatStarted = (payload) => {
  return {
    type: userConstants.SET_CHAT_START_STATUS,
    payload,
  };
};
export const setOpen = (payload) => {
  return {
    type: userConstants.SET_OPEN,
    payload,
  };
};

export const deleteMessage = (conversationId, messageId) => {
  return async (dispatch) => {
    const db = firestore();
    const conversationRef = db.collection("conversations").doc(conversationId);

    conversationRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const messages = doc.data().conversations;
          const updatedMessages = messages.filter(
            (message) => message.id !== messageId
          );

          conversationRef
            .update({
              conversations: updatedMessages,
            })
            .then(() => {
              console.log("Message deleted successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getRealtimeConversations = (user) => {
  return async (dispatch) => {
    const db = firestore();
    db.collection("conversations")
      .where("user_uid_1", "in", [user.uid_1, user.uid_2])
      .orderBy("createdAt", "asc")

      .onSnapshot((querySnapshot) => {
        const conversations = [];

        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_uid_1 == user.uid_1 &&
              doc.data().user_uid_2 == user.uid_2) ||
            (doc.data().user_uid_1 == user.uid_2 &&
              doc.data().user_uid_2 == user.uid_1)
          ) {
            // add messages to the conversation array only if they belong to the active chat user
            if (
              doc.data().user_uid_1 === user.uid_1 ||
              doc.data().user_uid_2 === user.uid_1
            ) {
              conversations.push(doc.data());
            }
          }
        });

        dispatch({
          type: userConstants.GET_REALTIME_MESSAGES,
          payload: { conversations },
        });
      });
  };
};
