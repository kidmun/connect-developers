import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { statusActions} from '../../store/statusSlice';
import Button from "../Button/Button";
import './Account.css';
import { API_URL } from "../../util/url";

const Account = () => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const userId = useSelector(state => state.status.userId);
    const token = useSelector(state => state.status.token);
    useEffect(() => {
        fetch(API_URL+'/users/'+ userId, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      if (!response.ok){
        throw new Error("response not ok");
      }
      return response.json()
    }).then(result => {
      
      setUser(result.user)
    }).catch(err => {
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
      <Button link={"/edit-account"}>Edit Account</Button>
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