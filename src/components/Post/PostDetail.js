import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Image from "../Image/Image";
import './PostDetail.css';



const PostDetail = () => {
  const token = useSelector(state => state.status.token);

    const [post, setPost] = useState({
        id: '',
        title: '',
        creator: {name: ''},
        createdAt: '',
        imageUrl: '',
        content: ''
      });
      const {postId} = useParams();
      console.log(postId)
      useEffect(() => {
        fetch('http://localhost:8080/posts/'+postId, {
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
            setPost(result.post)
        });
      }, []);
      
    return  <article className="post">
    <h1>{post.title}</h1>
    <h2>
      Created by  on {post.createdAt}
    </h2>
    <div className="single-post__image">
      <Image contain imageUrl={"http://localhost:8080/images/"+ post.imageUrl.slice(7,post.imageUrl.length)} />
    </div>
    <p>{post.content}</p>
    </article>
};

export default PostDetail;