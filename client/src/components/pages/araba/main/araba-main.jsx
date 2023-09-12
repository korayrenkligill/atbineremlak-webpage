import React from "react";
import { AiFillCamera } from "react-icons/ai";
import { GiPathDistance, GiGearStickPattern } from "react-icons/gi";
import { BsFuelPump } from "react-icons/bs";
import { Helmet } from "react-helmet";
import "./araba-main.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function ArabaMain(props) {
  const container = {
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const motionItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const navigation = useNavigate();
  return (
    <div className="araba-main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Atbiner Emlak : Araba İlanları</title>
        <meta name="author" content="Koray Renkligil" />
        <meta
          name="description"
          content="Manisa’daki en güvenilir emlakçınız! Dükkanımızda, müşterilerimize en iyi hizmeti sunmak için her zaman çalışıyoruz. Geniş portföyümüzde, her bütçeye uygun evler, daireler ve arabalar bulunmaktadır. Bize güvenebilirsiniz!"
        />
        <meta
          name="keywords"
          content="atbineremlak, atbiner emlak, emlak, emlakçı, gayrimenkul, ev, daire, kiralık, satılık, konut, iş yeri, ofis, arazi, manisa, yunusemre, şehzadeler, yenimahalle, muradiye, karaköy"
        />
      </Helmet>
      {(props.marka.length > 0 ||
        props.seri.length > 0 ||
        props.yakit.length > 0 ||
        props.vites.length > 0 ||
        props.aracDurumu.length > 0 ||
        props.kasa.length > 0 ||
        props.yil > 0 ||
        props.km > 0 ||
        props.minPrice > 0 ||
        props.maxPrice > 0) && (
        <div className="filtreler">
          <span>Filtreler</span>
          {props.marka.length > 0 && <p>marka : {props.marka}</p>}
          {props.seri.length > 0 && <p>seri : {props.seri}</p>}
          {props.yakit.length > 0 && <p>yakıt : {props.yakit}</p>}
          {props.vites.length > 0 && <p>vites : {props.vites}</p>}
          {props.aracDurumu.length > 0 && (
            <p>araç durumu : {props.aracDurumu}</p>
          )}
          {props.kasa.length > 0 && <p>kasa : {props.kasa}</p>}
          {props.yil > 0 && <p>yıl : {props.yil}</p>}
          {props.km > 0 && <p>kilometre : {props.km}</p>}
          {props.minPrice > 0 && <p>en düşük fiyat : {props.minPrice}</p>}
          {props.maxPrice > 0 && <p>en yüksek fiyat : {props.maxPrice}</p>}
        </div>
      )}
      {props.cars.length <= 0 ? (
        <div className="null-list">
          Aradığınız kriterlerde bir ilan bulunamadı :(
        </div>
      ) : (
        <motion.div
          className="ilanlar"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {props.cars.map((item, key) => {
            if (item.activity === "Aktif")
              return (
                <motion.div
                  className="araba-item"
                  onClick={() => {
                    navigation(`/araba/${item.id}`);
                  }}
                  key={key}
                  variants={motionItem}
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
                    <p className="marka-seri">
                      {item.marka} / {item.seri}
                    </p>
                    <h1>
                      {item.baslik.length > 45
                        ? `${item.baslik.slice(0, 43)}..`
                        : item.baslik}
                    </h1>
                    <p>
                      <span>Araç Durumu:</span> {item.aracDurumu}
                    </p>
                  </div>
                  <div className="features">
                    <p title="araç kilometresi">
                      <GiPathDistance className="icon" /> {item.km}km
                    </p>
                    <p title="vites türü">
                      <GiGearStickPattern className="icon" /> {item.vites}
                    </p>
                    <p title="yakıt türü">
                      <BsFuelPump className="icon" /> {item.yakit}
                    </p>
                  </div>
                  <p className="price">
                    {formatNumberWithCommas(item.fiyat)} ₺
                  </p>
                </motion.div>
              );
          })}
          {props.cars.map((item, key) => {
            if (item.activity === "Deaktif")
              return (
                <div
                  className="araba-item"
                  onClick={() => {
                    navigation(`/araba/${item.id}`);
                  }}
                  style={{ opacity: 0.6 }}
                  key={key}
                >
                  <div
                    className="frame"
                    style={{ backgroundImage: `url(${item.images[0]})` }}
                  >
                    <div
                      className={`sold ${item.activity === "Aktif" && "hide"}`}
                    >
                      <p>SATILDI</p>
                    </div>
                    <div className="image-count">
                      <AiFillCamera />
                      <span>{item.images.length}</span>
                    </div>
                  </div>
                  <div className="texts">
                    <p className="marka-seri">
                      {item.marka} / {item.seri}
                    </p>
                    <h1>
                      {item.baslik.length > 45
                        ? `${item.baslik.slice(0, 43)}..`
                        : item.baslik}
                    </h1>
                    <p>
                      <span>Araç Durumu:</span> {item.aracDurumu}
                    </p>
                  </div>
                  <div className="features">
                    <p title="araç kilometresi">
                      <GiPathDistance className="icon" /> {item.km}km
                    </p>
                    <p title="vites türü">
                      <GiGearStickPattern className="icon" /> {item.vites}
                    </p>
                    <p title="yakıt türü">
                      <BsFuelPump className="icon" /> {item.yakit}
                    </p>
                  </div>
                  <p className="price">
                    {formatNumberWithCommas(item.fiyat)} ₺
                  </p>
                </div>
              );
          })}
        </motion.div>
      )}
    </div>
  );
}

export default ArabaMain;
