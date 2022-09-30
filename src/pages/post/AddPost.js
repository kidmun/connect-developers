import React from "react";
import AddPost from "../../components/Post/AddPost";

const AddPostPage = (props) => {
    const cancelEditHandler = () => {};
    const finishEditHandler = () => {};
    return <React.Fragment>
<AddPost
editing={false}

loading={true}
onCancelEdit={cancelEditHandler}
onFinishEdit={finishEditHandler}
/>
    </React.Fragment>
};

export default AddPostPage;

