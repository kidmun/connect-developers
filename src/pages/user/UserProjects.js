import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import UserProjects from "../../components/User/UserProjects";

const UserProjectsPage = () => {
   
    const [projectsId, setProjectsId] = useState([]);
    const token = useSelector(state => state.status.token);
    const userId = useSelector(state => state.status.userId);
    useEffect(() => {
        fetch('http://localhost:8080/users/'+ userId, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      if (!response.ok){
        throw new Error("response not ok");
      }
      return response.json()
    }).then(result => {
      console.log(result.user.projects)  
      setProjectsId(result.user.projects)
    }).catch(err => {
      console.log(err)
    })
    }, [token]);

    return <React.Fragment>
      <h1 style={{ textAlign: "center"}}>My Projects</h1>
      <ul>
    {projectsId.map(item => (<UserProjects key={item} id={item}/>))}
    </ul>
    </React.Fragment>

};

export default UserProjectsPage;