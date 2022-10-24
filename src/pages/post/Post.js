import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../../components/Post/Post";
import { userActions } from "../../store/userSlice";
import { postActions } from "../../store/postSlice";
import Paginator from "../../components/Paginator/Paginator";

let CURRENT_PAGE = 1;
const startEditPostHandler = (id) => {};

const deletePostHandler = (id) => {};
const PostPage = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.status.token);
  console.log(token);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(CURRENT_PAGE);
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
 

  useEffect(() => {
    fetch("http://localhost:8080/posts?page=" + currentPage, {
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
        console.log(result);
        setPosts(result.posts);
        dispatch(postActions.replacePosts(result.posts));
        setTotalPosts(result.totalItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);
  const pageChangeHandler = (direction) => {
    if (direction === "next") {
      CURRENT_PAGE++;
      setCurrentPage(CURRENT_PAGE);
    }
    if (direction === "prev") {
      CURRENT_PAGE--;
      setCurrentPage(CURRENT_PAGE);
    }
  };
  return (
    <ul>
      <Paginator
        onPrevious={pageChangeHandler.bind(this, "prev")}
        onNext={pageChangeHandler.bind(this, "next")}
        currentPage={currentPage}
        lastPage={Math.ceil(totalPosts / 2)}
      >
        {posts.map((post) => (
          <div style={{ marginBottom: 20 }} key={post._id}>
            <Post
              id={post._id}
              author={post.creator}
              date={new Date(post.createdAt).toLocaleDateString("en-US")}
              title={post.title}
              image={
                "http://localhost:8080/images/" +
                post.imageUrl.slice(7, post.imageUrl.length)
              }
              content={post.content}
              onStartEdit={startEditPostHandler.bind(this, post._id)}
              onDelete={deletePostHandler.bind(this, post._id)}
            />
          </div>
        ))}
      </Paginator>
    </ul>
  );
};

export default PostPage;
