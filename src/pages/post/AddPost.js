import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPost from "../../components/Post/AddPost";

const AddPostPage = (props) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(true);
  const cancelEditHandler = () => {
    setEditing(false);
    navigate("/");
  };
  const finishEditHandler = () => {};
  return (
    <React.Fragment>
      {editing && (
        <AddPost
          editing={true}
          loading={true}
          onCancelEdit={cancelEditHandler}
          onFinishEdit={finishEditHandler}
        />
      )}
    </React.Fragment>
  );
};

export default AddPostPage;
