import React from "react";
import { AiFillCamera } from "react-icons/ai";
import "./emlak-main.css";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function EmlakMain(props) {
  return (
    <div className="emlak-main">
      {props.realEstates.map((item) => {
        if (
          !item.ilce.includes(props.ilce) ||
          !item.mahalle.includes(props.mahalle) ||
          !item.type.includes(props.type) ||
          !item.roomCount.includes(props.roomCount) ||
          !item.heating.includes(props.heating) ||
          !item.furnished.includes(props.furnished) ||
          !item.usingState.includes(props.usingState) ||
          (props.minPrice !== 0 && props.minPrice > Number(item.price)) ||
          (props.maxPrice !== 0 && props.maxPrice < Number(item.price))
        ) {
        } else
          return (
            <div
              className="emlak-item"
              onClick={() => {
                console.log(props.realEstates);
              }}
            >
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
                  {item.title.length > 45
                    ? `${item.title.slice(0, 43)}..`
                    : item.title}
                </h1>
                <p>
                  {item.ilce} / {item.mahalle}
                </p>
                <p>
                  <span>İlan türü:</span> {item.type}
                </p>
                <p>
                  <span>Metre kare:</span> {item.grossArea}m²
                </p>
              </div>
              <p className="price">{formatNumberWithCommas(item.price)} ₺</p>
            </div>
          );
      })}
    </div>
  );
}

export default EmlakMain;
