import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPageUser } from "../../store/user";
import Kit from "../Kit/Kit";

import "./user.css";

function User() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.userReducer.byId[userId]);
  const userKits = user?.kits;

  useEffect(() => {
    if (!userId) {
      return;
    }
    dispatch(getCurrentPageUser(userId));
  }, [userId, dispatch, loaded]);

  if (!user) {
    return null;
  }

  const userKitComponents = userKits?.map((kit) => {
    return (
      <div key={kit.id}>
        <Kit kit={kit} setLoaded={setLoaded} />
      </div>
    );
  });

  return (
    <div className="user-page">
      <h1>{user.username}'s Kits</h1>
      <div className="kits-container">{userKitComponents}</div>
    </div>
  );
}
export default User;
