import React from "react";
import { useParams } from "react-router-dom";
import SendMessage from "../../components/Message/SendMessage";

const SendMessagePage = () => {
  const { receiverId } = useParams();

  return (
    <React.Fragment>
      <SendMessage id={receiverId} />
    </React.Fragment>
  );
};

export default SendMessagePage;
