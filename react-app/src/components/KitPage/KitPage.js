import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentKit } from "../../store/kit";
import Sample from "../Sample/Sample";
import { deleteOneSample, getSamplesByKit } from "../../store/sample";
import "./kit-page.css";

function KitPage({ setLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { kitId } = useParams();
  const currentKit = useSelector((state) => state.kitReducer.byId[kitId]);
  const kitSamples = useSelector((state) =>
    Object.values(state.sampleReducer.byId || [])
  );
  const loggedInUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!kitId) {
      return;
    }
    dispatch(getCurrentKit(kitId));
    dispatch(getSamplesByKit(kitId));
  }, [kitId, dispatch]);

  if (!currentKit) {
    return null;
  }

  const onDelete = async (sample) => {
    await dispatch(deleteOneSample(sample.id));
    setLoaded((prev) => !prev);
  };

  const kitSampleComponents = kitSamples?.map((sample) => {
    return (
      <div key={sample.id}>
        <Sample sample={sample} />
        {loggedInUser.id === currentKit.user_id && (
          <>
            <button onClick={() => history.push(`/edit-sample/${sample.id}`)}>
              Edit
            </button>
            <button onClick={() => onDelete(sample)}>Delete</button>
          </>
        )}
      </div>
    );
  });
  return (
    <div className="sample-container">
      <img alt="kit-cover" src={currentKit?.cover_img_url}></img>
      <div className="sample-components-container">{kitSampleComponents}</div>
    </div>
  );
}

export default KitPage;
