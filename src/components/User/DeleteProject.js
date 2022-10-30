import React from "react";
import Modal from "../Modal/Modal";
import Backdrop from "../Backdrop/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { statusActions } from "../../store/statusSlice";
import { API_URL } from "../../util/url";

const DeleteProject = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.status.token);
  const cancelDeleteHandler = () => {
    navigate("/account/projects");
  };

  const acceptDeleteHandler = () => {
    fetch(API_URL+"/projects/" + props.id, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("response not ok");
        }
        return response.json();
      })
      .then((result) => {
        navigate("/account/projects");
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
  return (
    <React.Fragment>
      <Backdrop onClick={cancelDeleteHandler} />
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
  );
};

export default DeleteProject;
