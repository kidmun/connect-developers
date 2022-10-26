import React, { useState } from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import Backdrop from './components/Backdrop/Backdrop';
import Layout from './components/Layout/Layout';
import Toolbar from './components/Toolbar/Toolbar';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import MobileNavigation from './components/Navigation/MobileNavigation/MobileNavigation';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import PostPage from './pages/post/Post';
import ProjectsPage from './pages/project/Projects';
import AddPostPage from './pages/post/AddPost';
import EditPostPage from './pages/post/EditPost';
import DeletePostPage from './pages/user/DeletePost';
import AddProjectPage from './pages/project/AddProject';
import ProjectDetailPage from './pages/project/ProjectDetail';
import PostDetailPage from './pages/post/PostDetail';
import AccountPage from './pages/user/Account';
import UsersPage from './pages/user/Users';
import Notification from './components/Notification/Notification';
import UserPostsPage from './pages/user/UserPosts';
import UserProjectsPage from './pages/user/UserProjects';
import MessagePage from './pages/Message/Message';
import SendMessagePage from './pages/Message/SendMessage';

import './App.css';
import { statusActions } from './store/statusSlice';

function App() {
  const dispatch = useDispatch();

  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const users = useSelector(state => state.users.users);
  const notification = useSelector(state => state.status.notification);
  console.log(users)

  const mobileNavHandler = (isOpen) => {
    setShowBackdrop(isOpen);
    setShowMobileNav(isOpen);
  };
  const logoutHandler = () => {
    console.log("working")
    dispatch(statusActions.defaultToken())
    setIsAuth(false);
  };
 const backdropClickHandler = () => {
    setShowBackdrop(false);
    setShowMobileNav(false);
  };

  return (
    <React.Fragment>
       {showBackdrop && (
          <Backdrop onClick={backdropClickHandler} />
        )}
     
         <Layout
          header={
            <Toolbar>
              <MainNavigation
                onOpenMobileNav={mobileNavHandler.bind(this, true)}
                onLogout={logoutHandler}
                isAuth={false}
              />
            </Toolbar>
          }
          mobileNav={
            <MobileNavigation
              open={showMobileNav}
              mobile
              onChooseItem={mobileNavHandler.bind(this, false)}
              onLogout={logoutHandler}
              isAuth={false}
            />
          }
        />
        {notification.status.length > 0 && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
   <Routes>
        <Route path="/" element={ <PostPage/> } />
        <Route path="/projects" element={ <ProjectsPage/> } />
        <Route path="/add-post" element={ <AddPostPage/> } />
        <Route path="/edit-post/:postId" element={ <EditPostPage/> } />
        <Route path="/delete-post/:postId" element={ <DeletePostPage/> } />
        <Route path="/add-project" element={ <AddProjectPage/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="/posts/:postId" element={ <PostDetailPage/> } />
        <Route path="/projects/:projectId" element={ <ProjectDetailPage/> } />
        <Route path="/account" element={ <AccountPage/> } />
        <Route path="/users" element={ <UsersPage/> } />
        <Route path="/account/posts" element={ <UserPostsPage/> } />
        <Route path="/account/projects" element={ <UserProjectsPage/> } />
        <Route path="/messages" element={ <MessagePage/> } />
        <Route path="/send-message/:receiverId" element={ <SendMessagePage/> } />
  
      </Routes>
   </React.Fragment>
  );
}

export default App;
