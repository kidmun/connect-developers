import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Project from "../../components/Project/Project";
import Paginator from "../../components/Paginator/Paginator";
import { statusActions } from "../../store/statusSlice";
import { API_URL } from "../../util/url";
let CURRENT_PAGE = 1;

const ProjectsPage = (props) => {
  const token = useSelector((state) => state.status.token);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProjects, setTotalProjects] = useState(CURRENT_PAGE);
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(API_URL+"/projects?page=" + currentPage, {
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
        setLoading(false);
        setProjects(result.projects);
        setTotalProjects(result.totalItems);
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
  }, [CURRENT_PAGE]);
  const pageChangeHandler = (direction) => {
    if (direction === "next") {
      CURRENT_PAGE++;
      setCurrentPage(CURRENT_PAGE);
    }
    if (direction === "prev") {
      CURRENT_PAGE--;
      setCurrentPage(CURRENT_PAGE);
    }
  };
  return (
    <ul>
      <Paginator
        onPrevious={pageChangeHandler.bind(this, "prev")}
        onNext={pageChangeHandler.bind(this, "next")}
        currentPage={currentPage}
        lastPage={Math.ceil(totalProjects / 2)}
      >
        {projects.map((project) => (
          <div style={{ marginBottom: 20 }} key={project._id}>
            <Project
              id={project._id}
              author={project.creator}
              date={new Date(project.createdAt).toLocaleDateString("en-US")}
              title={project.title}
              image={
                API_URL+"/images/" +
                project.imageUrl.slice(7, project.imageUrl.length)
              }
              content={project.content}
            />
          </div>
        ))}
         {loading && <h1 style={{textAlign: 'center', color: "blue"}}>Loading... </h1>}
        {projects.length === 0 && !loading && (
          <h1 style={{ textAlign: "center", color: "blue" }}>No Projects </h1>
        )}
      </Paginator>
    </ul>
  );
};

export default ProjectsPage;
