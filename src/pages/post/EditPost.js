import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditPost from "../../components/Post/EditPost";



const EditPostPage = (props) => {
    const [post, setPost] = useState(null);
    const token = useSelector(state => state.status.token);
    const { postId} = useParams();
    console.log(postId)
    useEffect(() => {
        fetch('http://localhost:8080/posts/'+postId, {
            headers: {
                Authorization: "Bearer " + token,
              }
        }).then(response => {
            if (!response.ok){
                throw new Error("Response not OK");
            }
            return response.json();
        }).then(result => {
            console.log(result)
            setPost(result.post)
        }).catch(err => {
            console.log(err)
        })
    }, [] );
    const navigate = useNavigate();
    const [editing, setEditing] = useState(true); 
    const cancelEditHandler = () => {
      setEditing(false)
      navigate('/')
    };
    const finishEditHandler = () => {};
    return <React.Fragment>
{editing && post && <EditPost
editing={true}
loading={true}
onCancelEdit={cancelEditHandler}
onFinishEdit={finishEditHandler}
id={postId}
post={post}
/>}
    </React.Fragment>

};

export default EditPostPage;

