import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import ReactQuill from "react-quill";
import YouTube from "react-youtube";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../../elements/toastify";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../../elements/config";
import "./car-add.css";

const otomobilModelleri = [
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

const getVideoIdFromUrl = (url) => {
  const videoIdRegex = /[?&]v=([^?&]+)/;
  const match = url.match(videoIdRegex);
  if (match && match[1]) {
    return match[1];
  } else {
    return null; // Geçersiz URL
  }
};

const getNowDate = () => {
  const date = new Date();
  let realEstateDate = "";
  let minute = date.getMinutes().toString();
  if (minute.length < 2) {
    minute = "0" + minute;
  }
  let hour = date.getHours().toString();
  if (hour.length < 2) {
    hour = "0" + hour;
  }
  let day = date.getDate().toString();
  if (day.length < 2) {
    day = "0" + day;
  }
  const month = date.getMonth();
  let monthString = "";
  switch (month) {
    case 0:
      monthString = "Ocak";
      break;
    case 1:
      monthString = "Şubat";
      break;
    case 2:
      monthString = "Mart";
      break;
    case 3:
      monthString = "Nisan";
      break;
    case 4:
      monthString = "Mayıs";
      break;
    case 5:
      monthString = "Haziran";
      break;
    case 6:
      monthString = "Temmuz";
      break;
    case 7:
      monthString = "Ağustos";
      break;
    case 8:
      monthString = "Eylül";
      break;
    case 9:
      monthString = "Ekim";
      break;
    case 10:
      monthString = "Kasım";
      break;
    case 11:
      monthString = "Aralık";
      break;
    default:
      monthString = "Belirtilmedi";
      break;
  }
  let year = date.getFullYear();

  return `${minute}:${hour} - ${day} ${monthString} ${year}`;
};

function CarAdd({ user }) {
  const navigation = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  const [videoId, setVideoId] = useState("");

  const [baslik, setBaslik] = useState("");
  const [content, setContent] = useState("");
  const [fiyat, setFiyat] = useState(0);
  const [pazarlik, setPazarlik] = useState("Var");
  const [marka, setMarka] = useState("Audi");
  const [seri, setSeri] = useState("");
  const [model, setModel] = useState("");
  const [yil, setYil] = useState(0);
  const [yakit, setYakit] = useState("Benzin");
  const [vites, setVites] = useState("Manuel");
  const [aracDurumu, setAracDurumu] = useState("İkinci El");
  const [km, setKm] = useState(0);
  const [kasa, setKasa] = useState("Cabrio");
  const [motorGucu, setMotorGucu] = useState(0);
  const [motorHacmi, setMotorHacmi] = useState("");
  const [cekis, setCekis] = useState("Önden Çekiş");
  const [renk, setRenk] = useState("");
  const [agirHasarli, setAgirHasarli] = useState("Hayır");
  const [takas, setTakas] = useState("Hayır");
  const [advertiserName, setAdvertiserName] = useState("");
  const [advertiserSurname, setAdvertiserSurname] = useState("");
  const [advertiserPhone, setAdvertiserPhone] = useState("");

  const [imageOrVideo, setImageOrVideo] = useState("image");

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files;
    for (let i = 0; i < file.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(file[i]);

      reader.onload = () => {
        setSelectedImages((oldArray) => [...oldArray, reader.result]);
      };
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files;
    if (file.length + selectedImages.length < 21) {
      for (let i = 0; i < file.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(file[i]);
        reader.onload = () => {
          setSelectedImages((oldArray) => [...oldArray, reader.result]);
        };
      }
    } else {
      alert("En fazla 25 resim yükleyebilirsin!");
    }
  };

  const handleFileInputChangeSingle = (e, key) => {
    const file = e.target.files[0];
    const imagesArray = [...selectedImages];
    console.log(key);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        imagesArray[key] = reader.result;
        setSelectedImages(imagesArray);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClearFileInputSingle = (key) => {
    const imagesArray = [...selectedImages];
    const newArray = [];
    for (let i = 0; i < imagesArray.length; i++)
      if (i !== key) newArray.push(imagesArray[i]);
    setSelectedImages(newArray);
  };

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let error = false;
    if (selectedImages.length < 1) {
      ErrorNotification("En az 1 resim seçmelisin");
      error = true;
    }
    if (baslik.length < 5) {
      ErrorNotification("Daha uzun bir ilan başlığı girmelisin");
      error = true;
    }
    if (fiyat === 0) {
      ErrorNotification("0 Fiyat etiketi girilemez");
      error = true;
    }
    if (yil === 0) {
      ErrorNotification("Araba yılı 0 olarak girilemez");
      error = true;
    }
    if (advertiserName.length <= 0) {
      ErrorNotification("İlan sahibi adı boş bırakılamaz");
      error = true;
    }
    if (advertiserSurname.length <= 0) {
      ErrorNotification("İlan sahibi soyadı boş bırakılamaz");
      error = true;
    }
    if (advertiserPhone.length !== 10) {
      ErrorNotification("İlan sahibi numarası boş veya hatalı");
      error = true;
    }
    if (!error) {
      const newCar = {
        id: uuidv4(),
        baslik: baslik,
        aciklama: content.length === 0 ? "Bir açıklama belirtilmedi!" : content,
        fiyat: fiyat,
        pazarlik: pazarlik,
        marka: marka,
        seri: seri,
        model: model,
        yil: yil,
        yakit: yakit,
        vites: vites,
        aracDurumu: aracDurumu,
        km: km,
        kasa: kasa,
        motorGucu: motorGucu,
        motorHacmi: motorHacmi,
        cekis: cekis,
        renk: renk,
        agirHasarli: agirHasarli,
        takas: takas,
        date: getNowDate(),
        user: user,
        advertiserName: advertiserName,
        advertiserSurname: advertiserSurname,
        advertiserPhone: `+90${advertiserPhone}`,
        images: selectedImages,
        youtubeId: videoId,
      };
      axios
        .post(`${BACKEND_URL}/cars`, newCar)
        .then((response) => console.log(response))
        .then(() => {
          SuccessNotification("İlan başarıyla eklendi");
          navigation("/admin/otomobiller/");
        });
    }
  };
  return (
    <div className="car-add">
      <h1 className="admin-title">Otomobil İlanı Ekle</h1>
      <form className="car-add-form" onSubmit={handleSubmit}>
        <div className="image-video-buttons">
          <button
            type="button"
            className={imageOrVideo === "image" ? "active" : ""}
            onClick={() => {
              setImageOrVideo("image");
            }}
          >
            Resimler
          </button>
          <button
            type="button"
            className={imageOrVideo === "video" ? "active" : ""}
            onClick={() => {
              setImageOrVideo("video");
            }}
          >
            Video
          </button>
        </div>
        {imageOrVideo === "image" ? (
          <div className="images-list">
            {selectedImages.map((item, key) => {
              return (
                <label htmlFor={`image-selector-single-${key}`} key={key}>
                  <div className="frame">
                    <img src={item} alt={`image_${key}`} />
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => {
                        handleClearFileInputSingle(key);
                      }}
                    >
                      <BsFillTrash3Fill className="icon" />
                    </button>
                  </div>
                  <input
                    id={`image-selector-single-${key}`}
                    type="file"
                    accept="image/*"
                    multiple={true}
                    onChange={(e) => {
                      handleFileInputChangeSingle(e, key);
                    }}
                    style={{ display: "none" }}
                  />
                </label>
              );
            })}
            <label
              htmlFor="image-selector"
              className="image-uploader drop-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="placeholder">
                <BiImageAdd className="icon" />
                <span>Bir resim sürükle veya seç</span>
              </div>
              <input
                id="image-selector"
                type="file"
                accept="image/*"
                multiple={true}
                onChange={handleFileInputChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
        ) : (
          <div className="video-container">
            {videoId.length > 0 ? (
              <YouTube className="video-player" videoId={videoId} />
            ) : (
              <div>Video adresi giriniz</div>
            )}
            <div className="input-container">
              <input
                type="text"
                value={videoLink}
                onChange={(e) => {
                  setVideoLink(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setVideoId(getVideoIdFromUrl(videoLink));
                }}
              >
                +
              </button>
            </div>
          </div>
        )}

        {imageOrVideo === "image" ? (
          <button
            type="button"
            className="clear-all-images-button"
            onClick={() => {
              setSelectedImages([]);
            }}
          >
            <BsFillTrash3Fill className="icon" /> Tüm resimleri kaldır
          </button>
        ) : (
          <button type="button" className="clear-all-images-button">
            <BsFillTrash3Fill className="icon" /> Videoyu kaldır
          </button>
        )}
        <div className="title form-element">
          <label htmlFor="car-add-form-title">İlan başlığı</label>
          <input
            value={baslik}
            onChange={(e) => {
              setBaslik(e.target.value);
            }}
            id="car-add-form-title"
            type="text"
            placeholder="ilan başlığı giriniz.."
          />
        </div>
        <div className="description form-element">
          <label htmlFor="car-add-form-description">
            İlan Açıklaması <span className="optional">( Opsiyonel )</span>
          </label>
          <ReactQuill
            value={content}
            onChange={handleChange}
            placeholder="İlan açıklaması giriniz.."
          />
        </div>
        <div className="floor form-element">
          <label htmlFor="car-add-form-price">Fiyat</label>
          <input
            value={fiyat}
            onChange={(e) => {
              setFiyat(e.target.value);
            }}
            id="car-add-form-price"
            type="number"
            placeholder="İlan fiyatı.."
          />
        </div>
        <div className="Type form-element">
          <label htmlFor="car-add-form-pazarlik">Pazarlık</label>
          <select
            id="car-add-form-pazarlik"
            value={pazarlik}
            onChange={(e) => {
              setPazarlik(e.target.value);
            }}
          >
            <option value="Var">Var</option>
            <option value="Yok">Yok</option>
          </select>
        </div>
        <div className="Type form-element">
          <label htmlFor="car-add-form-marka">Marka</label>
          <select
            id="car-add-form-marka"
            value={marka}
            onChange={(e) => {
              setMarka(e.target.value);
            }}
          >
            {otomobilModelleri.map((marka, key) => {
              return (
                <option value={marka} key={key}>
                  {marka}
                </option>
              );
            })}
          </select>
        </div>
        <div className="floor form-element">
          <label htmlFor="car-add-form-seri">Seri</label>
          <input
            value={seri}
            onChange={(e) => {
              setSeri(e.target.value);
            }}
            id="car-add-form-seri"
            type="text"
            placeholder="seri.."
          />
        </div>
        <div className="floor form-element">
          <label htmlFor="car-add-form-model">Model</label>
          <input
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
            }}
            id="car-add-form-model"
            type="text"
            placeholder="model.."
          />
        </div>
        <div className="floor form-element">
          <label htmlFor="car-add-form-yil">Yıl</label>
          <input
            value={yil}
            onChange={(e) => {
              setYil(e.target.value);
            }}
            id="car-add-form-yil"
            type="number"
            placeholder="yıl.."
          />
        </div>
        <div className="heating form-element">
          <label htmlFor="car-add-form-yakit">Yakıt</label>
          <select
            value={yakit}
            onChange={(e) => {
              setYakit(e.target.value);
            }}
            id="car-add-form-yakit"
          >
            <option value="Benzin">Benzin</option>
            <option value="Benzin & LPG">Benzin & LPG</option>
            <option value="Dizel">Dizel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Elektrik">Elektrik</option>
          </select>
        </div>
        <div className="heating form-element">
          <label htmlFor="car-add-form-vites">Vites</label>
          <select
            value={vites}
            onChange={(e) => {
              setVites(e.target.value);
            }}
            id="car-add-form-vites"
          >
            <option value="Manuel">Manuel</option>
            <option value="Otomatik">Otomatik</option>
          </select>
        </div>
        <div className="heating form-element">
          <label htmlFor="car-add-form-arac-durumu">Araç Durumu</label>
          <select
            value={aracDurumu}
            onChange={(e) => {
              setAracDurumu(e.target.value);
            }}
            id="car-add-form-arac-durumu"
          >
            <option value="İkinci El">İkinci El</option>
            <option value="Yurtdışından İthal Sıfır">
              Yurtdışından İthal Sıfır
            </option>
            <option value="Sıfır">Sıfır</option>
          </select>
        </div>
        <div className="floor form-element">
          <label htmlFor="car-add-form-km">KM</label>
          <input
            value={km}
            onChange={(e) => {
              setKm(e.target.value);
            }}
            id="car-add-form-km"
            type="number"
            placeholder="km.."
          />
        </div>
        <div className="takas form-element">
          <label htmlFor="car-add-form-kasa-tipi">Kasa Tipi</label>
          <select
            value={kasa}
            onChange={(e) => {
              setKasa(e.target.value);
            }}
            id="car-add-form-kasa-tipi"
          >
            <option value="Cabrip">Cabrio</option>
            <option value="Coupe">Coupe</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="Station Wagon">Station Wagon</option>
            <option value="MPV">MPV</option>
            <option value="Roadster">Roadster</option>
          </select>
        </div>
        <div className="takas form-element">
          <label htmlFor="car-add-form-motor-gucu">Motor Gücü</label>
          <input
            value={motorGucu}
            onChange={(e) => {
              setMotorGucu(e.target.value);
            }}
            id="car-add-form-motor-gucu"
            type="number"
            placeholder="motor gücü.."
          />
        </div>
        <div className="takas form-element">
          <label htmlFor="car-add-form-motor-hacmi">Motor Hacmi</label>
          <input
            value={motorHacmi}
            onChange={(e) => {
              setMotorHacmi(e.target.value);
            }}
            id="car-add-form-motor-hacmi"
            type="text"
            placeholder="motor hacmi.."
          />
        </div>
        <div className="takas form-element">
          <label htmlFor="car-add-form-cekis">Çekiş</label>
          <select
            value={cekis}
            onChange={(e) => {
              setCekis(e.target.value);
            }}
            id="car-add-form-cekis"
          >
            <option value="Önden Çekiş">Önden Çekiş</option>
            <option value="Arkadan İtiş">Arkadan İtiş</option>
            <option value="4WD (Sürekli)">4WD (Sürekli)</option>
            <option value="AWD (Elektronik)">AWD (Elektronik)</option>
          </select>
        </div>
        <div className="takas form-element">
          <label htmlFor="car-add-form-renk">Renk</label>
          <input
            value={renk}
            onChange={(e) => {
              setRenk(e.target.value);
            }}
            id="car-add-form-renk"
            type="text"
            placeholder="renk.."
          />
        </div>
        <div className="takas form-element">
          <label htmlFor="car-add-form-agir-hasarli">Ağır Hasar Kayıtlı</label>
          <select
            value={agirHasarli}
            onChange={(e) => {
              setAgirHasarli(e.target.value);
            }}
            id="car-add-form-agir-hasarli"
          >
            <option value="Hayır">Hayır</option>
            <option value="Evet">Evet</option>
          </select>
        </div>
        <div className="takas form-element">
          <label htmlFor="car-add-form-takas">Takas</label>
          <select
            value={takas}
            onChange={(e) => {
              setTakas(e.target.value);
            }}
            id="car-add-form-takas"
          >
            <option value="Hayır">Hayır</option>
            <option value="Evet">Evet</option>
          </select>
        </div>
        <hr />
        <div className="area form-element-double">
          <span>
            <label htmlFor="real-estate-add-form-advertiser-name">
              İlan Sahibinin Adı
            </label>
            <input
              id="real-estate-add-form-advertiser-name"
              type="text"
              placeholder="ilan sahibinin adı.."
              value={advertiserName}
              onChange={(e) => {
                setAdvertiserName(e.target.value);
              }}
            />
          </span>
          <span>
            <label htmlFor="real-estate-add-form-advertiser-surname">
              İlan Sahibinin Soyadı
            </label>
            <input
              id="real-estate-add-form-advertiser-surname"
              type="text"
              placeholder="ilan sahibinin soyadı.."
              value={advertiserSurname}
              onChange={(e) => {
                setAdvertiserSurname(e.target.value);
              }}
            />
          </span>
        </div>
        <div className="side-adi form-element">
          <label htmlFor="real-estate-add-form-advertiser-phone">
            İlan sahibinin numarası
            <span className="optional">( 5554443322 )</span>
          </label>
          <input
            id="real-estate-add-form-advertiser-phone"
            type="text"
            placeholder="ilan sahibinin numarası.."
            value={advertiserPhone}
            onChange={(e) => {
              setAdvertiserPhone(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="submit-button">
          Ekle
        </button>
      </form>
    </div>
  );
}

export default CarAdd;
