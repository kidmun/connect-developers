import React, {useState, useEffect} from "react";
import Image from "../Image/Image";
import Button from "../Button/Button";
import './UserPosts.css';
import { useSelector } from "react-redux";

const UserPosts = (props) => {
    const token = useSelector(state => state.status.token);

    const [post, setPost] = useState({
        id: '',
        title: '',
        creator: {name: ''},
        createdAt: '',
        imageUrl: '',
        content: ''
      });
    console.log(props.id)
    useEffect(() => {
        fetch('http://localhost:8080/posts/'+props.id, {
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
      
    return <article className="post">
    <header className="post__header">
      <h3 className="post__meta">
     on {post.createdAt}
      </h3>
      <h1 className="post__title">{post.title}</h1>
    </header>
    <div className="post__image">
      <Image imageUrl={"http://localhost:8080/images/"+ post.imageUrl.slice(7,post.imageUrl.length)} contain />
    </div>
    <br/>
    <div className="post__content">{post.content}</div>
    <div className="post__actions">
      <Button mode="flat" link={"/posts/"+props.id}>
        View
      </Button>
      <Button mode="flat" >
        Edit
      </Button>
      <Button mode="flat" design="danger" >
        Delete
      </Button>

    </div>
   
  </article>
};

export default UserPosts;