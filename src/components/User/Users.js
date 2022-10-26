import React from "react";
import Button from '../Button/Button';
import './Users.css';
const Users = (props) => {
return <article className="user">
<header className="user__header">
 
  <h1 className="user__title">{props.name}</h1>
</header>

<div className="user__content">{props.email}</div>
<div className="user__actions">
  <Button mode="flat" link={"/send-message/"+props.id}>
    Message
  </Button>
  
</div>
</article>
};

export default Users;