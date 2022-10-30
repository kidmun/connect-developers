import React, { useState, useEffect } from "react";
import Image from "../Image/Image";
import Button from "../Button/Button";
import "./UserPosts.css";
import { useDispatch, useSelector } from "react-redux";
import { statusActions } from "../../store/statusSlice";
import { API_URL } from "../../util/url";

const UserProjects = (props) => {
  const token = useSelector((state) => state.status.token);
  const dispatch = useDispatch();

  const [project, setProject] = useState({
    id: "",
    title: "",
    creator: { name: "" },
    createdAt: "",
    imageUrl: "",
    content: "",
  });
  console.log(props.id);
  useEffect(() => {
    fetch(API_URL+"/projects/" + props.id, {
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

  return (
    <article className="post">
      <header className="post__header">
        <h3 className="post__meta">on {project.createdAt}</h3>
        <h1 className="post__title">{project.title}</h1>
      </header>
      <div className="post__image">
        <Image
          imageUrl={
            API_URL+"/images/" +
            project.imageUrl.slice(7, project.imageUrl.length)
          }
          contain
        />
      </div>
      <br />
      <div className="post__content">{project.content}</div>
      <div className="post__actions">
        <Button mode="flat" link={"/projects/" + props.id}>
          View
        </Button>
        <Button mode="flat" link={"/edit-project/" + props.id}>
          Edit
        </Button>
        <Button
          mode="flat"
          design="danger"
          link={"/delete-project/" + props.id}
        >
          Delete
        </Button>
      </div>
    </article>
  );
};

export default UserProjects;
