import React from "react";
import Button from "../Button/Button";
import Image from "../Image/Image";
import "./Post.css";

const Post = (props) => {
  return (
    <article className="post">
      <header className="post__header">
        <h1 className="project__meta">{props.title}</h1>

        <br />
      </header>
      <div className="post__image">
        <Image imageUrl={props.image} contain />
      </div>
      <br />
      <div className="post__content">{props.content}</div>
      <div className="post__actions">
        <Button mode="flat" link={"/posts/" + props.id}>
          View Details
        </Button>
      </div>
    </article>
  );
};

export default Post;
