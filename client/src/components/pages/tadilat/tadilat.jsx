import "./tadilat.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import PuffLoader from "react-spinners/PuffLoader";
import { BACKEND_URL } from "../../elements/config";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Tadilat() {
  const navigation = useNavigate();
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
  const [loading, setLoading] = useState(true);

  const [tadilatlar, setTadilatlar] = useState([]);
  const [showMore, setShowMore] = useState(false);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/tadilat`)
      .then((response) => {
        setTadilatlar(response.data);
      })
      .then(() => {
        setLoading(false);
      });
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
      <div className="tadilat">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Atbiner Emlak : Tadilat</title>
          <meta name="author" content="Koray Renkligil" />
          <meta
            name="description"
            content="Manisa’daki en güvenilir emlakçınız! Dükkanımızda, müşterilerimize en iyi hizmeti sunmak için her zaman çalışıyoruz. Geniş portföyümüzde, her bütçeye uygun evler, daireler ve arabalar bulunmaktadır. Bize güvenebilirsiniz!"
          />
          <meta
            name="keywords"
            content="atbineremlak,atbiner emlak, emlak, emlakçı, gayrimenkul, ev, daire, kiralık, satılık, konut, iş yeri, ofis, arazi, manisa, yunusemre, şehzadeler, yenimahalle, muradiye, karaköy, tadilat"
          />
        </Helmet>
        <div className="lastest-slider">
          <Slider {...settings}>
            <div className="tadilat-slider-item">
              <div
                className="tadilat-slider-background"
                style={{
                  backgroundImage: `url("https://assets.architecturaldigest.in/photos/63c94f218df6b9fdb924d9b1/16:9/w_2560%2Cc_limit/220615-KBWID_Highland_009.jpg")`,
                }}
              />
              <div className="tadilat-slider-front">
                <motion.a
                  className="contact-button"
                  href="https://wa.me/+905525961533"
                  target="blank"
                  variants={containerMotion}
                  initial="hidden"
                  animate="visible"
                >
                  İletişime Geç
                </motion.a>
              </div>
            </div>
          </Slider>
        </div>
        <div className="tadilat-projects">
          <h1 className="title">Projelerimiz</h1>
          <div className="tadilat-projects-list">
            {showMore
              ? tadilatlar.map((item, key) => {
                  return (
                    <div
                      className="item"
                      onClick={() => {
                        navigation(`/tadilat/${item.id}/`);
                      }}
                    >
                      <div
                        className="image"
                        style={{ backgroundImage: `url(${item.oldImages[0]})` }}
                      />
                      <div className="item-title">{item.title}</div>
                    </div>
                  );
                })
              : tadilatlar.slice(0, 3).map((item, key) => {
                  return (
                    <div
                      className="item"
                      onClick={() => {
                        navigation(`/tadilat/${item.id}/`);
                      }}
                    >
                      <div
                        className="image"
                        style={{ backgroundImage: `url(${item.oldImages[0]})` }}
                      />
                      <div className="item-title">{item.title}</div>
                    </div>
                  );
                })}
          </div>
          {tadilatlar.length > 3 && (
            <button
              className="more"
              onClick={() => {
                setShowMore(!showMore);
              }}
            >
              {showMore ? "Daralt" : "Genişlet"}
            </button>
          )}
        </div>
        <div className="iletisim">
          <p className="web">atbineremlak.com</p>
          <img src="/logo.png" alt="logo" className="logo" />
          <p>
            Tadilatta bizleri tercih ederek, evinizi daha iyi bir yaşam alanına
            dönüştürebilirsiniz. Evinizi daha güvenli, daha konforlu ve daha
            sağlıklı hale getirir evinizi değerine değer katabilirsiniz.
          </p>
          <hr />
          <p className="adres">
            Adres : Yarhasanlar Mahallesi Karamızrak Cad. No: 16D, Manisa /
            Şehzadeler
          </p>
          <hr />
          <a href="tel:+905534421797" className="telefon">
            +90 553 442 17 97
          </a>
          <hr />
          <p className="whatsapp-text">
            WhatsApp üzerinden mesajlaşarak sorularınızı dilediğiniz zaman
            iletebilir, ihtiyaç duyduğunuz hizmet ve ürünler hakkında hızla
            destek alabilir ve öğrenmek istediğiniz tüm bilgilere WhatsApp
            platformu üzerinden erişebilirsiniz.
          </p>
          <a className="whatsapp-link">Whatsapp Destek</a>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d194.83839978277953!2d27.425775600704476!3d38.61634685483076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1satbiner%20emlak!5e0!3m2!1str!2str!4v1692276044033!5m2!1str!2str"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    );
}

export default Tadilat;
