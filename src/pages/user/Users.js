import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import Users from "../../components/User/Users";
import Paginator from "../../components/Paginator/Paginator";

let CURRENT_PAGE = 1;
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(CURRENT_PAGE);
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.status.token);
  useEffect(() => {
    fetch("http://localhost:8080/users?page=" + currentPage, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("response not ok");
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setUsers(result.users);
        setTotalUsers(result.totalItems);
        dispatch(userActions.replaceUsers(users));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, currentPage]);
  const pageChangeHandler = (direction) => {
    if (direction === "next") {
      CURRENT_PAGE++;
      setCurrentPage(CURRENT_PAGE);
    }
    if (direction === "prev") {
      CURRENT_PAGE--;
      setCurrentPage(CURRENT_PAGE);
    }
  };
  return (
    <ul>
      <Paginator
        currentPage={currentPage}
        lastPage={Math.ceil(totalUsers / 4)}
        onPrevious={pageChangeHandler.bind(this, "prev")}
        onNext={pageChangeHandler.bind(this, "next")}
      >
        {users.map((item) => (
          <Users
            key={item._id}
            name={item.name}
            email={item.email}
            id={item._id}
          />
        ))}
      </Paginator>
    </ul>
  );
};

export default UsersPage;
