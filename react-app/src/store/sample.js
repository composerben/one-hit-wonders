const DELETE_SAMPLE = "sample/DELETE_SAMPLE";
const GET_SAMPLES = "sample/GET_SAMPLES";
const EDIT_SAMPLE = "sample/EDIT_SAMPLE";

const deleteSample = (sample) => ({
  type: DELETE_SAMPLE,
  sample,
});

const getSamples = (samples) => ({
  type: GET_SAMPLES,
  samples,
});

const editSample = (sample) => ({
  type: EDIT_SAMPLE,
  sample,
});

export const deleteOneSample = (sampleId) => async (dispatch) => {
  const res = await fetch(`/api/samples/${sampleId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteSample(sampleId));
  }
};

export const getSamplesByKit = (kitId) => async (dispatch) => {
  const res = await fetch(`/api/samples/kit/${kitId}`);
  const data = await res.json();
  dispatch(getSamples(data.samples));
};

export const getSampleById = (sampleId) => async (dispatch) => {
  const res = await fetch(`/api/samples/${sampleId}`);
  const data = await res.json();
  dispatch(getSamples([data.sample]));
};

export const editOneSample = (sampleId, body) => async (dispatch) => {
  const res = await fetch(`/api/samples/${sampleId}`, {
    method: "PATCH",
    body: body,
  });
  const data = await res.json();
  dispatch(editSample(data.sample));
};

const initialState = {
  byId: {},
  allIds: [],
};

export default function sampleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SAMPLES: {
      const newState = { ...state };
      action.samples.forEach((sample) => {
        newState.byId[sample.id] = sample;
        newState.allIds.push(sample.id);
      });
      return newState;
    }
    case DELETE_SAMPLE: {
      const newState = { ...state };
      delete newState.byId[action.sample.id];
      return newState;
    }
    case EDIT_SAMPLE: {
      const newState = { ...state };
      newState.byId[action.sample.id] = action.sample;
      return newState;
    }
    default:
      return state;
  }
}
