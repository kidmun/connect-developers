import React from "react";
import Button from '../Button/Button';
import Image from "../Image/Image";
import './Project.css';


const Project = (props) => {
    return <article className="project">
    <header className="project__header">
      <h3 className="project__meta">
        Posted by {props.author} on {props.date}
      </h3>
      <h1 className="project__title">{props.title}</h1>
    </header>
    <div className="project__image">
      <Image imageUrl={props.image} contain />
    </div>
    <br/>
    <div className="project__content">{props.content}</div>
    <div className="project__actions">
      <Button mode="flat" link={props.id}>
        View Details
      </Button>
      
    </div>
  </article>
};

export default Project;