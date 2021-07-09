import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentKit } from "../../store/kit";
import { getAllGenres } from "../../store/genre";

const EditKitForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const currentKit = useSelector((state) => state.kitReducer.byId[id]);
  const allGenres = useSelector((state) => state.genreReducer.byId);

  useEffect(() => {
    dispatch(getCurrentKit(id));
    dispatch(getAllGenres())
  }, [dispatch]);

  return <h1>Hello from EditKitForm</h1>;
};

export default EditKitForm;
