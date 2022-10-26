import React from "react";
import { useParams } from "react-router-dom";
import DeletePost from "../../components/User/DeletePost";

const DeletePostPage = () => {
    const {postId} = useParams();
    console.log(postId)

    return <React.Fragment>
        <DeletePost id={postId}/>
    </React.Fragment>
};

export default DeletePostPage;