import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Image from "../Image/Image";
import './ProjectDetail.css';



const ProjectDetail = () => {
  const token = useSelector(state => state.status.token);

    const [project, setProject] = useState({
        id: '',
        title: '',
        creator: {name: ''},
        createdAt: '',
        imageUrl: '',
        content: ''
      });
      const {projectId} = useParams();
      console.log(projectId)
      useEffect(() => {
        fetch('http://localhost:8080/projects/'+projectId, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        
        })
        .then(response => {
            if (!response.ok){
                throw new Error("response not ok");
            }
            return response.json();
        })
        .then(result => {
            console.log(result)
            setProject(result.project)
        });
      }, []);
      
    return  <article className="project">
    <h1>{project.title}</h1>
    <h2>
      Created by  on {project.createdAt}
    </h2>
    <div className="single-project__image">
      <Image contain imageUrl={"http://localhost:8080/images/"+ project.imageUrl.slice(7,project.imageUrl.length)} />
    </div>
    <p>{project.content}</p>
    </article>
};

export default ProjectDetail;