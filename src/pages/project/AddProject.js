import React from "react";
import AddProject from "../../components/Project/AddProject";

const AddProjectPage = (props) => {
    const cancelEditHandler = () => {};
    const finishEditHandler = () => {};
    return <React.Fragment>
<AddProject
editing={false}

loading={true}
onCancelEdit={cancelEditHandler}
onFinishEdit={finishEditHandler}
/>
    </React.Fragment>
};

export default AddProjectPage;

