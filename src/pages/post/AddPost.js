import React, { useState} from "react";
import AddPost from "../../components/Post/AddPost";



const AddPostPage = (props) => {
    const [editing, setEditing] = useState(true); 
    const cancelEditHandler = () => {
        setEditing(false)
    };
    const finishEditHandler = () => {};
    return <React.Fragment>
{editing && <AddPost
editing={true}
loading={true}
onCancelEdit={cancelEditHandler}
onFinishEdit={finishEditHandler}
/>}
    </React.Fragment>

};

export default AddPostPage;

