import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { BACKEND_URL } from "../../../elements/config";

import "./tadilat-detail.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import FullPhoto from "../../../elements/full-photo";

function TadilatDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [tadilat, setTadilat] = useState();
  const [link, setLink] = useState("");
  const [fullPhotoIsOpen, setFullPhotoIsOpen] = useState(false);

  const hadleFullPhotoClicked = (activeIndex) => {
    setLink(tadilat.oldImages[activeIndex]);
    setFullPhotoIsOpen(true);
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/tadilat/${id}`)
      .then((response) => {
        setTadilat(response.data);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />
        <h2>Tadilat Listeleniyor</h2>
        <p>
          "bu işlem tadilat sayısına bağlı olarak biraz zaman alabilir sabrınız
          için teşekkürler"
        </p>
      </div>
    );
  else
    return (
      <div className="tadilat-detail">
        <div className="tadilat-header">
          <div
            className="tadilat-header-background"
            style={{
              backgroundImage: `url("https://assets.architecturaldigest.in/photos/63c94f218df6b9fdb924d9b1/16:9/w_2560%2Cc_limit/220615-KBWID_Highland_009.jpg")`,
            }}
          />
          <div className="tadilat-header-front">
            <div className="tadilat-detail-title">{tadilat.title}</div>
          </div>
        </div>
        <div className="tadilat-description">
          <h2 className="header">İlan Açıklaması</h2>
          <p
            className="description-text"
            dangerouslySetInnerHTML={{ __html: tadilat.description }}
          />
        </div>
        <div className="tadilat-images">
          {tadilat.oldImages.map((item, key) => {
            return (
              <div
                className="tadilat-image"
                onClick={() => {
                  hadleFullPhotoClicked(key);
                }}
              >
                <img src={item} key={key} />
              </div>
            );
          })}
        </div>
        {fullPhotoIsOpen && (
          <FullPhoto
            link={link}
            closeFunction={() => {
              setFullPhotoIsOpen(false);
            }}
          />
        )}
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
          <a href="tel:+905525961533" className="telefon" target="blank">
            +90 552 596 15 33
          </a>
          <hr />
          <p className="whatsapp-text">
            WhatsApp üzerinden mesajlaşarak sorularınızı dilediğiniz zaman
            iletebilir, ihtiyaç duyduğunuz hizmet ve ürünler hakkında hızla
            destek alabilir ve öğrenmek istediğiniz tüm bilgilere WhatsApp
            platformu üzerinden erişebilirsiniz.
          </p>
          <a
            className="whatsapp-link"
            href="https://wa.me/+905525961533"
            target="blank"
          >
            Whatsapp Destek
          </a>
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

export default TadilatDetail;
