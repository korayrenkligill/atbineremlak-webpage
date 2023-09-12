import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./araba-detail.css";
import { BACKEND_URL } from "../../../elements/config";
import PuffLoader from "react-spinners/PuffLoader";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../elements/toastify";
import {
  AiOutlineWhatsApp,
  AiOutlinePhone,
  AiOutlineMail,
} from "react-icons/ai";
import { TbZoomInAreaFilled } from "react-icons/tb";
import { FiTrash2 } from "react-icons/fi";
import { BsPencilSquare } from "react-icons/bs";
import { MdContacts } from "react-icons/md";
import FullPhoto from "../../../elements/full-photo";
import PhoneInput from "react-phone-input-2";
import { Helmet } from "react-helmet";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

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

function ArabaDetail({ user }) {
  const { id } = useParams();
  const navigation = useNavigate();
  const [loading, setLoading] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const [link, setLink] = useState("");
  const [fullPhotoIsOpen, setFullPhotoIsOpen] = useState(false);

  const [car, setCar] = useState(null);

  const [contactNameSurname, setContactNameSurname] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [mobileContact, setMobileContact] = useState(false);

  const [activity, setActivity] = useState("Aktif");
  const [sliderImages, setSliderImages] = useState([]);

  const hadleFullPhotoClicked = () => {
    setLink(car.images[activeIndex]);
    setFullPhotoIsOpen(true);
  };

  const handleChangeActivity = () => {
    let temp = car;
    temp.activity = activity;
    setCar(temp);
    axios.put(`${BACKEND_URL}/cars/activity/${id}`, car).then(() => {
      SuccessNotification("Durum başarıyla değiştirildi");
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const ContactObj = {
      id: uuidv4(),
      pageId: car.id,
      type: "Otomobil",
      nameSurname: contactNameSurname,
      phone: contactPhone,
    };
    axios
      .post(`${BACKEND_URL}/contacts`, ContactObj)
      .then(() => {
        SuccessNotification("İstek başarıyla gönderildi");
        navigation("/");
      })
      .catch(() => {
        ErrorNotification("Hata ile karşılaşıldı tekrar deneyiniz");
        navigation("/");
      });
  };

  const handleRemove = (id) => {
    axios.delete(`${BACKEND_URL}/cars/${id}`).then(() => {
      navigation("/otomobil/");
    });
  };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/cars/${id}`).then((response) => {
      setCar(response.data);
      setActivity(response.data.activity);
      let imageCount = response.data.images.length;

      let imagesObjectList = [];
      for (let i = 0; i < imageCount; i++) {
        let temp = {
          original: response.data.images[i],
          thumbnail: response.data.images[i],
        };
        imagesObjectList.push(temp);
      }
      setSliderImages(imagesObjectList);

      setLoading(false);
    });
  }, []);
  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />
      </div>
    );
  return (
    <div className="araba-detail-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>İlan : {car.baslik}</title>
        <meta name="author" content="Koray Renkligil" />
        <meta
          name="description"
          content="Manisa’daki en güvenilir emlakçınız! Dükkanımızda, müşterilerimize en iyi hizmeti sunmak için her zaman çalışıyoruz. Geniş portföyümüzde, her bütçeye uygun evler, daireler ve arabalar bulunmaktadır. Bize güvenebilirsiniz!"
        />
        <meta
          name="keywords"
          content={`atbineremlak, atbiner emlak, emlak, emlakçı, gayrimenkul, araba, manisa, pazarlıklı, yunusemre, yenimahalle, şehzadeler, muradiye, karaköy, ${car.marka}, ${car.seri}, ${car.model}, ${car.yil}, ${car.aracDurumu}, ${car.kasa} `}
        />
      </Helmet>
      <div className="header">
        <p className="date">{car.date}</p>
        <h2 className="title">
          {car.baslik.length < 55
            ? car.baslik
            : `${car.baslik.slice(0, 52)}...`}
        </h2>
        <p className="price">{formatNumber(car.fiyat)}₺</p>
      </div>
      <div className="columns">
        <div className="left">
          <div className="galery item">
            <ImageGallery
              items={sliderImages}
              showFullscreenButton={false}
              slideInterval={5000}
              slideDuration={300}
              onBeforeSlide={(next) => setActiveIndex(next)}
            />
            <button
              onClick={hadleFullPhotoClicked}
              className="full-photo-button"
            >
              <TbZoomInAreaFilled />
            </button>
            {fullPhotoIsOpen && (
              <FullPhoto
                link={link}
                closeFunction={() => {
                  setFullPhotoIsOpen(false);
                }}
              />
            )}
          </div>
          <div className="description item">
            <h2 className="header">İlan Açıklaması</h2>
            <p
              className="description-text"
              dangerouslySetInnerHTML={{ __html: car.aciklama }}
            ></p>
          </div>
          <div className="information item">
            <h2 className="header">Özellikler</h2>
            <div className="information-grid">
              <div className="information-item">
                <p className="information-name">İlan Tarihi</p>
                <p className="data">{car.date}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Pazarlık</p>
                <p className="data">{car.pazarlik}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Marka</p>
                <p className="data">{car.marka}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Seri</p>
                <p className="data">{car.seri}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Model</p>
                <p className="data">{car.model}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Yıl</p>
                <p className="data">{car.yil}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Yakıt Tipi</p>
                <p className="data">{car.yakit}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Vites Tipi</p>
                <p className="data">{car.vites}</p>
              </div>
              <div className="information-item">
                <p className="information-name">İlan Tipi</p>
                <p className="data">{car.aracDurumu}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Kilometre</p>
                <p className="data">{car.km}km</p>
              </div>
              <div className="information-item">
                <p className="information-name">Kasa Tipi</p>
                <p className="data">{car.kasa}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Motor Gücü</p>
                <p className="data">{car.motorGucu} hp</p>
              </div>
              <div className="information-item">
                <p className="information-name">Çekiş</p>
                <p className="data">{car.cekis}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Renk</p>
                <p className="data">{car.renk}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Takas</p>
                <p className="data">{car.takas}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Ağır Hasar</p>
                <p className="data">{car.agirHasarli}</p>
              </div>
            </div>
          </div>
          <div className="features item">
            {(car.guvenlik.length > 0 ||
              car.icDonanim.length > 0 ||
              car.disDonanim.length > 0 ||
              car.multimedya.length > 0) && (
              <h2 className="header">Ek Özellikler</h2>
            )}
            {car.guvenlik.length > 0 && (
              <div className="inner-item">
                <h2 className="inner-header">Güvenlik</h2>
                <div className="inner-item-elements">
                  {car.guvenlik.map((item, key) => {
                    return (
                      <p className="inner-item-element" key={key}>
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {car.icDonanim.length > 0 && (
              <div className="inner-item">
                <h2 className="inner-header">İç Donanım</h2>
                <div className="inner-item-elements">
                  {car.icDonanim.map((item, key) => {
                    return (
                      <p className="inner-item-element" key={key}>
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {car.disDonanim.length > 0 && (
              <div className="inner-item">
                <h2 className="inner-header">Dış Donanım</h2>
                <div className="inner-item-elements">
                  {car.disDonanim.map((item, key) => {
                    return (
                      <p className="inner-item-element" key={key}>
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {car.multimedya.length > 0 && (
              <div className="inner-item">
                <h2 className="inner-header">Multimedya</h2>
                <div className="inner-item-elements">
                  {car.multimedya.map((item, key) => {
                    return (
                      <p className="inner-item-element" key={key}>
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {/* ADMİNLER İÇİN AÇILACAK  <div className="details item">
            <p className="id">id: {car.id}</p>
            <p className="view-count">görüntülenme: 302</p>
          </div> */}
        </div>
        <div className="right">
          <div className={`admin-buttons ${user === null && "hide"}`}>
            <h2>EYLEMLER</h2>
            <div>
              <button
                onClick={() => {
                  navigation("/admin/otomobil/edit/" + car.id);
                }}
              >
                <BsPencilSquare className="icon" /> İlanı düzenle
              </button>
              <button
                onClick={() => {
                  handleRemove(car.id);
                }}
              >
                <FiTrash2 className="icon" /> İlanı kaldır
              </button>
            </div>
            <h2>İLAN DURUMU</h2>
            <select
              value={activity}
              onChange={(e) => {
                setActivity(e.target.value);
              }}
            >
              <option value={"Aktif"}>Aktif</option>
              <option value={"Deaktif"}>Deaktif</option>
            </select>
            <button onClick={handleChangeActivity}>Gönder</button>
          </div>
          {user !== null && (
            <div className="advertiser">
              <p>
                <span>İsim:</span> {car.advertiserName}
              </p>
              <p>
                <span>Soyisim:</span> {car.advertiserSurname}
              </p>
              <p>
                <span>Numara:</span> {car.advertiserPhone}
              </p>
              <p>
                <span>Not:</span> {car.advertiserNote}
              </p>
            </div>
          )}
          <div className="owner">
            <h2>İletişime geç</h2>
            <div className="owner-informations">
              <div className="owner-informations-frame">
                <img src={car.user.profile} alt="" />
              </div>
              <div>
                <p>
                  {car.user.name} {car.user.surname}
                </p>
                <p>Satış Uzmanı</p>
              </div>
            </div>
            <div className="communication-buttons">
              <a
                href={`https://wa.me/${car.user.phone}/?text=Merhabalar https://atbineremlak.com/araba/${car.id} bu araba hakkında iletişim kurmak istiyorum`}
                target="blank"
              >
                <AiOutlineWhatsApp className="icon" /> <span>Mesaj</span>
              </a>
              <a href={`tel:${car.user.phone}`}>
                <AiOutlinePhone className="icon" /> <span>Ara</span>
              </a>
              <a href={`mailto:${car.user.email}`}>
                <AiOutlineMail className="icon" /> <span>Mail</span>
              </a>
            </div>
          </div>
          <div className="contact-info">
            <h2>Biz Sizi Arayalım</h2>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <label htmlFor="contact-form-name-surname">Ad Soyad</label>
              <input
                type="text"
                placeholder="Ad Soyad"
                value={contactNameSurname}
                onChange={(e) => {
                  setContactNameSurname(e.target.value);
                }}
              />
              <label htmlFor="contact-form-name-surname">Numara</label>
              <PhoneInput
                country={"tr"}
                value={contactPhone}
                onChange={(phone) => setContactPhone(phone)}
              />
              <button type="submit">Gönder</button>
            </form>
          </div>
        </div>
      </div>
      <div className="mobile-contact">
        <MdContacts
          onClick={() => {
            setMobileContact(!mobileContact);
          }}
        />
        <div className={`contact-buttons ${mobileContact ? "show" : "hide"}`}>
          <a
            href={`https://wa.me/${car.user.phone}/?text=Merhabalar http://localhost:3000/araba/${car.id} bu araç hakkında iletişim kurmak istiyorum`}
            target="blank"
          >
            <AiOutlineWhatsApp className="icon" />
          </a>
          <a href={`tel:${car.user.phone}`}>
            <AiOutlinePhone className="icon" />
          </a>
          <a href={`mailto:${car.user.email}`}>
            <AiOutlineMail className="icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ArabaDetail;
