import React, { useState} from "react";
import Button from "../../components/Button/Button";
import Input from '../../components/Form/Input/Input';
import { required, length, email } from '../../util/validators';
import Auth from "./Auth";


const Login = (props) => {
    const [loginForm, setLoginForm] = useState({
        email: {
          value: '',
          valid: false,
          touched: false,
          validators: [required, email]
        },
        password: {
          value: '',
          valid: false,
          touched: false,
          validators: [required, length({ min: 5 })]
        }  
      });
      const [formIsValid, setFormIsValid] = useState(false);

      const inputChangeHandler = (input, value) => {
     
        setLoginForm(prevState => {
            let isValid = true;
            for (const validator of prevState[input].validators) {
              isValid = isValid && validator(value);
            }
            const updatedForm = {
              ...prevState,
              [input]: {
                ...prevState[input],
                valid: isValid,
                value: value
              }
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
        setLoginForm(prevState => {
            return {
             
                ...prevState,
                [input]: {
                  ...prevState[input],
                  touched: true
                }
              }
            
          });
    };
    return <Auth>
        <form onSubmit={e => {
          e.preventDefault();
          console.log(loginForm, formIsValid)
        }}>
        <Input
            id="email"
            label="Your E-Mail"
            type="email"
            control="input"
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler.bind(this, 'email')}
            value={loginForm['email'].value}
            valid={loginForm['email'].valid}
            touched={loginForm['email'].touched}
          />
           <Input
            id="password"
            label="Password"
            type="password"
            control="input"
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler.bind(this, 'password')}
            value={loginForm['password'].value}
            valid={loginForm['password'].valid}
            touched={loginForm['password'].touched}
          />
           <Button design="raised" type="submit" loading={props.loading}>
            Login
          </Button>
        </form>
    </Auth>
};

export default Login;