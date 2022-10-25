import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Account.css';
import Button from "../Button/Button";

const Account = () => {
  const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const userId = useSelector(state => state.status.userId);
    const token = useSelector(state => state.status.token);
    useEffect(() => {
        fetch('http://localhost:8080/users/'+ userId, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      if (!response.ok){
        throw new Error("response not ok");
      }
      return response.json()
    }).then(result => {
      console.log(result)  
      setUser(result.user)
    }).catch(err => {
      console.log(err)
    })
    }, [token]);
    const postHandler = () => {
      navigate('/account/posts');
    };
    const projectHandler = () => {
      navigate('/account/projects');
    };
    return <React.Fragment>
      <div className="button-account">
      <Button>Edit Account</Button>
      </div>
    
    <div className="container">
  <div className="items" onClick={postHandler}>
    <div className="icon-wrapper">
      <i className="fa fa-file-text-o">====</i>
    </div>
    <div className="project-name">
      <p>My POSTS</p>
    </div>
  </div>
  <div className="items" onClick={projectHandler}>
    <div className="icon-wrapper">
      <i className="fa fa-th-list">----</i>
    </div>
    <div className="project-name">
      <p>My PROJECTS</p>
    </div>
  </div>
    
</div>
    </React.Fragment>
};

export default Account;