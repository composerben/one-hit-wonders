import React from "react";

function Sample({ sample }) {
  return (
    <div className="individual-sample">
      <p>{sample.name}</p>
      <audio controls src={sample.audio_url}></audio>
    </div>
  );
}

export default Sample;
