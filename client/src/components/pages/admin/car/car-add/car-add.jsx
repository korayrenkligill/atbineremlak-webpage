import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import ReactQuill from "react-quill";
import YouTube from "react-youtube";
import "./cat-add.css";

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

function CarAdd() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  const [videoId, setVideoId] = useState("");

  const [content, setContent] = useState("");

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
  return (
    <div className="car-add">
      <h1 className="admin-title">Otomobil İlanı Ekle</h1>
      <div className="car-add-form">
        <div className="image-video-buttons">
          <button
            className={imageOrVideo === "image" ? "active" : ""}
            onClick={() => {
              setImageOrVideo("image");
            }}
          >
            Resimler
          </button>
          <button
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
            className="clear-all-images-button"
            onClick={() => {
              setSelectedImages([]);
            }}
          >
            <BsFillTrash3Fill className="icon" /> Tüm resimleri kaldır
          </button>
        ) : (
          <button className="clear-all-images-button">
            <BsFillTrash3Fill className="icon" /> Videoyu kaldır
          </button>
        )}
        <div className="title form-element">
          <label htmlFor="">İlan başlığı</label>
          <input type="text" placeholder="ilan başlığı giriniz.." />
        </div>
        <div className="description form-element">
          <label htmlFor="">
            İlan Açıklaması <span className="optional">( Opsiyonel )</span>
          </label>
          <ReactQuill
            value={content}
            onChange={handleChange}
            placeholder="İlan açıklaması giriniz.."
          />
        </div>
        <div className="floor form-element">
          <label htmlFor="">Fiyat</label>
          <input type="number" placeholder="İlan fiyatı.." />
        </div>
        <div className="Type form-element">
          <label htmlFor="">Pazarlık</label>
          <select>
            <option value="Test">Var</option>
            <option value="Test">Yok</option>
          </select>
        </div>
        <div className="Type form-element">
          <label htmlFor="">Marka</label>
          <select>
            {otomobilModelleri.map((marka, key) => {
              return <option value={marka}>{marka}</option>;
            })}
          </select>
        </div>
        <div className="floor form-element">
          <label htmlFor="">Seri</label>
          <input type="text" placeholder="seri.." />
        </div>
        <div className="floor form-element">
          <label htmlFor="">Model</label>
          <input type="text" placeholder="model.." />
        </div>
        <div className="floor form-element">
          <label htmlFor="">Yıl</label>
          <input type="number" placeholder="yıl.." />
        </div>
        <div className="heating form-element">
          <label htmlFor="">Yakıt</label>
          <select>
            <option value="">Benzin</option>
            <option value="">Benzin & LPG</option>
            <option value="">Dizel</option>
            <option value="">Hybrid</option>
            <option value="">Elektrik</option>
          </select>
        </div>
        <div className="heating form-element">
          <label htmlFor="">Vites</label>
          <select>
            <option value="">Manuel</option>
            <option value="">Otomatik</option>
          </select>
        </div>
        <div className="heating form-element">
          <label htmlFor="">Araç Durumu</label>
          <select>
            <option value="">İkinci El</option>
            <option value="">Yurtdışından İthal Sıfır</option>
            <option value="">Sıfır</option>
          </select>
        </div>
        <div className="floor form-element">
          <label htmlFor="">KM</label>
          <input type="number" placeholder="km.." />
        </div>
        <div className="takas form-element">
          <label htmlFor="">Kasa Tipi</label>
          <select>
            <option value="">Cabrio</option>
            <option value="">Coupe</option>
            <option value="">Hatchback</option>
            <option value="">Sedan</option>
            <option value="">Station Wagon</option>
            <option value="">MPV</option>
            <option value="">Roadster</option>
          </select>
        </div>
        <div className="takas form-element">
          <label htmlFor="">Motor Gücü</label>
          <input type="number" placeholder="motor gücü.." />
        </div>
        <div className="takas form-element">
          <label htmlFor="">Motor Hacmi</label>
          <input type="text" placeholder="motor hacmi.." />
        </div>
        <div className="takas form-element">
          <label htmlFor="">Çekiş</label>
          <select>
            <option value="">Önden Çekiş</option>
            <option value="">Arkadan İtiş</option>
            <option value="">4WD (Sürekli)</option>
            <option value="">AWD (Elektronik)</option>
          </select>
        </div>
        <div className="takas form-element">
          <label htmlFor="">Renk</label>
          <input type="text" placeholder="renk.." />
        </div>
        <div className="takas form-element">
          <label htmlFor="">Ağır Hasar Kayıtlı</label>
          <select>
            <option>Hayır</option>
            <option>Evet</option>
          </select>
        </div>
        <div className="takas form-element">
          <label htmlFor="">Takas</label>
          <select>
            <option value="">Evet</option>
            <option value="">Hayır</option>
          </select>
        </div>
        <button className="submit-button">Ekle</button>
        <p className="error-text">Error Text!</p>
      </div>
    </div>
  );
}

export default CarAdd;
