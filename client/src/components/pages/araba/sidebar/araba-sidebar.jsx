import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import "./araba-sidebar.css";

const otomobilModelleri = [
  "Seçiniz..",
  "Audi",
  "BMW",
  "Citroen",
  "Cupra",
  "Dacia",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Kia",
  "Lada",
  "Mercedes - Benz",
  "Mitsubishi",
  "Nissan",
  "Opel",
  "Peugeot",
  "Renault",
  "Seat",
  "Skoda",
  "Tofaş",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

function ArabaSidebar(props) {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <div className="emlak-sidebar">
      <h2
        className="title"
        onClick={() => {
          setMobileMenu(!mobileMenu);
        }}
      >
        Filtreleme Menüsü <IoMenu className="icon" />
      </h2>
      <div
        className={`mobile-menu ${
          mobileMenu ? "mobile-menu-open" : "mobile-menu-close"
        }`}
      >
        <div className="sidebar-element">
          <label htmlFor="emlak-sidebar-ilce">Marka</label>
          <select
            id="emlak-sidebar-ilce"
            value={props.marka}
            onChange={(e) => {
              if (e.target.value !== "") props.setMarka(e.target.value);
              else {
                props.setMarka(e.target.value);
              }
            }}
          >
            {otomobilModelleri.map((item, key) => {
              if (item === "Seçiniz..")
                return (
                  <option value="" key={key}>
                    {item}
                  </option>
                );
              else
                return (
                  <option value={item} key={key}>
                    {item}
                  </option>
                );
            })}
          </select>
        </div>
        {props.marka !== "" && (
          <div className="sidebar-element">
            <label htmlFor="emlak-sidebar-mahalle">Seri</label>
            <input
              type="text"
              placeholder="seri.."
              value={props.seri}
              onChange={(e) => props.setSeri(e.target.value)}
            />
          </div>
        )}
        <div className="sidebar-element">
          <label htmlFor="emlak-sidebar-type">Yil</label>
          <input
            type="number"
            placeholder="yil.."
            value={props.yil > 0 && props.yil}
            onChange={(e) => props.setYil(e.target.value)}
          />
        </div>
        <div className="sidebar-element-double">
          <h2 className="inner-title">Fiyat</h2>
          <input
            type="number"
            placeholder="min.."
            min="0"
            value={props.minPrice > 0 && props.minPrice}
            onChange={(e) => props.setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="max.."
            min="0"
            value={props.maxPrice > 0 && props.maxPrice}
            onChange={(e) => props.setMaxPrice(e.target.value)}
          />
        </div>
        <div className="sidebar-element">
          <label htmlFor="car-add-form-yakit">Yakıt</label>
          <select
            value={props.yakit}
            onChange={(e) => {
              props.setYakit(e.target.value);
            }}
            id="car-add-form-yakit"
          >
            <option value="">Seçiniz..</option>
            <option value="Benzin">Benzin</option>
            <option value="Benzin & LPG">Benzin & LPG</option>
            <option value="Dizel">Dizel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Elektrik">Elektrik</option>
          </select>
        </div>
        <div className="sidebar-element">
          <label htmlFor="car-add-form-vites">Vites</label>
          <select
            value={props.vites}
            onChange={(e) => {
              props.setVites(e.target.value);
            }}
            id="car-add-form-vites"
          >
            <option value="">Seçiniz..</option>
            <option value="Manuel">Manuel</option>
            <option value="Otomatik">Otomatik</option>
          </select>
        </div>
        <div className="sidebar-element">
          <label htmlFor="car-add-form-arac-durumu">Araç Durumu</label>
          <select
            value={props.aracDurumu}
            onChange={(e) => {
              props.setAracDurumu(e.target.value);
            }}
            id="car-add-form-arac-durumu"
          >
            <option value="İkinci El">Seçiniz..</option>
            <option value="İkinci El">İkinci El</option>
            <option value="Yurtdışından İthal Sıfır">
              Yurtdışından İthal Sıfır
            </option>
            <option value="Sıfır">Sıfır</option>
          </select>
        </div>
        <div className="sidebar-element">
          <label htmlFor="">En fazla kilometre</label>
          <input
            type="number"
            placeholder="kilometre.."
            value={props.km > 0 && props.km}
            onChange={(e) => props.setKm(e.target.value)}
          />
        </div>
        <div className="sidebar-element">
          <label htmlFor="car-add-form-kasa-tipi">Kasa Tipi</label>
          <select
            value={props.kasa}
            onChange={(e) => {
              props.setKasa(e.target.value);
            }}
            id="car-add-form-kasa-tipi"
          >
            <option value="">Seçiniz..</option>
            <option value="Cabrip">Cabrio</option>
            <option value="Coupe">Coupe</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="Station Wagon">Station Wagon</option>
            <option value="MPV">MPV</option>
            <option value="Roadster">Roadster</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ArabaSidebar;
