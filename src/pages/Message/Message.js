import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "../../components/Message/Message";

const MessagePage = () => {
    const [messages, setMessages] = useState([]);
    const userId = useSelector(state => state.status.userId);
    const token = useSelector(state => state.status.token);
    console.log(userId)
    useEffect(() => {
        fetch('http://localhost:8080/messages', {
            headers: {
                Authorization: 'Bearer ' + token
              }           
        }).then(response => {
            if (!response){
                throw new Error("response not ok");
            }
            return response.json();
        })
        .then(result => {
            console.log(result)
            setMessages(result.messages);
        })
        .catch(err => {
            console.log(err)
        });
    }, []);
    return <React.Fragment>
      {messages.map(item => (<Message key={item._id} message={item}/>))}
    </React.Fragment>
};

export default MessagePage;