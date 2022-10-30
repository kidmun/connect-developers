import React, { useState } from "react";
import { required, email } from "../../util/validators";
import Modal from "../Modal/Modal";
import Backdrop from "../Backdrop/Backdrop";
import Input from "../Form/Input/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { statusActions } from "../../store/statusSlice";
import { API_URL } from "../../util/url";

const EditAccount = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const token = useSelector((state) => state.status.token);
  const [signupForm, setSignupForm] = useState({
    email: {
      value: props.user.email,
      valid: false,
      touched: false,
      validators: [required, email],
    },
    name: {
      value: props.user.name,
      valid: false,
      touched: false,
      validators: [required],
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const inputChangeHandler = (input, value) => {
    setSignupForm((prevState) => {
      let isValid = true;
      for (const validator of signupForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState,
        [input]: {
          ...prevState[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      setFormIsValid(formIsValid);
      return updatedForm;
    });
  };

  const cancelHandler = () => {
    navigate("/account");
  };
  const acceptHandler = () => {
    console.log(signupForm.name.value);
    fetch(API_URL+"/edit-account/" + props.user._id, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        email: signupForm.email.value,
        name: signupForm.name.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("response not ok");
        }
        return response.json();
      })
      .then((result) => {
        navigate("/account");
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
  };
  const inputBlurHandler = (input) => {
    setSignupForm((prevState) => {
      return {
        ...prevState,
        [input]: {
          ...prevState[input],
          touched: true,
        },
      };
    });
  };
  return (
    <React.Fragment>
      <Backdrop onClick={cancelHandler} />
      <Modal
        title="Update Account"
        acceptEnabled={true}
        onCancelModal={cancelHandler}
        onAcceptModal={acceptHandler}
        isLoading={false}
      >
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, "email")}
          value={signupForm["email"].value}
          valid={signupForm["email"].valid}
          touched={signupForm["email"].touched}
        />
        <Input
          id="name"
          label="Your Name"
          type="text"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, "name")}
          value={signupForm["name"].value}
          valid={signupForm["name"].valid}
          touched={signupForm["name"].touched}
        />
      </Modal>
    </React.Fragment>
  );
};

export default EditAccount;
