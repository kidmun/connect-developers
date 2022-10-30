import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { statusActions } from "../../store/statusSlice";
import { API_URL } from "../../util/url";
import Image from "../Image/Image";
import "./PostDetail.css";

const PostDetail = () => {
  const token = useSelector((state) => state.status.token);
  const dispatch = useDispatch();

  const [creatorName, setCreatorName] = useState("");
  const [post, setPost] = useState({
    id: "",
    title: "",
    creator: { name: "" },
    createdAt: "",
    imageUrl: "",
    content: "",
  });
  const { postId } = useParams();
  console.log(postId);
  useEffect(() => {
    fetch(API_URL+"/posts/" + postId, {
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
        setCreatorName(result.user.name);
        setPost(result.post);
      })
      .catch((err) => {
        dispatch(
          statusActions.setNotification({
            status: "error",
            title: "Server Error",
            message: "Something is Wrong, Please Wait until We fix it",
          })
        );
        setTimeout(() => {
          dispatch(
            statusActions.setNotification({
              status: "",
              title: "",
              message: "",
            })
          );
        }, 8000);
      });
  }, []);

  return (
    <article className="post">
      <h1>{post.title}</h1>
      <h3>Created By {creatorName}</h3>
      <h5> On {post.createdAt}</h5>
      <div className="single-post__image">
        <Image
          contain
          imageUrl={
            API_URL+"/images/" +
            post.imageUrl.slice(7, post.imageUrl.length)
          }
        />
      </div>
      <p>{post.content}</p>
    </article>
  );
};

export default PostDetail;
