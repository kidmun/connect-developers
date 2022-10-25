import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import UserPosts from "../../components/User/UserPosts";

const UserPostsPage = () => {
   
    const [postsId, setPostsId] = useState([]);
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
      console.log(result.user.posts)  
      setPostsId(result.user.posts)
    }).catch(err => {
      console.log(err)
    })
    }, [token]);

    return <React.Fragment>
       <h1 style={{ textAlign: "center"}}>My Posts</h1>
    <ul>
    {postsId.map(item => (<UserPosts key={item} id={item}/>))}
    </ul>
    </React.Fragment>

};

export default UserPostsPage;