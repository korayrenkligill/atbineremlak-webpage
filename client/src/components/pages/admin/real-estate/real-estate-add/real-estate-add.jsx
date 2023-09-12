import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import ReactQuill from "react-quill";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../../elements/toastify";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./real-estate-add.css";
import { useNavigate } from "react-router-dom";
import {
  BACKEND_URL,
  cepheListesi,
  disOzelliklerListesi,
  icOzelliklerListesi,
  konutTipiListesi,
  manzaraListesi,
  muhitListesi,
  ulasimListesi,
} from "../../../../elements/config";
import PuffLoader from "react-spinners/PuffLoader";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";

const manisaIlceleri = [
  {
    ilce: "Şehzadeler",
    mahalleler: [
      "ANAFAKTALAR MAHALLESİ",
      "ADAKALE MAHALLESİ",
      "ADNAN MENDERES MAHALLESİ",
      "AHMET BEDEVİ MAHALLESİ",
      "AKINCILAR MAHALLESİ",
      "AKPINAR MAHALLESİ",
      "ALAYBEY MAHALLESİ",
      "ARDA MAHALLESİ",
      "AŞAĞIÇOBANİSA MAHALLESİ",
      "AYVACIK MAHALLESİ",
      "BAYINDIRLIK MAHALLESİ",
      "BELENYENİCE MAHALLESİ",
      "ÇAMKÖY MAHALLESİ",
      "ÇARŞI MAHALLESİ",
      "ÇAVUŞOĞLU MAHALLESİ",
      "ÇERKEZMAHMUDİYE MAHALLESİ",
      "ÇINARLIKUYU MAHALLESİ",
      "DERE MAHALLESİ",
      "DİLŞİKAR MAHALLESİ",
      "DİNÇER MAHALLESİ",
      "EGE MAHALLESİ",
      "GEDİZ MAHALLESİ",
      "GÖKBEL MAHALLESİ",
      "GÖKTAŞLI MAHALLESİ",
      "GÜZELKÖY MAHALLESİ",
      "HACIHALİLLER MAHALLESİ",
      "HALITLI MAHALLESİ",
      "HAMZABEYLİ MAHALLESİ",
      "İBRAHİMÇELEBİ MAHALLESİ",
      "İSHAKÇELEBİ MAHALLESİ",
      "KAĞAN MAHALLESİ",
      "KALEKÖY MAHALLESİ",
      "KALEMLİ MAHALLESİ",
      "KARAAĞAÇLI MAHALLESİ",
      "KARAOĞLANLI MAHALLESİ",
      "KARAYENİCE MAHALLESİ",
      "KAZIM KARABEKİR MAHALLESİ",
      "KIRANÇİFTLİĞİ MAHALLESİ",
      "KOCATEPE MAHALLESİ",
      "KUŞLUBAHÇE MAHALLESİ",
      "MİMARSİNAN MAHALLESİ",
      "NİŞANCIPAŞA MAHALLESİ",
      "NURLUPINAR MAHALLESİ",
      "PEKER MAHALLESİ",
      "SAKARYA MAHALLESİ",
      "SANCAKLIBOZKÖY MAHALLESİ",
      "SANCAKLIÇEŞMEBAŞI MAHALLESİ",
      "SANCAKLIİĞDECİK MAHALLESİ",
      "SANCAKLIKAYADİBİ MAHALLESİ",
      "SANCAKLIUZUNÇINAR MAHALLESİ",
      "SARIALAN MAHALLESİ",
      "SARUHAN MAHALLESİ",
      "SELİMŞAHLAR MAHALLESİ",
      "ŞEHİTLER MAHALLESİ",
      "TEKELİLER MAHALLESİ",
      "TEPECİK MAHALLESİ",
      "TİLKİSÜLEYMANİYE MAHALLESİ",
      "TUNCA MAHALLESİ",
      "TURGUT ÖZAL MAHALLESİ",
      "UTKU MAHALLESİ",
      "VEZİROĞLU MAHALLESİ",
      "YARHASANLAR MAHALLESİ",
      "YENİHARMANDALI MAHALLESİ",
      "YENİKÖY MAHALLESİ",
      "YEŞİLKÖY MAHALLESİ",
      "YUKARIÇOBANİSA MAHALLESİ",
    ],
  },
  {
    ilce: "Yunusemre",
    mahalleler: [
      "50.YIL MAHALLESİ",
      "75. YIL MAHALLESİ",
      "AKÇAKÖY MAHALLESİ",
      "AKGEDİK MAHALLESİ",
      "AKMESCİT MAHALLESİ",
      "ASMACIK MAHALLESİ",
      "ATATÜRK MAHALLESİ",
      "AVDAL MAHALLESİ",
      "AYNİ ALİ MAHALLESİ",
      "BAĞYOLU MAHALLESİ",
      "BARBAROS MAHALLESİ",
      "BEYDERE MAHALLESİ",
      "BOSTANLAR MAHALLESİ",
      "BÜYÜKSÜMBÜLLER MAHALLESİ",
      "CUMHURİYET MAHALLESİ",
      "ÇAMLICA MAHALLESİ",
      "DAVUTLAR MAHALLESİ",
      "DAZYURT MAHALLESİ",
      "DEMİRCİ MAHALLESİ",
      "DURASILLI MAHALLESİ",
      "DÜZLEN MAHALLESİ",
      "EMLAKDERE MAHALLESİ",
      "EVRENOS MAHALLESİ",
      "FATİH MAHALLESİ",
      "GÖKÇELER MAHALLESİ",
      "GÜLBAHÇE MAHALLESİ",
      "GÜRLE MAHALLESİ",
      "GÜZELYURT MAHALLESİ",
      "HAFSA SULTAN MAHALLESİ",
      "İLYASÇILAR MAHALLESİ",
      "KARAAHMETLİ MAHALLESİ",
      "KARAALİ MAHALLESİ",
      "KARAHÜSEYİNLİ MAHALLESİ",
      "KARAKILIÇLI MAHALLESİ",
      "KARAKOCA MAHALLESİ",
      "KARAVELİLER MAHALLESİ",
      "KARAYAĞCIHACILAR MAHALLESİ",
      "KAYAPINAR MAHALLESİ",
      "KAYNAK MAHALLESİ",
      "KEÇİLİ KÖY MAHALLESİ",
      "KIŞLAKÖY MAHALLESİ",
      "KOCAKORU MAHALLESİ",
      "KORUKÖY MAHALLESİ",
      "KOZAKLAR MAHALLESİ",
      "KUYUALAN MAHALLESİ",
      "KÜÇÜKBELEN MAHALLESİ",
      "KÜÇÜKSÜMBÜLLER MAHALLESİ",
      "LALAPAŞA MAHALLESİ",
      "LALELİ MAHALLESİ",
      "MALDAN MAHALLESİ",
      "MAREŞAL FEVZİ ÇAKMAK MAHALLESİ",
      "MERKEZ EFENDİ MAHALLESİ",
      "MESİR MAHALLESİ",
      "MOLLASÜLEYMANLI MAHALLESİ",
      "MURADİYE MAHALLESİ",
      "MUTLU MAHALLESİ",
      "MÜSLİH MAHALLESİ",
      "ORTAKÖY MAHALLESİ",
      "OSMANCALI MAHALLESİ",
      "OTMANLAR MAHALLESİ",
      "ÖRENCİK MAHALLESİ",
      "ÖRSELLİ MAHALLESİ",
      "PELİTALAN MAHALLESİ",
      "PINARKÖY MAHALLESİ",
      "RECEPLİ MAHALLESİ",
      "SAKALLI MAHALLESİ",
      "SARIAHMETLİ MAHALLESİ",
      "SARINASUHLAR MAHALLESİ",
      "SARMA MAHALLESİ",
      "SEYİTLİ MAHALLESİ",
      "SPİL MAHALLESİ",
      "SÜMBÜLTEPE MAHALLESİ",
      "SÜNGÜLLÜ MAHALLESİ",
      "ŞAMAR MAHALLESİ",
      "TEVFİKİYE MAHALLESİ",
      "TOPÇUASIM MAHALLESİ",
      "TURGUTALP MAHALLESİ",
      "TÜRKMEN MAHALLESİ",
      "UNCUBOZKÖY MAHALLESİ",
      "UZUNBURUN MAHALLESİ",
      "UZUNLAR MAHALLESİ",
      "ÜÇPINAR MAHALLESİ",
      "YAĞCILAR MAHALLESİ",
      "YAYLAKÖY MAHALLESİ",
      "YENİ MAHALLE MAHALLESİ",
      "YUNTDAĞIKÖSELER MAHALLESİ",
      "YUNTDAĞYENİCE MAHALLESİ",
    ],
  },
];

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

