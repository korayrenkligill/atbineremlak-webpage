import React, { useEffect, useState } from "react";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import PuffLoader from "react-spinners/PuffLoader";
import { Link } from "react-router-dom";
import AreYouSure from "../../../../elements/are-you-sure";
import { BACKEND_URL } from "../../../../elements/config";
import axios from "axios";

import "./car-list.css";

function CarList() {
  const [loading, setLoading] = useState(true);
  const [areYouSureIsOpen, setAreYouSureIsOpen] = useState(false);

  const [cars, setCars] = useState([]);

  const rejectFunction = () => {
    setAreYouSureIsOpen(false);
  };
  const acceptFunction = (id) => {
    axios
      .delete(`${BACKEND_URL}/cars/${id}`)
      .then(() => {
        setLoading(true);
      })
      .then(() => setAreYouSureIsOpen(false))
      .then(getCars);
  };

  const handleRemove = () => {
    setAreYouSureIsOpen(true);
  };
  const getCars = () => {
    axios
      .get(`${BACKEND_URL}/cars`)
      .then((response) => {
        const cars = response.data.filter((u) => u.request === false);
        setCars(cars);
      })
      .then(() => setLoading(false));
  };
  useEffect(() => {
    getCars();
  }, []);

  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />;
      </div>
    );
  else
    return (
      <div className="car-list">
        <h1 className="admin-title">Otomobil İlanları Listesi</h1>
        {cars.length !== 0 ? (
          <div className="items-list">
            {cars.map((item) => {
              return (
                <div className="item" key={item.id}>
                  <button className="remove-item-button" onClick={handleRemove}>
                    <BsFillTrash3Fill />
                  </button>
                  <div
                    className="image-background"
                    style={{
                      backgroundImage: `url(${item.images[0]})`,
                    }}
                  />
                  <div className="item-information">
                    <h3>{item.baslik}</h3>
                    <p>Fiyat: {item.fiyat}</p>
                    <p>
                      Model:{" "}
                      {item.model.length <= 0 ? "belirtilmedi" : item.model}
                    </p>
                    <p>Motor: {item.motorGucu} cc</p>
                    <p>KM: {item.km}</p>
                  </div>
                  <Link
                    to={`/admin/otomobil/edit/${item.id}`}
                    className="edit-item-button"
                  >
                    <BsPencilSquare />
                    İlanı Düzenle
                  </Link>
                  {areYouSureIsOpen && (
                    <AreYouSure
                      text="Bu ilanı kaldırmak istediğinden emin misin?"
                      rejectFunction={rejectFunction}
                      acceptFunction={() => {
                        acceptFunction(item.id);
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="items-list-null">
            <p>Bu sayfada henüz bir ilan girişi yapılmamıştır :(</p>
          </div>
        )}
      </div>
    );
}

export default CarList;
