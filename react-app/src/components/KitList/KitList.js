import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Kit from "../Kit/Kit";
import { getAllKits } from "../../store/kit";

function KitList() {
  const dispatch = useDispatch();
  const kits = useSelector((state) => Object.values(state.kitReducer.byId));

  useEffect(() => {
      dispatch(getAllKits())
  }, [dispatch])
  return (
    <div className="kits-container">
      {kits?.map((kit) => (
        <Kit key={kit.id} kit={kit} />
      ))}
    </div>
  );
};

export default KitList;
