import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function PasswordInput({ password, setPassword, id }) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <div className="password-input">
      <input
        type={passwordVisibility ? "text" : "password"}
        placeholder="şifre.."
        id={id && id}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordVisibility ? (
        <button
          type="button"
          onClick={() => {
            setPasswordVisibility(!passwordVisibility);
          }}
        >
          <AiOutlineEye className="icon" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setPasswordVisibility(!passwordVisibility);
          }}
        >
          <AiOutlineEyeInvisible className="icon" />
        </button>
      )}
    </div>
  );
}

export default PasswordInput;
