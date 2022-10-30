import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserProjects from "../../components/User/UserProjects";
import { statusActions } from "../../store/statusSlice";
import { API_URL } from "../../util/url";

const UserProjectsPage = () => {
  const [projectsId, setProjectsId] = useState([]);
  const token = useSelector((state) => state.status.token);
  const userId = useSelector((state) => state.status.userId);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(API_URL+"/users/" + userId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("response not ok");
        }
        return response.json();
      })
      .then((result) => {
        setProjectsId(result.user.projects);
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
  }, [token]);

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>My Projects</h1>
      <ul>
        {projectsId.map((item) => (
          <UserProjects key={item} id={item} />
        ))}
      </ul>
      {projectsId.length === 0 && (
        <h2 style={{ textAlign: "center", color: "red" }}>
          You have no projects{" "}
        </h2>
      )}
    </React.Fragment>
  );
};

export default UserProjectsPage;
