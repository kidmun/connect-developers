import React from "react";
import './LogoutButton.css';
const LogoutButton = (props) => {
    return <button id="button-logout" type="button" onClick={props.onClick}>Logout</button>
};

export default LogoutButton;