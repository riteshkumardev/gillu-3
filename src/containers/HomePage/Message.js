import React, { forwardRef } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Message.css";

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;

  return (
    <div ref={ref}>
      <Card
        className={`message__card ${
          isUser ? "message__user__card" : "message__guest__card"
        }`}
        variant="outlined"
      >
        <CardContent>
          <Typography color="textSecondary" size="small" gutterBottom>
            {!isUser && `${message.username || "Anonymous"}`}
          </Typography>
          <Typography variant="h6">{message.message}</Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
