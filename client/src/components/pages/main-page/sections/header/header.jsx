import React from "react";
import Slider from "react-slick";
import "./header.css";
import { RiRuler2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdOutlineChair } from "react-icons/md";
import { motion } from "framer-motion";
function formatNumber(number) {
  // Sayıyı stringe çevirme
  var str = number.toString();

  // Virgülden sonraki kısmı kontrol etme
  var decimalIndex = str.indexOf(".");
  var decimalPart = "";
  if (decimalIndex !== -1) {
    decimalPart = str.substr(decimalIndex);
    str = str.substr(0, decimalIndex);
  }

  // Basamakları 3'erli gruplara bölmek için regex kullanma
  var regex = /(\d+)(\d{3})/;
  while (regex.test(str)) {
    str = str.replace(regex, "$1.$2");
  }

  // Tam sayı ve ondalık kısmı birleştirme
  return str + decimalPart;
}
function Header({ realEstates }) {
  const containerMotion = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  const navigation = useNavigate();
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  return (
    <header>
      <div className="lastest-slider">
        <Slider {...settings}>
          {realEstates.map((item, key) => {
            return (
              <div key={key}>
                <div
                  style={{ backgroundImage: `url(${item.images[0]})` }}
                  className="item"
                >
                  <div className="slider-background">
                    <motion.p
                      className="date"
                      variants={containerMotion}
                      initial="hidden"
                      animate="visible"
                    >
                      {item.date}
                    </motion.p>
                    <motion.h1
                      className="slider-title"
                      variants={containerMotion}
                      initial="hidden"
                      animate="visible"
                    >
                      {item.title}
                    </motion.h1>
                    <motion.div
                      className="features"
                      variants={containerMotion}
                      initial="hidden"
                      animate="visible"
                    >
                      <p>
                        <RiRuler2Line className="icon" /> {item.grossArea}m²
                      </p>
                      <p>
                        <MdOutlineChair className="icon" /> {item.roomCount}
                      </p>
                    </motion.div>
                    <motion.button
                      className="detail-button"
                      onClick={() => {
                        navigation(`/konut/${item.id}`);
                      }}
                      variants={containerMotion}
                      initial="hidden"
                      animate="visible"
                    >
                      ₺{formatNumber(item.price)}
                    </motion.button>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* <div className="header">
        <h1>
          Hayal Ettiğiniz Yaşamı İnşa Edin
          <br /> Lüks Emlaklarımızla Konfor ve Prestijin Keyfini Çıkarın.
        </h1>
        <span>“ Siz hayal edin, Biz gerçekleştirelim ”</span>
        <button>İletişime geç</button>
      </div>
      <div className="frame">
        <img src="/images/estate-illustration.png" alt="" />
      </div> */}
    </header>
  );
}

export default Header;
