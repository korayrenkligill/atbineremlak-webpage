import React, { useEffect, useState } from "react";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import AreYouSure from "../../../../elements/are-you-sure";
import "./real-estate-list.css";
import { BACKEND_URL } from "../../../../elements/config";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function RealEstateList() {
  const [loading, setLoading] = useState(true);
  const [areYouSureIsOpen, setAreYouSureIsOpen] = useState(false);
  const navigation = useNavigate();

  const [realEstates, setRealEstates] = useState([]);

  const rejectFunction = () => {
    setAreYouSureIsOpen(false);
  };
  const acceptFunction = (id) => {
    setLoading(true);
    axios
      .delete(`${BACKEND_URL}/real-estates/${id}`)
      .then(() => setAreYouSureIsOpen(false))
      .then(getRealEstates);
  };

  const handleRemove = () => {
    setAreYouSureIsOpen(true);
  };

  const getRealEstates = () => {
    axios
      .get(`${BACKEND_URL}/real-estates`)
      .then((response) => {
        const realEstatesList = response.data;
        setRealEstates(realEstatesList);
      })
      .then(() => setLoading(false));
  };
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/real-estates`)
      .then((response) => {
        let realEstatesList = response.data;
        realEstatesList = realEstatesList.filter(
          (u) => u.request === false || u.request === "false"
        );
        setRealEstates(realEstatesList);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />
        <h2>İlanlar Listeleniyor</h2>
        <p>
          "bu işlem ilan sayısına bağlı olarak biraz zaman alabilir sabrınız
          için teşekkürler"
        </p>
      </div>
    );
  else
    return (
      <div className="real-estate-list">
        <h1
          className="admin-title"
          onClick={() => {
            getRealEstates();
          }}
        >
          Konut İlanları Listesi
        </h1>
        {realEstates.length !== 0 ? (
          <div className="items-list">
            {realEstates.map((item) => {
              if (item.activity === "Aktif")
                return (
                  <div className="item" key={item.id}>
                    <button
                      className="remove-item-button"
                      onClick={handleRemove}
                    >
                      <BsFillTrash3Fill />
                    </button>
                    <div
                      className="image-background"
                      style={{
                        backgroundImage: `url(${item.images[0]})`,
                      }}
                      onClick={() => {
                        navigation(`/konut/${item.id}`);
                      }}
                    />
                    <div className="item-information">
                      <h3>
                        {item.title.length > 45
                          ? `${item.title.slice(0, 43)}..`
                          : item.title}
                      </h3>
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
            {realEstates.map((item) => {
              if (item.activity === "Deaktif")
                return (
                  <div className="item" key={item.id} style={{ opacity: 0.7 }}>
                    <button
                      className="remove-item-button"
                      onClick={handleRemove}
                    >
                      <BsFillTrash3Fill />
                    </button>
                    <div
                      className="image-background"
                      style={{
                        backgroundImage: `url(${item.images[0]})`,
                      }}
                      onClick={() => {
                        navigation(`/konut/${item.id}`);
                      }}
                    >
                      <div
                        className={`sold ${
                          item.activity === "Aktif" && "hide"
                        }`}
                      >
                        <p>SATILDI</p>
                      </div>
                    </div>
                    <div className="item-information">
                      <h3>
                        {item.title.length > 45
                          ? `${item.title.slice(0, 43)}..`
                          : item.title}
                      </h3>
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