function RealEstateAdd({ user }) {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesPreview, setSelectedImagesPreview] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(0);
  const [bargain, setBargain] = useState("Var");
  const [ilce, setIlce] = useState("Şehzadeler");
  const [mahalle, setMahalle] = useState("seçiniz");
  const [type, setType] = useState("Satılık");
  const [grossArea, setGrossArea] = useState(0);
  const [netArea, setNetArea] = useState(0);
  const [roomCount, setRoomCount] = useState("Stüdyo (1 + 0)");
  const [buildAge, setBuildAge] = useState("0");
  const [floor, setFloor] = useState(0);
  const [totalFloor, setTotalFloor] = useState(0);
  const [heating, setHeating] = useState("Yok");
  const [bathroomCount, setBathroomCount] = useState(0);
  const [balcony, setBalcony] = useState("Var");
  const [furnished, setFurnished] = useState("Hayır");
  const [usingState, setUsingState] = useState("Boş");
  const [onSite, setOnSite] = useState("Hayır");
  const [siteName, setSiteName] = useState("");
  const [dues, setDues] = useState(0);
  const [suitableForCredit, setSuitableForCredit] = useState("Evet");
  const [titleStatus, setTitleStatus] = useState("Bilinmiyor");
  const [swap, setSwap] = useState("Hayır");
  const [advertiserName, setAdvertiserName] = useState("");
  const [advertiserSurname, setAdvertiserSurname] = useState("");
  const [advertiserPhone, setAdvertiserPhone] = useState("");
  const [advertiserNote, setAdvertiserNote] = useState("");
  const [cephe, setCephe] = useState([]);
  const [icOzellikler, setIcOzellikler] = useState([]);
  const [disOzellikler, setDisOzellikler] = useState([]);
  const [muhit, setMuhit] = useState([]);
  const [ulasim, setUlasim] = useState([]);
  const [manzara, setManzara] = useState([]);
  const [konutTipi, setKonutTipi] = useState([]);

  const [cepheIsOpen, setCepheIsOpen] = useState(true);
  const [icIsOpen, setIcIsOpen] = useState(false);
  const [disIsOpen, setDisIsOpen] = useState(false);
  const [muhitIsOpen, setMuhitIsOpen] = useState(false);
  const [ulasimIsOpen, setUlasimIsOpen] = useState(false);
  const [manzaraIsOpen, setManzaraIsOpen] = useState(false);
  const [konutTipiIsOpen, setKonutTipiIsOpen] = useState(false);

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
      }
      toast.success("Resimler başarıyla yüklendi", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
    setLoading(true);
    let error = false;
    let newNumber = "";
    if (selectedImages.length < 1) {
      ErrorNotification("En az 1 resim seçmelisin");
      error = true;
      setLoading(false);
    }
    if (title.length < 5) {
      ErrorNotification("Daha uzun bir ilan başlığı girmelisin");
      error = true;
      setLoading(false);
    }
    if (price === 0) {
      ErrorNotification("0 Fiyat etiketi girilemez");
      error = true;
      setLoading(false);
    }
    if (mahalle.length <= 0 || mahalle === "seçiniz") {
      ErrorNotification("Bir mahalle seçmelisin!");
      error = true;
      setLoading(false);
    }
    if (grossArea.length <= 0) {
      ErrorNotification("m² (Brüt) boş bırakılamaz");
      error = true;
      setLoading(false);
    }
    if (netArea.length <= 0) {
      ErrorNotification("m² (Net) boş bırakılamaz");
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
      formData.append("title", title);
      formData.append("description", content);
      formData.append("price", price.toString());
      formData.append("bargain", bargain);
      formData.append("ilce", ilce);
      formData.append("mahalle", mahalle);
      formData.append("type", type);
      formData.append("grossArea", grossArea.toString());
      formData.append("netArea", netArea.toString());
      formData.append("roomCount", roomCount);
      formData.append("buildAge", buildAge);
      formData.append("floor", floor.toString());
      formData.append("totalFloor", totalFloor.toString());
      formData.append("heating", heating);
      formData.append("bathroomCount", bathroomCount.toString());
      formData.append("balcony", balcony);
      formData.append("furnished", furnished);
      formData.append("usingState", usingState);
      formData.append("onSite", onSite);
      formData.append("siteName", onSite === "Evet" ? siteName : "");
      formData.append("dues", dues.toString());
      formData.append("suitableForCredit", suitableForCredit);
      formData.append("titleStatus", titleStatus);
      formData.append("swap", swap);
      formData.append("cephe", JSON.stringify(cephe));
      formData.append("icOzellikler", JSON.stringify(icOzellikler));
      formData.append("disOzellikler", JSON.stringify(disOzellikler));
      formData.append("muhit", JSON.stringify(muhit));
      formData.append("ulasim", JSON.stringify(ulasim));
      formData.append("manzara", JSON.stringify(manzara));
      formData.append("konutTipi", JSON.stringify(konutTipi));
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
          .post(`${BACKEND_URL}/real-estates`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            SuccessNotification("İlan başarıyla eklendi");
            navigation("/admin/konutlar/");
          })
          .catch(() => {
            ErrorNotification(
              "İlan eklenirken hata ile karşılaşıldı tekrar deneyiniz"
            );
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
    <div className="real-estate-add">
      <h1 className="admin-title">Konut İlanı Ekle</h1>
      <form className="real-estate-add-form" onSubmit={handleSubmit}>
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
          <label htmlFor="real-estate-add-form-title">İlan başlığı</label>
          <input
            type="text"
            placeholder="ilan başlığı giriniz.."
            id="real-estate-add-form-title"
            minLength="0"
            maxLength="80"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <p className="element-description">
            "İlanınızın ana sayfada görünecek olan başlığıdır. İlk 45 Karakteri
            özenle seçmenizi tavsiye ederiz."
          </p>
        </div>
        <div className="description form-element">
          <label>
            İlan Açıklaması <span className="optional">( Opsiyonel )</span>
          </label>
          <ReactQuill
            value={content}
            onChange={handleChange}
            placeholder="İlan açıklaması giriniz.."
          />
          <p className="element-description">
            "İlanınızı tanıtabilir özelliklerinden bahsedebilirsiniz."
            <br />
            "Açıklama bölümüne şahsi iletişim adresi veya şirket ismi yazılması
            durumunda ilanınız onaylanmayacaktır"
          </p>
        </div>
        <div className="floor form-element">
          <label htmlFor="real-estate-add-form-price">Fiyat</label>
          <input
            type="number"
            placeholder="İlan fiyatı.."
            id="real-estate-add-form-price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="Type form-element">
          <label htmlFor="real-estate-add-form-bargain">Pazarlık</label>
          <select
            id="real-estate-add-form-bargain"
            value={bargain}
            onChange={(e) => {
              setBargain(e.target.value);
            }}
          >
            <option value="Var">Var</option>
            <option value="Yok">Yok</option>
          </select>
        </div>
        <div className="Type form-element">
          <label htmlFor="real-estate-add-form-ilce">İlçe</label>
          <select
            id="real-estate-add-form-ilce"
            value={ilce}
            onChange={(e) => {
              setIlce(e.target.value);
            }}
          >
            <option value="Şehzadeler">Şehzadeler</option>
            <option value="Yunusemre">Yunusemre</option>
          </select>
        </div>
        <div className="Type form-element">
          <label htmlFor="real-estate-add-form-mahalle">Mahalle</label>
          <select
            id="real-estate-add-form-mahalle"
            value={mahalle}
            onChange={(e) => {
              setMahalle(e.target.value);
            }}
          >
            <option value="seçiniz">Mahalle seçiniz..</option>
            {manisaIlceleri.map((ilceItem, key) => {
              if (ilceItem.ilce === ilce) {
                return ilceItem.mahalleler.map((mahalleItem, key2) => {
                  return (
                    <option value={mahalleItem} key={key2}>
                      {mahalleItem}
                    </option>
                  );
                });
              }
            })}
          </select>
        </div>
        <div className="Type form-element">
          <label htmlFor="real-estate-add-form-type">İlan türü</label>
          <select
            id="real-estate-add-form-type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="Satılık">Satılık</option>
            <option value="Kiralık">Kiralık</option>
          </select>
        </div>
        <div className="area form-element-double">
          <span>
            <label htmlFor="real-estate-add-form-grossarea">m² (brüt)</label>
            <input
              id="real-estate-add-form-grossarea"
              type="number"
              placeholder="120m²"
              value={grossArea}
              onChange={(e) => {
                setGrossArea(e.target.value);
              }}
            />
          </span>
          <span>
            <label htmlFor="real-estate-add-form-netarea">m² (net)</label>
            <input
              id="real-estate-add-form-netarea"
              type="number"
              placeholder="110m²"
              value={netArea}
              onChange={(e) => {
                setNetArea(e.target.value);
              }}
            />
          </span>
        </div>
        <div className="room-count form-element">
          <label htmlFor="real-estate-add-form-roomcount">Oda sayısı</label>
          <select
            id="real-estate-add-form-roomcount"
            value={roomCount}
            onChange={(e) => {
              setRoomCount(e.target.value);
            }}
          >
            <option value="Stüdyo (1+0)">Stüdyo (1 + 0)</option>
            <option value="1 + 1">1 + 1</option>
            <option value="1.5 + 1">1.5 + 1</option>
            <option value="2 + 0">2 + 0</option>
            <option value="2 + 1">2 + 1</option>
            <option value="2.5 + 1">2.5 + 1</option>
            <option value="2 + 2">2 + 2</option>
            <option value="3 + 0">3 + 0</option>
            <option value="3 + 1">3 + 1</option>
            <option value="3.5 + 1">3.5 + 1</option>
            <option value="3 + 2">3 + 2</option>
            <option value="3 + 3">3 + 3</option>
            <option value="4 + 0">4 + 0</option>
            <option value="4 + 1">4 + 1</option>
            <option value="4.5 + 1">4.5 + 1</option>
            <option value="4 + 2">4 + 2</option>
            <option value="4 + 3">4 + 3</option>
            <option value="4 + 4">4 + 4</option>
            <option value="5 + 1">5 + 1</option>
            <option value="5.5 + 1">5.5 + 1</option>
            <option value="5 + 2">5 + 2</option>
            <option value="5 + 3">5 + 3</option>
            <option value="5 + 4">5 + 4</option>
            <option value="6 + 1">6 + 1</option>
            <option value="6.5 + 1">6.5 + 1</option>
            <option value="6 + 2">6 + 2</option>
            <option value="6 + 3">6 + 3</option>
            <option value="6 + 4">6 + 4</option>
            <option value="7 + 1">7 + 1</option>
            <option value="7 + 2">7 + 2</option>
            <option value="7 + 3">7 + 3</option>
            <option value="8 + 1">8 + 1</option>
            <option value="8 + 2">8 + 2</option>
            <option value="8 + 3">8 + 3</option>
            <option value="8 + 4">8 + 4</option>
            <option value="9 + 1">9 + 1</option>
            <option value="9 + 2">9 + 2</option>
            <option value="9 + 3">9 + 3</option>
            <option value="9 + 4">9 + 4</option>
            <option value="9 + 5">9 + 5</option>
            <option value="9 + 6">9 + 6</option>
            <option value="10 + 1">10 + 1</option>
            <option value="10 + 2">10 + 2</option>
            <option value="10 üzeri">10 üzeri</option>
          </select>
        </div>
        <div className="age form-element">
          <label htmlFor="real-estate-add-form-buildage">Bina yaşı</label>
          <select
            id="real-estate-add-form-buildage"
            value={buildAge}
            onChange={(e) => {
              setBuildAge(e.target.value);
            }}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5-10 arası">5-10 arası</option>
            <option value="11-15 arası">11-15 arası</option>
            <option value="16-20 arası">16-20 arası</option>
            <option value="21-25 arası">21-25 arası</option>
            <option value="26-30 arası">26-30 arası</option>
            <option value="31 ve üzeri">31 ve üzeri</option>
          </select>
        </div>
        <div className="floor form-element">
          <label htmlFor="real-estate-add-form-floor">Bulunduğu kat</label>
          <input
            id="real-estate-add-form-floor"
            type="number"
            placeholder="bulunduğu kat.."
            value={floor}
            onChange={(e) => {
              setFloor(e.target.value);
            }}
          />
        </div>
        <div className="total-floor form-element">
          <label htmlFor="real-estate-add-form-totalfloor">
            Toplam kat sayısı
          </label>
          <input
            id="real-estate-add-form-totalfloor"
            type="number"
            placeholder="toplam kat.."
            value={totalFloor}
            onChange={(e) => {
              setTotalFloor(e.target.value);
            }}
          />
        </div>
        <div className="heating form-element">
          <label htmlFor="real-estate-add-form-heating">Isıtma</label>
          <select
            id="real-estate-add-form-heating"
            value={heating}
            onChange={(e) => {
              setHeating(e.target.value);
            }}
          >
            <option value="Yok">Yok</option>
            <option value="Soba">Soba</option>
            <option value="Doğalgaz sobası">Doğalgaz sobası</option>
            <option value="Kat kaloriferi">Kat kaloriferi</option>
            <option value="Merkezi">Merkezi</option>
            <option value="Merkezi (Pay Ölçer)">Merkezi (Pay Ölçer)</option>
            <option value="Kombi (Doğalgaz)">Kombi (Doğalgaz)</option>
            <option value="Kombi (Elektrik)">Kombi (Elektrik)</option>
            <option value="Yerden ısıtma">Yerden ısıtma</option>
            <option value="Klima">Klima</option>
            <option value="Güneş enerjisi">Güneş enerjisi</option>
            <option value="Şömine">Şömine</option>
          </select>
        </div>
        <div className="bathroom-count form-element">
          <label htmlFor="real-estate-add-form-bathroom-count">
            Banyo sayısı
          </label>
          <input
            id="real-estate-add-form-bathroom-count"
            type="number"
            placeholder="banyo sayısı.."
            value={bathroomCount}
            onChange={(e) => {
              setBathroomCount(e.target.value);
            }}
          />
        </div>
        <div className="balcony form-element">
          <label htmlFor="real-estate-add-form-balcony">Balkon</label>
          <select
            id="real-estate-add-form-balcony"
            value={balcony}
            onChange={(e) => {
              setBalcony(e.target.value);
            }}
          >
            <option value="Var">Var</option>
            <option value="Yok">Yok</option>
          </select>
        </div>
        <div className="esyali form-element">
          <label htmlFor="real-estate-add-form-furnished">Eşyalı</label>
          <select
            id="real-estate-add-form-furnished"
            value={furnished}
            onChange={(e) => {
              setFurnished(e.target.value);
            }}
          >
            <option value="Hayır">Hayır</option>
            <option value="Evet">Evet</option>
          </select>
        </div>
        <div className="kullanim-durumu form-element">
          <label htmlFor="real-estate-add-form-using-state">
            Kullanım durumu
          </label>
          <select
            id="real-estate-add-form-using-state"
            value={usingState}
            onChange={(e) => {
              setUsingState(e.target.value);
            }}
          >
            <option value="Boş">Boş</option>
            <option value="Kiracılı">Kiracılı</option>
            <option value="Mülk sahibi">Mülk sahibi</option>
          </select>
        </div>
        <div className="site-icerisinde form-element">
          <label htmlFor="real-estate-add-form-onsite">Site içerisinde</label>
          <select
            id="real-estate-add-form-onsite"
            value={onSite}
            onChange={(e) => {
              setOnSite(e.target.value);
            }}
          >
            <option value="Hayır">Hayır</option>
            <option value="Evet">Evet</option>
          </select>
        </div>
        {onSite === "Evet" && (
          <div className="side-adi form-element">
            <label htmlFor="real-estate-add-form-site-name">
              Site adı <span className="optional">( Opsiyonel )</span>
            </label>
            <input
              id="real-estate-add-form-site-name"
              type="text"
              placeholder="site adı.."
              value={siteName}
              onChange={(e) => {
                setSiteName(e.target.value);
              }}
            />
          </div>
        )}
        <div className="aidat form-element">
          <label htmlFor="real-estate-add-form-dues">
            Aidat (₺) <span className="optional">( Opsiyonel )</span>
          </label>
          <input
            id="real-estate-add-form-dues"
            type="number"
            placeholder="70₺.."
            value={dues}
            onChange={(e) => {
              setDues(e.target.value);
            }}
          />
        </div>
        <div className="krediye-uygun form-element">
          <label htmlFor="real-estate-add-form-suitable-for-credit">
            Krediye Uygun
          </label>
          <select
            id="real-estate-add-form-suitable-for-credit"
            value={suitableForCredit}
            onChange={(e) => {
              setSuitableForCredit(e.target.value);
            }}
          >
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </div>
        <div className="tapu-durumu form-element">
          <label htmlFor="real-estate-add-form-title-status">
            Tapu durumu <span className="optional">( Opsiyonel )</span>
          </label>
          <select
            id="real-estate-add-form-title-status"
            value={titleStatus}
            onChange={(e) => {
              setTitleStatus(e.target.value);
            }}
          >
            <option value="Bilinmiyor">Bilinmiyor</option>
            <option value="Kat Mülkiyetli">Kat Mülkiyetli</option>
            <option value="Kat İrtifaklı">Kat İrtifaklı</option>
            <option value="Hisseli Tapulu">Hisseli Tapulu</option>
            <option value="Müstakil Tapulu">Müstakil Tapulu</option>
            <option value="Arsa Tapulu">Arsa Tapulu</option>
          </select>
        </div>
        <div className="takas form-element">
          <label htmlFor="real-estate-add-form-swap">Takas</label>
          <select
            id="real-estate-add-form-swap"
            value={swap}
            onChange={(e) => {
              setSwap(e.target.value);
            }}
          >
            <option value="Hayır">Hayır</option>
            <option value="Evet">Evet</option>
          </select>
        </div>
        <hr />
        <p className="element-description">
          "İlan hakkında not alabileceğiniz bu bölümdeki yazıları yalnızca
          yetkililer görebilir"
          <br />
          "Bilgilerin bilinmemesi veya girilmeye gerek duyulmaması durumunda boş
          bırakılabilir"
        </p>
        <div className="area form-element-double">
          <span>
            <label htmlFor="real-estate-add-form-advertiser-name">
              İlan Sahibinin Adı
              <span className="optional">(Opsiyonel)</span>
            </label>
            <input
              id="real-estate-add-form-advertiser-name"
              type="text"
              placeholder="ilan sahibi adı.."
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
              placeholder="ilan sahibi soyadı.."
              value={advertiserSurname}
              onChange={(e) => {
                setAdvertiserSurname(e.target.value);
              }}
            />
          </span>
        </div>
        <div className="form-element">
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
          <label htmlFor="real-estate-add-form-advertiser-note">
            İlan Notu
            <span className="optional">(Opsiyonel)</span>
          </label>
          <textarea
            rows="10"
            id="real-estate-add-form-advertiser-note"
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
              setCepheIsOpen(!cepheIsOpen);
              setIcIsOpen(false);
              setDisIsOpen(false);
              setMuhitIsOpen(false);
              setUlasimIsOpen(false);
              setManzaraIsOpen(false);
              setKonutTipiIsOpen(false);
            }}
          >
            <span>
              Cephe <span className="optional">(Opsiyonel)</span>
            </span>
            <SlArrowDown className="icon" />
          </button>
          <div className={`dropdown ${cepheIsOpen ? "open" : "close"}`}>
            {cepheListesi.map((item, key) => {
              return (
                <p
                  key={key}
                  className={`dropdown-item ${
                    cephe.some((u) => u === item) && "selected"
                  }`}
                  onClick={() => {
                    if (cephe.some((u) => u === item)) {
                      setCephe(cephe.filter((u) => u !== item));
                    } else {
                      setCephe((oldArray) => [...oldArray, item]);
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
              setIcIsOpen(!icIsOpen);
              setCepheIsOpen(false);
              setDisIsOpen(false);
              setMuhitIsOpen(false);
              setUlasimIsOpen(false);
              setManzaraIsOpen(false);
              setKonutTipiIsOpen(false);
            }}
          >
            <span>
              İç Özellikler <span className="optional">(Opsiyonel)</span>
            </span>
            <SlArrowDown className="icon" />
          </button>
          <div className={`dropdown ${icIsOpen ? "open" : "close"}`}>
            {icOzelliklerListesi.map((item, key) => {
              return (
                <p
                  key={key}
                  className={`dropdown-item ${
                    icOzellikler.some((u) => u === item) && "selected"
                  }`}
                  onClick={() => {
                    if (icOzellikler.some((u) => u === item)) {
                      setIcOzellikler(icOzellikler.filter((u) => u !== item));
                    } else {
                      setIcOzellikler((oldArray) => [...oldArray, item]);
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
              setDisIsOpen(!disIsOpen);
              setCepheIsOpen(false);
              setIcIsOpen(false);
              setMuhitIsOpen(false);
              setUlasimIsOpen(false);
              setManzaraIsOpen(false);
              setKonutTipiIsOpen(false);
            }}
          >
            <span>
              Dış Özellikler <span className="optional">(Opsiyonel)</span>
            </span>
            <SlArrowDown className="icon" />
          </button>
          <div className={`dropdown ${disIsOpen ? "open" : "close"}`}>
            {disOzelliklerListesi.map((item, key) => {
              return (
                <p
                  key={key}
                  className={`dropdown-item ${
                    disOzellikler.some((u) => u === item) && "selected"
                  }`}
                  onClick={() => {
                    if (disOzellikler.some((u) => u === item)) {
                      setDisOzellikler(disOzellikler.filter((u) => u !== item));
                    } else {
                      setDisOzellikler((oldArray) => [...oldArray, item]);
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
              setMuhitIsOpen(!muhitIsOpen);
              setCepheIsOpen(false);
              setIcIsOpen(false);
              setDisIsOpen(false);
              setUlasimIsOpen(false);
              setManzaraIsOpen(false);
              setKonutTipiIsOpen(false);
            }}
          >
            <span>
              Çevre <span className="optional">(Opsiyonel)</span>
            </span>
            <SlArrowDown className="icon" />
          </button>
          <div className={`dropdown ${muhitIsOpen ? "open" : "close"}`}>
            {muhitListesi.map((item, key) => {
              return (
                <p
                  key={key}
                  className={`dropdown-item ${
                    muhit.some((u) => u === item) && "selected"
                  }`}
                  onClick={() => {
                    if (muhit.some((u) => u === item)) {
                      setMuhit(muhit.filter((u) => u !== item));
                    } else {
                      setMuhit((oldArray) => [...oldArray, item]);
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
              setUlasimIsOpen(!ulasimIsOpen);
              setCepheIsOpen(false);
              setIcIsOpen(false);
              setDisIsOpen(false);
              setMuhitIsOpen(false);
              setManzaraIsOpen(false);
              setKonutTipiIsOpen(false);
            }}
          >
            <span>
              Ulaşım <span className="optional">(Opsiyonel)</span>
            </span>
            <SlArrowDown className="icon" />
          </button>
          <div className={`dropdown ${ulasimIsOpen ? "open" : "close"}`}>
            {ulasimListesi.map((item, key) => {
              return (
                <p
                  key={key}
                  className={`dropdown-item ${
                    ulasim.some((u) => u === item) && "selected"
                  }`}
                  onClick={() => {
                    if (ulasim.some((u) => u === item)) {
                      setUlasim(ulasim.filter((u) => u !== item));
                    } else {
                      setUlasim((oldArray) => [...oldArray, item]);
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
              setManzaraIsOpen(!manzaraIsOpen);
              setCepheIsOpen(false);
              setIcIsOpen(false);
              setDisIsOpen(false);
              setMuhitIsOpen(false);
              setUlasimIsOpen(false);
              setKonutTipiIsOpen(false);
            }}
          >
            <span>
              Manzara <span className="optional">(Opsiyonel)</span>
            </span>
            <SlArrowDown className="icon" />
          </button>
          <div className={`dropdown ${manzaraIsOpen ? "open" : "close"}`}>
            {manzaraListesi.map((item, key) => {
              return (
                <p
                  key={key}
                  className={`dropdown-item ${
                    manzara.some((u) => u === item) && "selected"
                  }`}
                  onClick={() => {
                    if (manzara.some((u) => u === item)) {
                      setManzara(manzara.filter((u) => u !== item));
                    } else {
                      setManzara((oldArray) => [...oldArray, item]);
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
              setKonutTipiIsOpen(!konutTipiIsOpen);
              setCepheIsOpen(false);
              setIcIsOpen(false);
              setDisIsOpen(false);
              setMuhitIsOpen(false);
              setUlasimIsOpen(false);
              setManzaraIsOpen(false);
            }}
          >
            <span>
              Konut Tipi <span className="optional">(Opsiyonel)</span>
            </span>
            <SlArrowDown className="icon" />
          </button>
          <div className={`dropdown ${konutTipiIsOpen ? "open" : "close"}`}>
            {konutTipiListesi.map((item, key) => {
              return (
                <p
                  key={key}
                  className={`dropdown-item ${
                    konutTipi.some((u) => u === item) && "selected"
                  }`}
                  onClick={() => {
                    if (konutTipi.some((u) => u === item)) {
                      setKonutTipi(konutTipi.filter((u) => u !== item));
                    } else {
                      setKonutTipi((oldArray) => [...oldArray, item]);
                    }
                  }}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <button className="submit-button" type="submit">
          Ekle
        </button>
      </form>
    </div>
  );
}

export default RealEstateAdd;
