import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditAccount from "../../components/User/EditAccount";

const EditAccountPage = () => {
    const userId = useSelector(state => state.status.userId);
    const token = useSelector(state => state.status.token);
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8080/users/'+userId,{
            headers: {
                Authorization: 'Bearer ' + token
              }
        }).then(response => {
            if (!response){
                throw new Error;
            }
            return response.json();
        }).then(result => {
            console.log(result)
            setUser(result.user)
        })
        .catch(err => {
            console.log(err)
        });
    }, []);
    return <React.Fragment>
       {user && <EditAccount user={user}/>} 
    </React.Fragment>
};

export default EditAccountPage;