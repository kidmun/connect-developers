import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MesssageSent from '../../components/Message/MessageSent';
import { statusActions } from "../../store/statusSlice";
import { API_URL } from "../../util/url";

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.status.token);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(API_URL+"/messages_sent", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response) {
          throw new Error("response not ok");
        }
        return response.json();
      })
      .then((result) => {
        
        setLoading(false);
       
        setMessages(result.messages);
      })
      .catch((err) => {
        dispatch(
          statusActions.setNotification({
            status: "error",
            title: "Server Error",
            message: "Something is Wrong, Please Wait until We fix it",
          })
        );
        setTimeout(() => {
          dispatch(
            statusActions.setNotification({
              status: "",
              title: "",
              message: "",
            })
          );
        }, 8000);
      });
  }, []);
  return (
    <React.Fragment>
      {messages.map((item) => (
        <MesssageSent key={item._id} message={item} />
      ))}
      {loading && <h1 style={{textAlign: 'center', color: "blue"}}>Loading... </h1>}
      {messages.length === 0 && !loading && (
        <h1 style={{ textAlign: "center", color: "blue" }}>No Messages </h1>
      )}
    </React.Fragment>
  );
};

export default MessagePage;
