import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneKit } from "../../store/kit";
import "./kit.css";

function Kit({ kit, setDeleted }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.session.user);

  const toEditKitForm = () => {
    history.push(`/edit-kit/${kit.id}`);
  };

  const onDelete = async (kit) => {
    await dispatch(deleteOneKit(kit.id));
    setDeleted((prev) => !prev);
  };

  return (
    <div className="kit-card">
      <Link to={`/kits/${kit.id}`}>
        <h2>{kit.name}</h2>
        <img alt={`${kit.name} Kit cover`} src={kit.cover_img_url}></img>
      </Link>
      {loggedInUser.id === kit.user_id && (
        <>
          <button onClick={() => toEditKitForm()}>Edit</button>
          <button onClick={() => onDelete(kit)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default Kit;
