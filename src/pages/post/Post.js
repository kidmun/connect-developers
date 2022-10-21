import React, { useEffect, useState } from "react";
import Post from "../../components/Post/Post";

const DUMMY_POST = [
  {
    _id: "m1",
    title: "first post",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    content: "yeah bitch this just for the test purpose because it is fucking insane",
    creator: { name: "kidus" },
    createdAt: Date.now(),
  },
  {
    _id: "m2",
    title: "second post",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    content: "yeah bitch",
    creator: { name: "kido" },
    createdAt: Date.now(),
  }
];
const startEditPostHandler = (id) => {

};

const deletePostHandler = (id) => {};
const PostPage = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/posts?page=3').then(response => {
      if (!response.ok){
        throw new Error("response not ok");
      }
      return response.json()
    }).then(result => {
      console.log(result)
      setPosts(result.posts)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <ul>
      {posts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          author={post.creator.name}
          date={new Date(post.createdAt).toLocaleDateString("en-US")}
          title={post.title}
          image={"http://localhost:8080/images/"+ post.imageUrl.slice(7,post.imageUrl.length)}
          content={post.content}
          onStartEdit={startEditPostHandler.bind(this, post._id)}
          onDelete={deletePostHandler.bind(this, post._id)}
        />     
      ))}
    </ul>
  );
};

export default PostPage;
