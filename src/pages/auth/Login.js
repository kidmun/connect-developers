import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input/Input";
import { required, length, email } from "../../util/validators";
import { statusActions } from "../../store/statusSlice";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../util/url";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
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
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangeHandler = (input, value) => {
    setLoginForm((prevState) => {
      let isValid = true;
      for (const validator of prevState[input].validators) {
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
    setLoginForm((prevState) => {
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
          if (!formIsValid) {
            return;
          }
          fetch(API_URL+"/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: loginForm.email.value,
              password: loginForm.password.value,
            }),
          })
            .then((response) => {
              console.log(response)
              if (!response.ok) {
                if (response.status === 401) {
                  throw new Error("Credential Error");
                } else {
                  throw new Error("Server Error");
                }
              }
              return response.json();
            })
            .then((result) => {
              console.log(result);
              localStorage.setItem("token", result.token);
              localStorage.setItem("userId", result.userId);
              setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
              }, 3600000);
              dispatch(statusActions.setToken(result.token));
              dispatch(statusActions.setUserId(result.userId));
              dispatch(
                statusActions.setNotification({
                  status: "success",
                  title: "Login",
                  message: "you are successfully logged in",
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
              }, 6000);
              navigate("/");
            })
            .catch((err) => {
              console.log(err);
              if (err.message === "Credential Error") {
                dispatch(
                  statusActions.setNotification({
                    status: "error",
                    title: "Login",
                    message:
                      "Wrong Email Or Password Please Enter a Valid Email and Password",
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
                }, 7000);
              } else {
                dispatch(
                  statusActions.setNotification({
                    status: "error",
                    title: "Login",
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
                }, 2000);
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
          value={loginForm["email"].value}
          valid={loginForm["email"].valid}
          touched={loginForm["email"].touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, "password")}
          value={loginForm["password"].value}
          valid={loginForm["password"].valid}
          touched={loginForm["password"].touched}
        />
        <Button design="raised" type="submit" loading={props.loading}>
          Login
        </Button>
      </form>
    </Auth>
  );
};

export default Login;
