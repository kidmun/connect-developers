import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditProject from "../../components/Project/EditProject";

const EditProjectPage = (props) => {
    const [project, setProject] = useState(null);
    const token = useSelector(state => state.status.token);
    const { projectId} = useParams();
    console.log(projectId)
    useEffect(() => {
        fetch('http://localhost:8080/projects/'+projectId, {
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
            setProject(result.project)
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
{editing && project && <EditProject
editing={true}
loading={true}
onCancelEdit={cancelEditHandler}
onFinishEdit={finishEditHandler}
id={projectId}
project={project}
/>}
    </React.Fragment>

};

export default EditProjectPage;

