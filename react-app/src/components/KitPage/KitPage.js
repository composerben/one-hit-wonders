import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentKit } from "../../store/kit";
import Sample from "../Sample/Sample";

function KitPage() {
  const dispatch = useDispatch();
  const { kitId } = useParams();
  const currentKit = useSelector((state) => state.kitReducer.byId[kitId]);
  const kitSamples = currentKit?.samples;

  useEffect(() => {
    dispatch(getCurrentKit(kitId));
  }, [kitId, dispatch]);

  const kitSampleComponents = kitSamples?.map((sample) => {
    return (
      <div key={sample.id}>
        <Sample sample={sample} />
      </div>
    );
  });
  return (
    <div className="sample-container">
      <img src={currentKit?.cover_img_url}></img>
      {kitSampleComponents}
    </div>
  );
}

export default KitPage;
