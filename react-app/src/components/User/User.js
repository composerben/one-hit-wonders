import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getKitsByUserId } from "../../store/kit";
import { getCurrentPageUser } from "../../store/user";
import Kit from "../Kit/Kit";

import "./user.css";

function User() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.userReducer);
  const userKits = user.byId[userId]?.kits;
  console.log(userKits);

  useEffect(() => {
    if (!userId) {
      return;
    }
    dispatch(getCurrentPageUser(userId));
    dispatch(getKitsByUserId(userId));
  }, [userId, dispatch]);

  if (!user) {
    return null;
  }

  const userKitComponents = userKits?.map((kit) => {
    return (
      <div key={kit.id}>
        <Kit kit={kit} />
      </div>
    );
  });

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
      <div className="kits-container">{userKitComponents}</div>
    </ul>
  );
}
export default User;
