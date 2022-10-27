import React, {useState, useEffect} from "react";
import Image from "../Image/Image";
import Button from "../Button/Button";
import './UserPosts.css';
import { useSelector } from "react-redux";

const UserProjects = (props) => {
    const token = useSelector(state => state.status.token);

    const [project, setProject] = useState({
        id: '',
        title: '',
        creator: {name: ''},
        createdAt: '',
        imageUrl: '',
        content: ''
      });
    console.log(props.id)
    useEffect(() => {
        fetch('http://localhost:8080/projects/'+props.id, {
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
      
    return <article className="post">
    <header className="post__header">
      <h3 className="post__meta">
     on {project.createdAt}
      </h3>
      <h1 className="post__title">{project.title}</h1>
    </header>
    <div className="post__image">
      <Image imageUrl={"http://localhost:8080/images/"+ project.imageUrl.slice(7,project.imageUrl.length)} contain />
    </div>
    <br/>
    <div className="post__content">{project.content}</div>
    <div className="post__actions">
      <Button mode="flat" link={"/projects/"+props.id}>
        View
      </Button>
      <Button mode="flat" link={"/edit-project/"+props.id}>
        Edit
      </Button>
      <Button mode="flat" design="danger" link={"/delete-project/"+props.id}>
        Delete
      </Button>

    </div>
   
  </article>
};

export default UserProjects;