import React, { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import "./car-request.css";

import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { BACKEND_URL } from "../../../../elements/config";
import { useNavigate } from "react-router-dom";
import { SuccessNotification } from "../../../../elements/toastify";

function CarRequest({ user }) {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);

  const handleAccept = (event, id) => {
    event.stopPropagation();
    let car = cars.find((u) => u.id == id);
    car.request = false;
    car.user = user;
    axios.put(`${BACKEND_URL}/cars/request-accept/${id}`, car).then(() => {
      SuccessNotification("İlan başarıyla onaylandı");
      navigation("/admin/otomobiller/");
    });
  };
  const handleReject = (event, id) => {
    event.stopPropagation();
    axios.delete(`${BACKEND_URL}/cars/${id}`).then(() => {
      SuccessNotification("İlan başarıyla reddedildi");
      navigation("/admin/otomobiller/");
    });
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/cars`)
      .then((response) => {
        let carsList = response.data;
        carsList = carsList.filter((u) => u.request === true);
        setCars(carsList);
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
      <div className="car-requests">
        <h1 className="admin-title">Konut İlanı İstekleri</h1>
        <div className="table-container">
          {cars.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th className="image">Resim</th>
                  <th className="title">Başlık</th>
                  <th className="model">Model</th>
                  <th className="motor">Motor</th>
                  <th className="km">KM</th>
                  <th className="price">Fiyat</th>
                  <th className="actions">Aksiyonlar</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      onClick={() => {
                        navigation(`/admin/otomobil/edit/${item.id}`);
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
                      <td>{item.baslik}</td>
                      <td>{item.marka}</td>
                      <td>{item.motorHacmi} cc</td>
                      <td>{item.km}</td>
                      <td>{item.fiyat}</td>
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

export default CarRequest;
