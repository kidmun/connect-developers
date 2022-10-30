import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProject from "../../components/Project/AddProject";

const AddProjectPage = (props) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(true);
  const cancelEditHandler = () => {
    setEditing(false);
    navigate("/projects");
  };
  const finishEditHandler = () => {};
  return (
    <React.Fragment>
      {editing && (
        <AddProject
          editing={true}
          loading={true}
          onCancelEdit={cancelEditHandler}
          onFinishEdit={finishEditHandler}
        />
      )}
    </React.Fragment>
  );
};

export default AddProjectPage;
