import React, { useState } from "react";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";

import "./login-panel.css";
import PasswordInput from "../../../elements/password-input";
import { BACKEND_URL } from "../../../elements/config";
function LoginPanel({ user, setUser }) {
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`${BACKEND_URL}/users`).then((response) => {
      const user = response.data.filter(
        (obj) => obj.email === email && obj.password === password
      );
      if (user.length > 0) {
        setUser(user[0]);
      } else {
        console.log("Kullanıcı bulunamadı!");
      }
    });
  };
  useState(() => {
    if (loading !== undefined) {
      setLoading(false);
    }
  }, []);
  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />;
      </div>
    );
  else
    return (
      <div className="login-screen">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Giriş Yap</h2>
          <div className="form-item">
            <label htmlFor="login-form-email">E-posta</label>
            <input
              type="email"
              id="login-form-email"
              placeholder="e-posta.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="login-form-password">Şifre</label>
            <PasswordInput
              id="login-form-password"
              password={password}
              setPassword={setPassword}
            />
          </div>
          <button className="submit-button" type="submit">
            Giriş yap
          </button>
          <p className="error-text">Error!</p>
        </form>
      </div>
    );
}

export default LoginPanel;
