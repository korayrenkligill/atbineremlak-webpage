import React, { useEffect, useState } from "react";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import AreYouSure from "../../../../elements/are-you-sure";
import "./real-estate-list.css";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function RealEstateList() {
  const [loading, setLoading] = useState(true);
  const [areYouSureIsOpen, setAreYouSureIsOpen] = useState(false);

  const [realEstates, setRealEstates] = useState([]);

  const rejectFunction = () => {
    setAreYouSureIsOpen(false);
  };
  const acceptFunction = (id) => {
    axios
      .delete(`http://localhost:4000/real-estates/${id}`)
      .then(() => {
        setLoading(true);
      })
      .then(() => setAreYouSureIsOpen(false))
      .then(getRealEstates);
  };

  const handleRemove = () => {
    setAreYouSureIsOpen(true);
  };

  const getRealEstates = () => {
    axios
      .get("http://localhost:4000/real-estates")
      .then((response) => {
        const realEstatesList = response.data;
        setRealEstates(realEstatesList);
      })
      .then(() => setLoading(false));
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/real-estates")
      .then((response) => {
        const realEstatesList = response.data;
        setRealEstates(realEstatesList);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />;
      </div>
    );
  else
    return (
      <div className="real-estate-list">
        <h1
          className="admin-title"
          onClick={() => {
            getRealEstates();
            console.log("Get edildi!");
          }}
        >
          Konut İlanları Listesi
        </h1>
        {realEstates.length !== 0 ? (
          <div className="items-list">
            {realEstates.map((item) => {
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
                    <h3>{item.title}</h3>
                    <p>Fiyat: {formatNumberWithCommas(item.price)}₺</p>
                    <p>Oda sayısı: {item.roomCount}</p>
                    <p>m² (Net): {item.netArea}</p>
                    <p>Bina yaşı: {item.buildAge}</p>
                    <p>Bulunduğu kat: {item.floor}</p>
                  </div>
                  <Link
                    to={`/admin/konut/edit/${item.id}`}
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

export default RealEstateList;
