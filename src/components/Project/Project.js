import React from "react";
import Button from "../Button/Button";
import Image from "../Image/Image";
import "./Project.css";

const Project = (props) => {
  return (
    <article className="project">
      <header className="project__header">
        <h1 className="project__meta">{props.title}</h1>
      </header>
      <div className="project__image">
        <Image imageUrl={props.image} contain />
      </div>
      <br />
      <div className="project__content">{props.content}</div>
      <div className="project__actions">
        <Button mode="flat" link={"/projects/" + props.id}>
          View Details
        </Button>
      </div>
    </article>
  );
};

export default Project;
