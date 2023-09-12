import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import "./full-photo.css";
function FullPhoto({ link, closeFunction }) {
  return (
    <div className="full-photo">
      <div className="background-close-button" onClick={closeFunction}>
        <img
          src={link}
          alt="image"
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
        <button onClick={closeFunction}>
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );
}

export default FullPhoto;
