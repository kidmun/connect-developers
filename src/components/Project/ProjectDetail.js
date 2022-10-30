import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { statusActions } from "../../store/statusSlice";
import { API_URL } from "../../util/url";
import Image from "../Image/Image";
import "./ProjectDetail.css";

const ProjectDetail = () => {
  const token = useSelector((state) => state.status.token);
  const dispatch = useDispatch();

  const [creatorName, setCreatorName] = useState("");

  const [project, setProject] = useState({
    id: "",
    title: "",
    creator: { name: "" },
    createdAt: "",
    imageUrl: "",
    content: "",
  });
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
          throw new Error("response not ok");
        }
        return response.json();
      })
      .then((result) => {
        setCreatorName(result.user.name);
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
    <article className="project">
      <h1>{project.title}</h1>
      <h2>Created by {creatorName}</h2>
      <h5>On {project.createdAt}</h5>
      <div className="single-project__image">
        <Image
          contain
          imageUrl={
            API_URL+"/images/" +
            project.imageUrl.slice(7, project.imageUrl.length)
          }
        />
      </div>
      <p>{project.content}</p>
    </article>
  );
};

export default ProjectDetail;
