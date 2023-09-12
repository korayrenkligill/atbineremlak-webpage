import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { Link, useNavigate } from "react-router-dom";
import { SuccessNotification } from "../../../elements/toastify";

import "./contact.css";
import { BACKEND_URL } from "../../../elements/config";
function ContactList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [contacts, setContacts] = useState();

  const handleRemove = (id) => {
    setLoading(true);
    axios.delete(`${BACKEND_URL}/contacts/${id}`).then(() => {
      SuccessNotification("Kullanıcı başarıyla kaldırıldı");
      setContacts([]);
      getContacts();
    });
  };
  const getContacts = () => {
    axios
      .get(`${BACKEND_URL}/contacts`)
      .then((response) => {
        const contactsList = response.data;
        setContacts(contactsList);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getContacts();
  }, []);
  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />
      </div>
    );
  else
    return (
      <div className="contact-list">
        <h1 className="admin-title">İletişim Listesi</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="id">İlan ID</th>
                <th className="type">İlan Tipi</th>
                <th className="name">İsim Soyisim</th>
                <th className="phone">Numara</th>
                <th className="event">Kaldır</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => {
                return (
                  <tr key={contact.id}>
                    <td>
                      <Link
                        to={
                          contact.type === "Konut"
                            ? `/konut/${contact.pageId}`
                            : `/araba/${contact.pageId}`
                        }
                        target="_blank"
                      >
                        {contact.pageId}
                      </Link>
                    </td>
                    <td>{contact.type}</td>
                    <td>{contact.nameSurname}</td>
                    <td>
                      <a
                        href={`https://wa.me/${contact.phone}`}
                        target="_blank"
                      >
                        {contact.phone}
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          handleRemove(contact.id);
                        }}
                      >
                        <IoCloseOutline />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default ContactList;
