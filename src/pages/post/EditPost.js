import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditPost from "../../components/Post/EditPost";
import { statusActions } from "../../store/statusSlice";
import {API_URL } from '../../util/url';



const EditPostPage = (props) => {
    const [post, setPost] = useState(null);
    const token = useSelector(state => state.status.token);
    const { postId} = useParams();
    const dispatch =useDispatch();
   
    useEffect(() => {
        fetch(API_URL + '/posts/'+postId, {
            headers: {
                Authorization: "Bearer " + token,
              }
        }).then(response => {
            if (!response.ok){
                throw new Error("Response not OK");
            }
            return response.json();
        }).then(result => {
        
            setPost(result.post)
        }).catch(err => {
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
        })
    }, [] );
    const navigate = useNavigate();
    const [editing, setEditing] = useState(true); 
    const cancelEditHandler = () => {
      setEditing(false)
      navigate('/account/posts')
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

