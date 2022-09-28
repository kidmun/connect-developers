import React from "react";

import Project from "../../components/Project/Project";


const DUMMY_PROJECTS = [
    {
      _id: "m1",
      title: "first project",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
      content: "yeah bitch",
      creator: { name: "kidus" },
      createdAt: Date.now(),
    },
    {
      _id: "m2",
      title: "second project",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
      content: "yeah bitch",
      creator: { name: "kido" },
      createdAt: Date.now(),
    }
  ];

  const ProjectsPage = (props) => {
    return (
      <ul>
        {DUMMY_PROJECTS.map((post) => (<li>
          <Project
            key={post._id}
            id={post._id}
            author={post.creator.name}
            date={new Date(post.createdAt).toLocaleDateString("en-US")}
            title={post.title}
            image={post.imageUrl}
            content={post.content}
        
          />
          </li>
        ))}
      </ul>
    );
  };
  

export default ProjectsPage;
