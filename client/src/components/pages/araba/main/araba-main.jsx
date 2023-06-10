import React from "react";
import { AiFillCamera } from "react-icons/ai";
import "./araba-main.css";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function ArabaMain(props) {
  return (
    <div
      className="emlak-main"
      onClick={() => {
        console.log(props.cars);
      }}
    >
      {props.cars.map((item) => {
        if (
          !item.marka.includes(props.marka) ||
          !item.seri.includes(props.seri) ||
          !item.yakit.includes(props.yakit) ||
          !item.vites.includes(props.vites) ||
          !item.aracDurumu.includes(props.aracDurumu) ||
          !item.kasa.includes(props.kasa) ||
          (props.yil !== 0 &&
            props.yil &&
            Number(props.yil) !== Number(item.yil)) ||
          (props.km !== 0 && props.km && props.km < Number(item.km)) ||
          (props.minPrice !== 0 &&
            props.minPrice &&
            props.minPrice > Number(item.price)) ||
          (props.maxPrice !== 0 &&
            props.maxPrice &&
            props.maxPrice < Number(item.price))
        ) {
        } else
          return (
            <div className="emlak-item">
              <div
                className="frame"
                style={{ backgroundImage: `url(${item.images[0]})` }}
              >
                <div className="image-count">
                  <AiFillCamera />
                  <span>{item.images.length}</span>
                </div>
              </div>
              <div className="texts">
                <h1>
                  {item.baslik.length > 45
                    ? `${item.baslik.slice(0, 43)}..`
                    : item.baslik}
                </h1>
                <p>
                  {item.marka} / {item.model}
                </p>
                <p>
                  <span>Araç Durumu:</span> {item.aracDurumu}
                </p>
                <p>
                  <span>Kilometre:</span> {item.km}km
                </p>
              </div>
              <p className="price">{formatNumberWithCommas(item.fiyat)} ₺</p>
            </div>
          );
      })}
    </div>
  );
}

export default ArabaMain;
