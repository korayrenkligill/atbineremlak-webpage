import React from "react";
import { BsHandIndexThumb } from "react-icons/bs";
import "./popular-listings.css";
import { useNavigate } from "react-router-dom";

function PopularListings({ realEstates }) {
  const navigation = useNavigate();
  return (
    <section className="popular-listings">
      <h1 className="title">Popüler ilanlar</h1>
      <div className="real-estate-listings">
        {realEstates.map((item, key) => {
          return (
            <div className="list-item" key={key}>
              <div
                className="image-background"
                style={{
                  backgroundImage: `url(${item.images[0]})`,
                }}
              >
                <div>
                  <BsHandIndexThumb className="icon" />
                </div>
              </div>
              <h3>{item.title.slice(0, 20)}...</h3>
              <p>Oda sayısı: {item.roomCount}</p>
              <p>m² (Net): {item.grossArea}</p>
              <p>Bina yaşı: {item.buildAge}</p>
              <p>Bulunduğu kat: {item.floor}</p>
              <button
                onClick={() => {
                  navigation(`/konut/${item.id}`);
                }}
              >
                İlana git
              </button>
            </div>
          );
        })}
      </div>
      <div className="more-container">
        <button
          className="more"
          onClick={() => {
            navigation("/");
          }}
        >
          Devamı
        </button>
      </div>
    </section>
  );
}

export default PopularListings;
