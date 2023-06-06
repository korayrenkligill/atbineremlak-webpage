import React from "react";
import { GrClose } from "react-icons/gr";
import "./are-you-sure.css";
function AreYouSure({
  text,
  acceptFunction = () => {
    console.log("");
  },
  rejectFunction = () => {
    console.log("");
  },
}) {
  return (
    <div className="are-you-sure-container" onClick={rejectFunction}>
      <div
        className="are-you-sure"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <p>{text}</p>
        <div className="buttons">
          <button className="accept-button" onClick={acceptFunction}>
            Evet
          </button>
          <button className="reject-button" onClick={rejectFunction}>
            Hayır
          </button>
        </div>
        <button className="close-button" onClick={rejectFunction}>
          <GrClose className="icon" />
        </button>
      </div>
    </div>
  );
}

export default AreYouSure;
