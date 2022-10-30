import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { statusActions } from "../../store/statusSlice";
import Input from "../../components/Form/Input/Input";
import Button from "../../components/Button/Button";
import { required, length, email } from "../../util/validators";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../util/url";

const Signup = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    email: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, email],
    },
    password: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, length({ min: 5 })],
    },
    name: {
      value: "",
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
    <Auth>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(signupForm.email.value, formIsValid);

          fetch(API_URL+"/auth/signup", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: signupForm.email.value,
              name: signupForm.name.value,
              password: signupForm.password.value,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                if (response.status === 422) {
                  throw new Error("Credential Error");
                } else {
                  throw new Error("Server Error");
                }
              }
              return response.json();
            })
            .then((result) => {
              console.log(result);
              dispatch(
                statusActions.setNotification({
                  status: "succes",
                  title: "Signup",
                  message: "you have successfully created an account",
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
              navigate("/login");
            })
            .catch((err) => {
              console.log(err.message);
              if (err.message === "Credential Error") {
                dispatch(
                  statusActions.setNotification({
                    status: "error",
                    title: "Signup",
                    message: "Please Enter a Valid Email, Name and Password",
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
              } else {
                dispatch(
                  statusActions.setNotification({
                    status: "error",
                    title: "Signup",
                    message: "Something is Wrong, Please try Again",
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
              }
            });
        }}
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
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, "password")}
          value={signupForm["password"].value}
          valid={signupForm["password"].valid}
          touched={signupForm["password"].touched}
        />
        <Button design="raised" type="submit" loading={props.loading}>
          Signup
        </Button>
      </form>
    </Auth>
  );
};

export default Signup;
