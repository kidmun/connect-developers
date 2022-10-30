import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Input from "../Form/Input/Input";
import { required, length } from "../../util/validators";
import { statusActions } from "../../store/statusSlice";
import { API_URL } from "../../util/url";
const SendMessage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState({
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  });
  const token = useSelector((state) => state.status.token);
  const contentChangeHandler = (input, value) => {
    console.log(value);
    setContent((prevState) => {
      return {
        ...prevState,
        value: value,
      };
    });
  };
  const inputBlurHandler = () => {
    setContent((prevState) => {
      return {
        ...prevState,
        touched: true,
      };
    });
  };
  const cancelHandler = () => {
    navigate("/users");
  };
  const acceptHandler = () => {
    console.log(content.value);
    if (content.value.length === 0) {
      return;
    }
    fetch(API_URL + "/message/" + props.id, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("response not ok");
        }
        return response.json();
      })
      .then((result) => {
        dispatch(
          statusActions.setNotification({
            status: "success",
            title: "Message",
            message: "you have successfully sent the message",
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
        }, 5000);
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      <Backdrop onClick={cancelHandler} />
      <Modal
        title="Send Message"
        acceptEnabled={true}
        onCancelModal={cancelHandler}
        onAcceptModal={acceptHandler}
        isLoading={false}
      >
        <form>
          <Input
            id="content"
            label="Content"
            control="textarea"
            rows="5"
            onChange={contentChangeHandler}
            onBlur={inputBlurHandler}
            valid={content.valid}
            touched={content.touched}
            value={content.value}
          />
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default SendMessage;
