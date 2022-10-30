import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditAccount from "../../components/User/EditAccount";
import { statusActions } from "../../store/statusSlice";
import { API_URL } from "../../util/url";

const EditAccountPage = () => {
  const userId = useSelector((state) => state.status.userId);
  const token = useSelector((state) => state.status.token);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(API_URL+"/users/" + userId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response) {
          throw new Error();
        }
        return response.json();
      })
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        dispatch(
          statusActions.setNotification({
            status: "error",
            title: "Server Error",
            message: "Something is Wrong, Please Wait until We fix it",
          })
        );
        setTimeout(() => {
          dispatch(
            statusActions.setNotification({
              status: "",
              title: "",
              message: "",
            })
          );
        }, 8000);
      });
  }, []);
  return <React.Fragment>{user && <EditAccount user={user} />}</React.Fragment>;
};

export default EditAccountPage;
