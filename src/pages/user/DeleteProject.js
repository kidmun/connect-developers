import React from "react";
import { useParams } from "react-router-dom";
import DeleteProject from "../../components/User/DeleteProject";

const DeleteProjectPage = () => {
  const { projectId } = useParams();

  return (
    <React.Fragment>
      <DeleteProject id={projectId} />
    </React.Fragment>
  );
};

export default DeleteProjectPage;
