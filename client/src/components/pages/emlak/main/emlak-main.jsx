import React from "react";
import { AiFillCamera, AiFillEye } from "react-icons/ai";
import { RiRuler2Line } from "react-icons/ri";
import { MdOutlineChair } from "react-icons/md";
import { LuLampWallUp } from "react-icons/lu";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "./emlak-main.css";
import { motion } from "framer-motion";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function EmlakMain(props) {
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
    <div className="emlak-main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Atbiner Emlak : Ev İlanları</title>
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
      {(props.ilce.length > 0 ||
        props.mahalle.length > 0 ||
        props.type.length > 0 ||
        props.roomCount.length > 0 ||
        props.heating.length > 0 ||
        props.furnished.length > 0 ||
        props.floor > 0 ||
        props.usingState.length > 0 ||
        props.minPrice > 0 ||
        props.maxPrice > 0) && (
        <div className="filtreler">
          <span>Filtreler</span>
          {props.ilce.length > 0 && <p>ilce : {props.ilce}</p>}
          {props.mahalle.length > 0 && <p>mahalle : {props.mahalle}</p>}
          {props.type.length > 0 && <p>ilan türü : {props.type}</p>}
          {props.roomCount.length > 0 && <p>oda sayısı : {props.roomCount}</p>}
          {props.heating.length > 0 && <p>ısıtma : {props.heating}</p>}
          {props.furnished.length > 0 && <p>eşyalı : {props.furnished}</p>}
          {props.floor > 0 && <p>bulunduğu kat : {props.floor}</p>}
          {props.usingState.length > 0 && (
            <p>kullanım durumu : {props.usingState}</p>
          )}
          {props.minPrice > 0 && <p>en düşük fiyat : {props.minPrice}</p>}
          {props.maxPrice > 0 && <p>en yüksek fiyat : {props.maxPrice}</p>}
        </div>
      )}
      {props.realEstates.length <= 0 ? (
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
          {props.realEstates.map((item, key) => {
            if (item.activity === "Aktif")
              return (
                <motion.div
                  className="emlak-item"
                  onClick={() => {
                    navigation(`/konut/${item.id}`);
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
                    <p className="ilce-mahalle">
                      {item.ilce} / {item.mahalle}
                    </p>
                    <h1>
                      {item.title.length > 45
                        ? `${item.title.slice(0, 43)}..`
                        : item.title}
                    </h1>
                    <p>
                      <span>İlan türü:</span> {item.type}
                    </p>
                  </div>
                  <div className="features">
                    <p title="Brüt metrekare">
                      <RiRuler2Line className="icon" /> {item.grossArea}m²
                    </p>
                    <p title="Oda sayısı">
                      <MdOutlineChair className="icon" /> {item.roomCount}
                    </p>
                    <p
                      title={
                        item.furnished.toLocaleLowerCase() === "evet"
                          ? "Eşyalı"
                          : "Eşyalı değil"
                      }
                    >
                      <LuLampWallUp className="icon" />
                      {item.furnished.toLocaleLowerCase() === "evet"
                        ? "✓"
                        : "✕"}
                    </p>
                  </div>
                  <p className="price">
                    {formatNumberWithCommas(item.price)} ₺
                  </p>
                </motion.div>
              );
          })}
          {props.realEstates.map((item, key) => {
            if (item.activity === "Deaktif")
              return (
                <div
                  className="emlak-item"
                  onClick={() => {
                    navigation(`/konut/${item.id}`);
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
                    <p className="ilce-mahalle">
                      {item.ilce} / {item.mahalle}
                    </p>
                    <h1>
                      {item.title.length > 45
                        ? `${item.title.slice(0, 43)}..`
                        : item.title}
                    </h1>
                    <p>
                      <span>İlan türü:</span> {item.type}
                    </p>
                  </div>
                  <div className="features">
                    <p title="Brüt metrekare">
                      <RiRuler2Line className="icon" /> {item.grossArea}m²
                    </p>
                    <p title="Oda sayısı">
                      <MdOutlineChair className="icon" /> {item.roomCount}
                    </p>
                    <p
                      title={
                        item.furnished.toLocaleLowerCase() === "evet"
                          ? "Eşyalı"
                          : "Eşyalı değil"
                      }
                    >
                      <LuLampWallUp className="icon" />
                      {item.furnished.toLocaleLowerCase() === "evet"
                        ? "✓"
                        : "✕"}
                    </p>
                  </div>
                  <p className="price">
                    {formatNumberWithCommas(item.price)} ₺
                  </p>
                </div>
              );
          })}
        </motion.div>
      )}
    </div>
  );
}

export default EmlakMain;
