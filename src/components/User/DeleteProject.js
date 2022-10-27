import React from "react";
import Modal from "../Modal/Modal";
import Backdrop from "../Backdrop/Backdrop";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const DeleteProject = (props) => {
    const navigate = useNavigate();
    const token = useSelector(state => state.status.token);  
    const cancelDeleteHandler = () => {
        navigate('/account/projects');
    };

    const acceptDeleteHandler = () => {
        fetch('http://localhost:8080/projects/'+props.id, {
            headers: {
                Authorization: "Bearer " + token,
              },
            method: "DELETE"

        }).then(response => {
            if (!response.ok){
                throw new Error("response not ok");
            }
            return response.json();
        }).then(result => {
            console.log(result)
            navigate('/account/projects');
        }).catch(err => {
            console.log(err)
        })
        
    }; 
    return <React.Fragment>
        <Backdrop onClick={cancelDeleteHandler}/>
        <Modal
    title="Delete Project"
    acceptEnabled={true}
    onCancelModal={cancelDeleteHandler}
    onAcceptModal={acceptDeleteHandler}
    isLoading={false}
  >
    <h1>Are you sure you want to delete this?</h1>
  </Modal>
  
  </React.Fragment>
};

export default DeleteProject;