import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "./components/Backdrop/Backdrop";
import Layout from "./components/Layout/Layout";
import Toolbar from "./components/Toolbar/Toolbar";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import MobileNavigation from "./components/Navigation/MobileNavigation/MobileNavigation";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Notification from "./components/Notification/Notification";
import { statusActions } from "./store/statusSlice";
import "./App.css";
const ProjectDetailPage = React.lazy(() => import("./pages/project/ProjectDetail"));
const ProjectsPage = React.lazy(() => import("./pages/project/Projects"));
const PostPage = React.lazy(() => import("./pages/post/Post"));
const PostDetailPage = React.lazy(() => import("./pages/post/PostDetail"));
const AddPostPage = React.lazy(() => import("./pages/post/AddPost"));
const EditPostPage = React.lazy(() => import("./pages/post/EditPost"));
const DeletePostPage = React.lazy(() => import("./pages/user/DeletePost"));
const AddProjectPage = React.lazy(() => import("./pages/project/AddProject"));
const EditProjectPage = React.lazy(() => import("./pages/project/EditProject"));
const DeleteProjectPage = React.lazy(() => import("./pages/user/DeleteProject"));
const MessagePage = React.lazy(() => import("./pages/Message/Message"));
const SentMessagePage = React.lazy(() => import("./pages/Message/MessageSent"));
const SendMessagePage = React.lazy(() => import("./pages/Message/SendMessage"));
const EditAccountPage = React.lazy(() => import("./pages/user/EditAccount"));
const AccountPage = React.lazy(() => import("./pages/user/Account"));
const UsersPage = React.lazy(() => import("./pages/user/Users"));
const UserPostsPage = React.lazy(() => import("./pages/user/UserPosts"));
const UserProjectsPage = React.lazy(() => import("./pages/user/UserProjects"));




function App() {
  const token_new = localStorage.getItem("token");
  const userId_new = localStorage.getItem("userId");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (token_new) {
      dispatch(statusActions.setToken(token_new));
      dispatch(statusActions.setUserId(userId_new))
    }
    else {
      navigate('/login')
    }
  }, [token_new]);

  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const notification = useSelector((state) => state.status.notification);

  const mobileNavHandler = (isOpen) => {
    setShowBackdrop(isOpen);
    setShowMobileNav(isOpen);
  };
  const logoutHandler = () => {
    dispatch(statusActions.defaultToken());
    dispatch(statusActions.defaultUserId())
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuth(false);
  };
  const backdropClickHandler = () => {
    setShowBackdrop(false);
    setShowMobileNav(false);
  };

  return (
    <React.Fragment>
      {showBackdrop && <Backdrop onClick={backdropClickHandler} />}

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
      {notification.status.length > 0 && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
       <Suspense fallback={<h1>Loading</h1>}>
      <Routes>
       
        <Route path="/" element={<PostPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/add-post" element={<AddPostPage />} />
        <Route path="/edit-post/:postId" element={<EditPostPage />} />
        <Route path="/delete-post/:postId" element={<DeletePostPage />} />
        <Route path="/add-project" element={<AddProjectPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts/:postId" element={<PostDetailPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/edit-project/:projectId" element={<EditProjectPage />} />
        <Route
          path="/delete-project/:projectId"
          element={<DeleteProjectPage />}
        />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/account/posts" element={<UserPostsPage />} />
        <Route path="/account/projects" element={<UserProjectsPage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/messages_sent" element={<SentMessagePage />} />
        <Route path="/send-message/:receiverId" element={<SendMessagePage />} />
        <Route path="/edit-account" element={<EditAccountPage />} />
       
      </Routes>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
