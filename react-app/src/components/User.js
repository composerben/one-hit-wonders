import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getKitsByUserId } from "../store/kit";

function User() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId } = useParams();
  const userKits = useSelector((state) => state.kitReducer.byId);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
    dispatch(getKitsByUserId(userId));
  }, [userId, dispatch]);

  if (!user) {
    return null;
  }

  return (
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
  );
}
export default User;
