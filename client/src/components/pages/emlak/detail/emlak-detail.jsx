import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./emlak-detail.css";
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
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { TbZoomInAreaFilled } from "react-icons/tb";
import { FiTrash2 } from "react-icons/fi";
import { BsPencilSquare } from "react-icons/bs";
import { MdContacts } from "react-icons/md";
import Slider from "react-slick";
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

function EmlakDetail({ user }) {
  const { id } = useParams();
  const navigation = useNavigate();
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [coefficient, setCoefficient] = useState(0);
  const [maxCoefficient, setMaxCoefficient] = useState(0);
  const [maxCoefficientList, setMaxCoefficientList] = useState([]);
  const [link, setLink] = useState("");
  const [fullPhotoIsOpen, setFullPhotoIsOpen] = useState(false);

  const [realEstate, setRealEstate] = useState();

  const [contactNameSurname, setContactNameSurname] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [mobileContact, setMobileContact] = useState(false);

  const [activity, setActivity] = useState("Aktif");
  const [sliderImages, setSliderImages] = useState([]);

  const hadleFullPhotoClicked = () => {
    setLink(realEstate.images[activeIndex]);
    setFullPhotoIsOpen(true);
  };

  // const settings = {
  //   infinite: true,
  //   fade: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   dots: false,
  //   beforeChange: (current, next) => {
  //     if (next >= 0 && next < 5) {
  //       setCoefficient(0);
  //     } else if (next >= 5 && next < 10) {
  //       setCoefficient(1);
  //     } else if (next >= 10 && next < 15) {
  //       setCoefficient(2);
  //     } else if (next >= 15 && next < 20) {
  //       setCoefficient(3);
  //     } else {
  //       setCoefficient(4);
  //     }
  //     setActiveIndex(next);
  //   },
  // };

  const handleChangeActivity = () => {
    let temp = realEstate;
    temp.activity = activity;
    setRealEstate(temp);
    axios
      .put(`${BACKEND_URL}/real-estates/activity/${id}`, realEstate)
      .then(() => {
        SuccessNotification("Durum başarıyla değiştirildi");
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const ContactObj = {
      id: uuidv4(),
      pageId: realEstate.id,
      type: "Konut",
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
    axios.delete(`${BACKEND_URL}/real-estates/${id}`).then(() => {
      navigation("/");
    });
  };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/real-estates/${id}`).then((response) => {
      setRealEstate(response.data);
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

      // setMaxCoefficientList(list);
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
    <div className="emlak-detail-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>İlan : {realEstate.title}</title>
        <meta name="author" content="Koray Renkligil" />
        <meta
          name="description"
          content="Manisa’daki en güvenilir emlakçınız! Dükkanımızda, müşterilerimize en iyi hizmeti sunmak için her zaman çalışıyoruz. Geniş portföyümüzde, her bütçeye uygun evler, daireler ve arabalar bulunmaktadır. Bize güvenebilirsiniz!"
        />
        <meta
          name="keywords"
          content={`atbineremlak, atbiner emlak, emlak, emlakçı, gayrimenkul, ev, daire, konut, manisa, pazarlıklı, ${realEstate.ilce}, ${realEstate.mahalle}, ${realEstate.type}, ${realEstate.roomCount}`}
        />
      </Helmet>
      <div className="top-side">
        <p className="date">{realEstate.date}</p>
        <h2 className="title">
          {realEstate.title.length < 55
            ? realEstate.title
            : `${realEstate.title.slice(0, 52)}...`}
        </h2>
        <p className="price">{formatNumber(realEstate.price)}₺</p>
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
              dangerouslySetInnerHTML={{ __html: realEstate.description }}
            ></p>
          </div>
          <div className="information item">
            <h2 className="header">Özellikler</h2>
            <div className="information-grid">
              <div className="information-item">
                <p className="information-name">İlan Tarihi</p>
                <p className="data">{realEstate.date}</p>
              </div>
              <div className="information-item">
                <p className="information-name">İlan Tipi</p>
                <p className="data">{realEstate.type}</p>
              </div>
              <div className="information-item">
                <p className="information-name">m² (Brüt)</p>
                <p className="data">{realEstate.grossArea}</p>
              </div>
              <div className="information-item">
                <p className="information-name">m² (Net)</p>
                <p className="data">{realEstate.netArea}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Oda Sayısı</p>
                <p className="data">{realEstate.roomCount}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Bina Yaşı</p>
                <p className="data">{realEstate.buildAge}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Bulunduğu Kat</p>
                <p className="data">{realEstate.floor}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Kat Sayısı</p>
                <p className="data">{realEstate.totalFloor}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Isıtma</p>
                <p className="data">{realEstate.heating}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Banyo Sayısı</p>
                <p className="data">{realEstate.bathroomCount}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Balkon</p>
                <p className="data">{realEstate.balcony}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Eşyalı</p>
                <p className="data">{realEstate.furnished}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Kullanım Durumu</p>
                <p className="data">{realEstate.usingState}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Site İçerisinde</p>
                <p className="data">{realEstate.onSite}</p>
              </div>
              {realEstate.onSite !== "Hayır" && (
                <div className="information-item">
                  <p className="information-name">Site Adı</p>
                  <p className="data">{realEstate.siteName}</p>
                </div>
              )}
              <div className="information-item">
                <p className="information-name">Aidat (TL)</p>
                <p className="data">{realEstate.dues}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Krediye Uygun</p>
                <p className="data">{realEstate.suitableForCredit}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Tapu Durumu</p>
                <p className="data">{realEstate.titleStatus}</p>
              </div>
              <div className="information-item">
                <p className="information-name">Takas</p>
                <p className="data">{realEstate.swap}</p>
              </div>
            </div>
          </div>
          <div className="features item">
            {(realEstate.cephe.length > 0 ||
              realEstate.icOzellikler.length > 0 ||
              realEstate.disOzellikler.length > 0 ||
              realEstate.muhit.length > 0 ||
              realEstate.ulasim.length > 0 ||
              realEstate.manzara.length > 0 ||
              realEstate.konutTipi.length > 0) && (
              <h2 className="header">Ek Özellikler</h2>
            )}
            {realEstate.cephe.length > 0 && (
              <div className="inner-item">
                <h2 className="inner-header">Cephe</h2>
                <div className="inner-item-elements">
                  {realEstate.cephe.map((item, key) => {
                    return (
                      <p className="inner-item-element" key={key}>
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {realEstate.icOzellikler.length > 0 && (
              <div className="inner-item">
                <h2 className="inner-header">İç Özellikler</h2>
                <div className="inner-item-elements">
                  {realEstate.icOzellikler.map((item, key) => {
                    return (
                      <p className="inner-item-element" key={key}>
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {realEstate.disOzellikler.length > 0 && (
              <div className="inner-item">
                <h2 className="inner-header">Dış Özellikler</h2>
                <div className="inner-item-elements">
                  {realEstate.disOzellikler.map((item, key) => {
                    return (
                      <p className="inner-item-element" key={key}>
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {realEstate.muhit.length > 0 && (
              <div className="inner-item">
                <h2 className="inner-header">Muhit</h2>
                <div className="inner-item-elements">
                  {realEstate.muhit.map((item, key) => {
                    return (
                      <p className="inner-item-element" key={key}>
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {realEstate.ulasim.length > 0 && (
              <div className="inner-item">
                <h2 className="inner-header">Ulaşım</h2>
                <div className="inner-item-elements">
                  {realEstate.ulasim.map((item, key) => {
                    return (
                      <p className="inner-item-element" key={key}>
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {realEstate.manzara.length > 0 && (
              <div className="inner-item">
                <h2 className="inner-header">Manzara</h2>
                <div className="inner-item-elements">
                  {realEstate.manzara.map((item, key) => {
                    return (
                      <p className="inner-item-element" key={key}>
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {realEstate.konutTipi.length > 0 && (
              <div className="inner-item">
                <h2 className="inner-header">Konut Tipi</h2>
                <div className="inner-item-elements">
                  {realEstate.konutTipi.map((item, key) => {
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
        </div>
        <div className="right">
          <div className={`admin-buttons ${user === null && "hide"}`}>
            <h2>EYLEMLER</h2>
            <div>
              <button
                onClick={() => {
                  navigation("/admin/konut/edit/" + realEstate.id);
                }}
              >
                <BsPencilSquare className="icon" /> İlanı düzenle
              </button>
              <button
                onClick={() => {
                  handleRemove(realEstate.id);
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
                <span>İsim:</span> {realEstate.advertiserName}
              </p>
              <p>
                <span>Soyisim:</span> {realEstate.advertiserSurname}
              </p>
              <p>
                <span>Numara:</span> {realEstate.advertiserPhone}
              </p>
              <p>
                <span>Not:</span> {realEstate.advertiserNote}
              </p>
            </div>
          )}
          <div className="owner">
            <h2>İletişime geç</h2>
            <div className="owner-informations">
              <div className="owner-informations-frame">
                <img src={realEstate.user.profile} alt="" />
              </div>
              <div>
                <p>
                  {realEstate.user.name} {realEstate.user.surname}
                </p>
                <p>Satış Uzmanı</p>
              </div>
            </div>
            <div className="communication-buttons">
              <a
                href={`https://wa.me/${realEstate.user.phone}/?text=Merhabalar https://atbineremlak.com/konut/${realEstate.id} bu konut hakkında iletişim kurmak istiyorum`}
                target="_blank"
              >
                <AiOutlineWhatsApp className="icon" /> <span>Mesaj</span>
              </a>
              <a href={`tel:${realEstate.user.phone}`}>
                <AiOutlinePhone className="icon" /> <span>Ara</span>
              </a>
              <a href={`mailto:${realEstate.user.email}`}>
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
            href={`https://wa.me/${realEstate.user.phone}/?text=Merhabalar http://localhost:3000/konut/${realEstate.id} bu konut hakkında iletişim kurmak istiyorum`}
            target="_blank"
          >
            <AiOutlineWhatsApp className="icon" />
          </a>
          <a href={`tel:${realEstate.user.phone}`}>
            <AiOutlinePhone className="icon" />
          </a>
          <a href={`mailto:${realEstate.user.email}`}>
            <AiOutlineMail className="icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default EmlakDetail;
