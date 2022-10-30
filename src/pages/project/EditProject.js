import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditProject from "../../components/Project/EditProject";
import { statusActions } from "../../store/statusSlice";
import { API_URL } from "../../util/url";

const EditProjectPage = (props) => {
  const dispatch = useDispatch();
  const [project, setProject] = useState(null);
  const token = useSelector((state) => state.status.token);
  const { projectId } = useParams();
  console.log(projectId);
  useEffect(() => {
    fetch(API_URL+"/projects/" + projectId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response not OK");
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setProject(result.project);
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
  }, []);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(true);
  const cancelEditHandler = () => {
    setEditing(false);
    navigate("/");
  };
  const finishEditHandler = () => {};
  return (
    <React.Fragment>
      {editing && project && (
        <EditProject
          editing={true}
          loading={true}
          onCancelEdit={cancelEditHandler}
          onFinishEdit={finishEditHandler}
          id={projectId}
          project={project}
        />
      )}
    </React.Fragment>
  );
};

export default EditProjectPage;
