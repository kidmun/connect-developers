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
import AddProjectPage from './pages/project/AddProject';
import ProjectDetailPage from './pages/project/ProjectDetail';
import PostDetailPage from './pages/post/PostDetail';
import AccountPage from './pages/user/Account';
import UsersPage from './pages/user/Users';

import './App.css';
import { statusActions } from './store/statusSlice';

function App() {
  const dispatch = useDispatch();

  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const users = useSelector(state => state.users.users);
  console.log(users)

  const mobileNavHandler = (isOpen) => {
    setShowBackdrop(isOpen);
    setShowMobileNav(isOpen);
  };
  const logoutHandler = () => {
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
   <Routes>
        <Route path="/" element={ <PostPage/> } />
        <Route path="/projects" element={ <ProjectsPage/> } />
        <Route path="/add-post" element={ <AddPostPage/> } />
        <Route path="/add-project" element={ <AddProjectPage/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="/posts/:postId" element={ <PostDetailPage/> } />
        <Route path="/projects/:projectId" element={ <ProjectDetailPage/> } />
        <Route path="/account" element={ <AccountPage/> } />
        <Route path="/users" element={ <UsersPage/> } />
  
      </Routes>
   </React.Fragment>
  );
}

export default App;
