import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { SuccessNotification } from "../../../../elements/toastify";

import "./user-list.css";
import { BACKEND_URL } from "../../../../elements/config";
function UserList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState();

  const handleRemove = (id) => {
    axios.delete(`${BACKEND_URL}/users/${id}`).then(() => {
      SuccessNotification("Kullanıcı başarıyla kaldırıldı");
      setLoading(true);
      getUsers();
    });
  };
  const getUsers = () => {
    axios
      .get(`${BACKEND_URL}/users`)
      .then((response) => {
        const usersList = response.data;
        setUsers(usersList);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUsers();
  }, []);
  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />;
      </div>
    );
  else
    return (
      <div className="user-list">
        <h1 className="admin-title">Kullanıcı Listesi</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="image">Resim</th>
                <th className="name">İsim</th>
                <th className="email">E-posta</th>
                <th className="number">Numara</th>
                <th className="gender">Cinsiyet</th>
                <th className="actions">Aksiyonlar</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                if (user.id === "1") {
                  return (
                    <tr key={user.id}>
                      <td>
                        <div
                          className="frame"
                          style={{
                            backgroundImage: `url(${user.profile})`,
                          }}
                        />
                      </td>
                      <td>
                        {user.name} {user.surname}
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>
                        <a href={`tel:${user.phone}`}>{user.phone}</a>
                      </td>
                      <td>{user.gender}</td>
                      <td>
                        <div className="actions">
                          <button
                            onClick={() => {
                              navigate(`/admin/kullanıcı/${user.id}`);
                            }}
                          >
                            <BiPencil />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={user.id}>
                      <td>
                        <div
                          className="frame"
                          style={{
                            backgroundImage: `url(${user.profile})`,
                          }}
                        />
                      </td>
                      <td>
                        {user.name} {user.surname}
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>
                        <a href={`tel:${user.phone}`}>{user.phone}</a>
                      </td>
                      <td>{user.gender}</td>
                      <td>
                        <div className="actions">
                          <button
                            onClick={() => {
                              navigate(`/admin/kullanıcı/${user.id}`);
                            }}
                          >
                            <BiPencil />
                          </button>
                          <button
                            onClick={() => {
                              handleRemove(user.id);
                            }}
                          >
                            <IoCloseOutline />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default UserList;
