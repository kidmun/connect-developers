import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Project from "../../components/Project/Project";
import Paginator from "../../components/Paginator/Paginator";
let CURRENT_PAGE = 1;


const ProjectsPage = (props) => {
  const token = useSelector((state) => state.status.token);
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(CURRENT_PAGE);
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
  console.log(totalProjects)

  useEffect(() => {
    fetch("http://localhost:8080/projects?page="+currentPage, {
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
        console.log(result);
        setProjects(result.projects);
        setTotalProjects(result.totalItems);
      })
      .catch((err) => {
        console.log(err);
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
                "http://localhost:8080/images/" +
                project.imageUrl.slice(7, project.imageUrl.length)
              }
              content={project.content}
            />
          </div>
        ))}
      </Paginator>
    </ul>
  );
};

export default ProjectsPage;
