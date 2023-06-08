import React, { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

import "./real-estate-requests.css";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { BACKEND_URL } from "../../../../elements/config";
import { useNavigate } from "react-router-dom";
import { SuccessNotification } from "../../../../elements/toastify";
function RealEstateRequests() {
  const navigation = useNavigate();

  const [loading, setLoading] = useState(true);
  const [realEstates, setRealEstates] = useState([]);

  const handleAccept = (event, id) => {
    event.stopPropagation();
    let realEstate = realEstates.find((u) => u.id == id);
    realEstate.request = false;
    axios.put(`${BACKEND_URL}/real-estates/${id}`, realEstate).then(() => {
      SuccessNotification("İlan başarıyla onaylandı");
      navigation("/admin/konutlar/");
    });
  };
  const handleReject = (event, id) => {
    event.stopPropagation();
    axios.delete(`${BACKEND_URL}/real-estates/${id}`).then(() => {
      SuccessNotification("İlan başarıyla reddedildi");
      navigation("/admin/konutlar/");
    });
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/real-estates`)
      .then((response) => {
        let realEstatesList = response.data;
        realEstatesList = realEstatesList.filter((u) => u.request === true);
        setRealEstates(realEstatesList);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />
      </div>
    );
  else
    return (
      <div className="real-estate-requests">
        <h1 className="admin-title">Konut İlanı İstekleri</h1>
        <div className="table-container">
          {realEstates.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th className="image">Resim</th>
                  <th className="title">Başlık</th>
                  <th className="area">m² (Brüt)</th>
                  <th className="room-count">Oda Sayısı</th>
                  <th className="price">Fiyat</th>
                  <th className="ilce">İlçe</th>
                  <th className="actions">Aksiyonlar</th>
                </tr>
              </thead>
              <tbody>
                {realEstates.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      onClick={() => {
                        navigation(`/admin/konut/edit/${item.id}`);
                      }}
                    >
                      <td>
                        <div
                          className="frame"
                          style={{
                            backgroundImage: `url(${item.images[0]})`,
                          }}
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.grossArea}</td>
                      <td>{item.roomCount}</td>
                      <td>{item.price}</td>
                      <td>{item.ilce}</td>
                      <td>
                        <div className="actions">
                          <button
                            onClick={(event) => {
                              handleAccept(event, item.id);
                            }}
                          >
                            <BsCheckLg />
                          </button>
                          <button
                            onClick={(event) => {
                              handleReject(event, item.id);
                            }}
                          >
                            <IoCloseOutline />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="items-list-null">
              <p>Herhangi bir ilan isteği bulunamadı :(</p>
            </div>
          )}
        </div>
      </div>
    );
}

export default RealEstateRequests;
