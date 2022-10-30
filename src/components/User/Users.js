import React from "react";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import "./Users.css";
const Users = (props) => {
  const userId = useSelector((state) => state.status.userId);
  return (
    <article className="user">
      <header className="user__header">
        {userId === props.id.toString() ? (
          <h1 className="user__title" style={{ color: "blue" }}>
            yourself
          </h1>
        ) : (
          <h1 className="user__title">{props.name}</h1>
        )}
      </header>

      <div className="user__content">{props.email}</div>
      <div className="user__actions">
        <Button mode="flat" link={"/send-message/" + props.id}>
          Message
        </Button>
      </div>
    </article>
  );
};

export default Users;
