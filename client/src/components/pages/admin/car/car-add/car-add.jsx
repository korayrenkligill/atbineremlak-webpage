import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { SlArrowDown } from "react-icons/sl";
import ReactQuill from "react-quill";
import YouTube from "react-youtube";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { v4 as uuidv4 } from "uuid";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../../elements/toastify";
import { useNavigate } from "react-router-dom";
import {
  BACKEND_URL,
  cloudName,
  disDonanimListesi,
  guvenlikListesi,
  icDonanimListesi,
  multimedyaListesi,
  uploadPreset,
} from "../../../../elements/config";
import PhoneInput from "react-phone-input-2";

import "./car-add.css";
import { toast } from "react-toastify";

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

const getNowDate = () => {
  const date = new Date();
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
  const [loading, setLoading] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesPreview, setSelectedImagesPreview] = useState([]);

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
  const [advertiserNote, setAdvertiserNote] = useState("");
  const [guvenlik, setGuvenlik] = useState([]);
  const [icDonanim, setIcDonanim] = useState([]);
  const [disDonanim, setDisDonanim] = useState([]);
  const [multimedya, setMultimedya] = useState([]);

  const [guvenlikIsOpen, setGuvenlikIsOpen] = useState(true);
  const [icDonanimIsOpen, setIcDonanimIsOpen] = useState(false);
  const [disDonanimIsOpen, setDisDonanimIsOpen] = useState(false);
  const [multimedyaIsOpen, setMultimedyaIsOpen] = useState(false);

  const [imageOrVideo, setImageOrVideo] = useState("image");

  const imagesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const [currentImages, setCurrentImages] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([1]);

  const showPeginate = (list, page = 1) => {
    const indexOfLastImage = page * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImagesTemp = list.slice(indexOfFirstImage, indexOfLastImage);
    setCurrentImages(currentImagesTemp);
    const pageNumbersTemp = [];
    // console.log(
    //   list.length,
    //   imagesPerPage,
    //   list.length / imagesPerPage,
    //   Math.ceil(list.length / imagesPerPage)
    // );
    for (let i = 1; i <= Math.ceil(list.length / imagesPerPage); i++) {
      pageNumbersTemp.push(i);
      if (i === Math.ceil(list.length / imagesPerPage)) {
        console.log(pageNumbersTemp);
        setPageNumbers(pageNumbersTemp);
      }
    }
    setCurrentPage(page);
  };
  const paginate = (pageNumber) => {
    var listTemp = selectedImagesPreview;
    showPeginate(listTemp, pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files;
    if (file.length + selectedImages.length < 26) {
      setSelectedImages((oldArray) => [...oldArray, ...file]);
      var list2Temp = [];
      var selectedImagesPreviewTemp = selectedImagesPreview;
      for (let i = 0; i < file.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(file[i]);

        reader.onload = () => {
          setSelectedImagesPreview((oldArray) => [...oldArray, reader.result]);
          list2Temp.push(reader.result);
          if (i === file.length - 1) {
            //Döngü sonunda
            var listTemp = selectedImagesPreviewTemp.concat(list2Temp);
            showPeginate(listTemp);
          }
        };
        toast.success("Resimler başarıyla yüklendi", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      ErrorNotification("En fazla 25 resim yükleyebilirsin!");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files;
    if (file.length + selectedImages.length < 26) {
      setSelectedImages((oldArray) => [...oldArray, ...file]);
      var list2Temp = [];
      var selectedImagesPreviewTemp = selectedImagesPreview;
      for (let i = 0; i < file.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(file[i]);
        reader.onload = () => {
          setSelectedImagesPreview((oldArray) => [...oldArray, reader.result]);
          list2Temp.push(reader.result);
          if (i === file.length - 1) {
            //Döngü sonunda
            var listTemp = selectedImagesPreviewTemp.concat(list2Temp);
            showPeginate(listTemp);
          }
        };
        toast.success("Resimler başarıyla yüklendi", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      ErrorNotification("En fazla 25 resim yükleyebilirsin!");
    }
  };

  const handleFileInputChangeSingle = (e, key) => {
    const file = e.target.files[0];
    const imagesPreviewArray = [...selectedImagesPreview];
    const imagesArray = [...selectedImages];
    if (file && file.type.startsWith("image/")) {
      imagesArray[key] = file;
      setSelectedImages(imagesArray);
      const reader = new FileReader();
      reader.onload = () => {
        imagesPreviewArray[key] = reader.result;
        setSelectedImagesPreview(imagesPreviewArray);
        showPeginate(imagesPreviewArray);
        toast.success("Resim başarıyla değiştirildi", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClearFileInputSingle = (key) => {
    const imagesPreviewArray = [...selectedImagesPreview];
    const imagesArray = [...selectedImages];
    const newArrayPreview = [];
    const newArray = [];
    for (let i = 0; i < imagesArray.length; i++)
      if (i !== key) {
        newArrayPreview.push(imagesPreviewArray[i]);
        newArray.push(imagesArray[i]);
      }
    setSelectedImagesPreview(newArrayPreview);
    setSelectedImages(newArray);
    showPeginate(newArrayPreview);
    toast.success("Resim başarıyla kaldırıldı", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let error = false;
    let newNumber = "";
    setLoading(true);

    if (selectedImages.length < 1) {
      ErrorNotification("En az 1 resim seçmelisin");
      error = true;
      setLoading(false);
    }
    if (baslik.length < 5) {
      ErrorNotification("Daha uzun bir ilan başlığı girmelisin");
      error = true;
      setLoading(false);
    }
    if (fiyat === 0) {
      ErrorNotification("0 Fiyat etiketi girilemez");
      error = true;
      setLoading(false);
    }
    if (yil === 0) {
      ErrorNotification("Araba yılı 0 olarak girilemez");
      error = true;
      setLoading(false);
    }
    if (advertiserPhone.length !== 12 && advertiserPhone.length !== 0) {
      ErrorNotification("Doğru bir numara girişi yapılmadı");
      error = true;
      setLoading(false);
    } else {
      newNumber = "+" + advertiserPhone;
    }
    if (!error) {
      const formData = new FormData();
      formData.append("id", uuidv4());
      formData.append("baslik", baslik);
      formData.append("aciklama", content);
      formData.append("fiyat", fiyat.toString());
      formData.append("pazarlik", pazarlik);
      formData.append("marka", marka);
      formData.append("seri", seri);
      formData.append("model", model);
      formData.append("yil", yil.toString());
      formData.append("yakit", yakit);
      formData.append("vites", vites);
      formData.append("aracDurumu", aracDurumu);
      formData.append("km", km.toString());
      formData.append("kasa", kasa);
      formData.append("motorGucu", motorGucu.toString());
      formData.append("mmotorHacmi", motorHacmi);
      formData.append("cekis", cekis);
      formData.append("renk", renk);
      formData.append("agirHasarli", agirHasarli);
      formData.append("takas", takas);
      formData.append("guvenlik", JSON.stringify(guvenlik));
      formData.append("icDonanim", JSON.stringify(icDonanim));
      formData.append("disDonanim", JSON.stringify(disDonanim));
      formData.append("multimedya", JSON.stringify(multimedya));
      formData.append("date", getNowDate());
      formData.append("activity", "Aktif");
      formData.append("user", JSON.stringify(user));
      formData.append("advertiserName", advertiserName);
      formData.append("advertiserSurname", advertiserSurname);
      formData.append("advertiserPhone", newNumber);
      formData.append("advertiserNote", advertiserNote);
      formData.append("request", false.toString());
      selectedImages.forEach((image) => {
        formData.append(`images`, image);
      });
      try {
        await axios
          .post(`${BACKEND_URL}/cars`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            SuccessNotification("İlan başarıyla eklendi");
            navigation("/admin/otomobiller/");
          })
          .catch(() => {
            ErrorNotification(
              "İlan eklenirken hata ile karşılaşıldı tekrar deneyiniz"
            );
            navigation("/admin/otomobiller/");
          });
        console.log("Resimler yüklendi!");
      } catch (error) {
        console.error("Resimler yüklenirken bir hata oluştu:", error);
      }
    }
  };
  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />
        <h2>İlan yayınlanıyor</h2>
        <p>
          "bu işlem seçilen fotoğraf sayısına bağlı olarak biraz zaman alabilir
          sabrınız için teşekkürler"
        </p>
      </div>
    );
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
        </div>
        <div className="images-list">
          {currentImages.map((item, key) => {
            return (
              <label htmlFor={`image-selector-single-${key}`} key={key}>
                <div className="frame">
                  <img src={item} alt={`image_${key}`} loading="lazy" />
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => {
                      handleClearFileInputSingle(
                        imagesPerPage * (currentPage - 1) + key
                      );
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
                    handleFileInputChangeSingle(
                      e,
                      imagesPerPage * (currentPage - 1) + key
                    );
                  }}
                  style={{ display: "none" }}
                />
              </label>
            );
          })}
          {pageNumbers.length === currentPage && (
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
          )}
        </div>
        <div className="paginateButtons">
          {pageNumbers.map((number) => {
            return (
              <button
                type="button"
                key={number}
                onClick={() => {
                  paginate(number);
                }}
                className={`paginateButton ${
                  number === currentPage && "active"
                }`}
              >
                {number}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="clear-all-images-button"
          onClick={() => {
            setSelectedImages([]);
            setSelectedImagesPreview([]);
            showPeginate([], 1);
          }}
        >
          <BsFillTrash3Fill className="icon" /> Tüm resimleri kaldır
        </button>

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
              <span className="optional">(Opsiyonel)</span>
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
              <span className="optional">(Opsiyonel)</span>
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
            <span className="optional">(Opsiyonel)</span>
          </label>
          <PhoneInput
            country={"tr"}
            value={advertiserPhone}
            onChange={(phone) => setAdvertiserPhone(phone)}
          />
        </div>
        <div className="form-element">
          <label htmlFor="car-add-form-advertiser-note">
            İlan Notu
            <span className="optional">(Opsiyonel)</span>
          </label>
          <textarea
            rows="10"
            id="car-add-form-advertiser-note"
            type="text"
            placeholder="ilan notu.."
            value={advertiserNote}
            onChange={(e) => {
              setAdvertiserNote(e.target.value);
            }}
          ></textarea>
        </div>
        <hr />
        <div className={`form-element-dropdown`}>
          <button
            type="button"
            onClick={() => {
              setGuvenlikIsOpen(!guvenlikIsOpen);
              setIcDonanimIsOpen(false);
              setDisDonanimIsOpen(false);
              setMultimedyaIsOpen(false);
            }}
          >
            <span>
              Güvenlik <span className="optional">(Opsiyonel)</span>
            </span>
            <SlArrowDown className="icon" />
          </button>
          <div className={`dropdown ${guvenlikIsOpen ? "open" : "close"}`}>
            {guvenlikListesi.map((item, key) => {
              return (
                <p
                  key={key}
                  className={`dropdown-item ${
                    guvenlik.some((u) => u === item) && "selected"
                  }`}
                  onClick={() => {
                    if (guvenlik.some((u) => u === item)) {
                      setGuvenlik(guvenlik.filter((u) => u !== item));
                    } else {
                      setGuvenlik((oldArray) => [...oldArray, item]);
                    }
                  }}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <div className={`form-element-dropdown`}>
          <button
            type="button"
            onClick={() => {
              setIcDonanimIsOpen(!icDonanimIsOpen);
              setGuvenlikIsOpen(false);
              setDisDonanimIsOpen(false);
              setMultimedyaIsOpen(false);
            }}
          >
            <span>
              İç Donanım <span className="optional">(Opsiyonel)</span>
            </span>
            <SlArrowDown className="icon" />
          </button>
          <div className={`dropdown ${icDonanimIsOpen ? "open" : "close"}`}>
            {icDonanimListesi.map((item, key) => {
              return (
                <p
                  key={key}
                  className={`dropdown-item ${
                    icDonanim.some((u) => u === item) && "selected"
                  }`}
                  onClick={() => {
                    if (icDonanim.some((u) => u === item)) {
                      setIcDonanim(icDonanim.filter((u) => u !== item));
                    } else {
                      setIcDonanim((oldArray) => [...oldArray, item]);
                    }
                  }}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <div className={`form-element-dropdown`}>
          <button
            type="button"
            onClick={() => {
              setDisDonanimIsOpen(!disDonanimIsOpen);
              setIcDonanimIsOpen(false);
              setGuvenlikIsOpen(false);
              setMultimedyaIsOpen(false);
            }}
          >
            <span>
              Dış Donanım <span className="optional">(Opsiyonel)</span>
            </span>
            <SlArrowDown className="icon" />
          </button>
          <div className={`dropdown ${disDonanimIsOpen ? "open" : "close"}`}>
            {disDonanimListesi.map((item, key) => {
              return (
                <p
                  key={key}
                  className={`dropdown-item ${
                    disDonanim.some((u) => u === item) && "selected"
                  }`}
                  onClick={() => {
                    if (disDonanim.some((u) => u === item)) {
                      setDisDonanim(disDonanim.filter((u) => u !== item));
                    } else {
                      setDisDonanim((oldArray) => [...oldArray, item]);
                    }
                  }}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <div className={`form-element-dropdown`}>
          <button
            type="button"
            onClick={() => {
              setMultimedyaIsOpen(!multimedyaIsOpen);
              setGuvenlikIsOpen(false);
              setIcDonanimIsOpen(false);
              setDisDonanimIsOpen(false);
            }}
          >
            <span>
              Multimedya Özellikleri{" "}
              <span className="optional">(Opsiyonel)</span>
            </span>
            <SlArrowDown className="icon" />
          </button>
          <div className={`dropdown ${multimedyaIsOpen ? "open" : "close"}`}>
            {multimedyaListesi.map((item, key) => {
              return (
                <p
                  key={key}
                  className={`dropdown-item ${
                    multimedya.some((u) => u === item) && "selected"
                  }`}
                  onClick={() => {
                    if (multimedya.some((u) => u === item)) {
                      setMultimedya(multimedya.filter((u) => u !== item));
                    } else {
                      setMultimedya((oldArray) => [...oldArray, item]);
                    }
                  }}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <button type="submit" className="submit-button">
          Ekle
        </button>
      </form>
    </div>
  );
}

export default CarAdd;
