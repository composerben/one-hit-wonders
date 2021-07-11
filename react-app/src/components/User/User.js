import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPageUser } from "../../store/user";
import { getKitsByUserId } from "../../store/kit";
import Kit from "../Kit/Kit";

import "./user.css";

function User() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.userReducer.byId[userId]);
  const userKits = useSelector((state) =>
    Object.values(state.kitReducer.byId || [])
  );

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
    return <Kit key={kit.id} kit={kit} />;
  });

  return (
    <div className="user-page">
      <h1>{user.username}'s Kits</h1>
      <div className="kits-container">{userKitComponents}</div>
    </div>
  );
}
export default User;
