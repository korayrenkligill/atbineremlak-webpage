import React, { useEffect, useRef, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import {
  ErrorNotification,
  InfoNotification,
  SuccessNotification,
} from "../../elements/toastify";
import ReactQuill from "react-quill";
import { v4 as uuidv4 } from "uuid";

import "./ilan-ver-main.css";
import axios from "axios";
import { BACKEND_URL, cloudName, uploadPreset } from "../../elements/config";
import { useNavigate } from "react-router-dom";

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

function IlanVer() {
  const navigation = useNavigate();
  const stageRef = useRef();

  const [stage, setStage] = useState(0);
  const [stageWidth, setStageWidth] = useState(0);

  //STAGE 1
  const [ilanTipi, setIlanTipi] = useState("");

  //STAGE 2
  const [advertiserName, setAdvertiserName] = useState("");
  const [advertiserSurname, setAdvertiserSurname] = useState("");
  const [advertiserPhone, setAdvertiserPhone] = useState("");

  //STAGE 3
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesPreview, setSelectedImagesPreview] = useState([]);

  //STAGE 4
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(0);
  const [bargain, setBargain] = useState("Var");
  const [ilce, setIlce] = useState("Şehzadeler");
  const [mahalle, setMahalle] = useState("seçiniz");
  const [type, setType] = useState("Satılık");
  const [grossArea, setGrossArea] = useState("");
  const [netArea, setNetArea] = useState("");
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

  const [baslik, setBaslik] = useState("");
  const [carContent, setCarContent] = useState("");
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

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files;
    if (file.length + selectedImages.length < 26) {
      setSelectedImages((oldArray) => [...oldArray, ...file]);
      for (let i = 0; i < file.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(file[i]);

        reader.onload = () => {
          setSelectedImagesPreview((oldArray) => [...oldArray, reader.result]);
        };
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
      for (let i = 0; i < file.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(file[i]);
        reader.onload = () => {
          setSelectedImagesPreview((oldArray) => [...oldArray, reader.result]);
        };
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
        setSelectedImagesPreview(imagesArray);
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
  };

  const handleChange = (value) => {
    setContent(value);
  };
  const handleCarChange = (value) => {
    setCarContent(value);
  };

  const handleCarSubmit = () => {
    let error = false;
    let imageUrls = [];

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
      for (let i = 0; i < selectedImages.length; i++) {
        const formData = new FormData();
        formData.append("file", selectedImages[i]);
        formData.append("upload_preset", uploadPreset); // Cloudinary yükleme ön tanımlaması
        formData.append("folder", "otomobil");
        axios
          .post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
          )
          .then((response) => {
            imageUrls.push(response.data.secure_url);
          })
          .then(() => {
            if (i === selectedImages.length - 1) {
              const newCar = {
                id: uuidv4(),
                baslik: baslik,
                aciklama:
                  content.length === 0 ? "Bir açıklama belirtilmedi!" : content,
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
                user: "",
                advertiserName: advertiserName,
                advertiserSurname: advertiserSurname,
                advertiserPhone: `+90${advertiserPhone}`,
                images: imageUrls,
                youtubeId: "",
                request: true,
              };
              axios
                .post(`${BACKEND_URL}/cars`, newCar)
                .then((response) => console.log(response))
                .then(() => {
                  SuccessNotification("İlan ekleme isteği gönderildi");
                  InfoNotification(
                    "Lütfen ilanın yetkililerimiz tarafından onaylanmasını bekleyiniz"
                  );
                  navigation("/");
                });
            }
          });
      }
    }
  };

  const handleRealEstateSubmit = () => {
    let error = false;
    let imageUrls = [];

    if (selectedImages.length < 1) {
      ErrorNotification("En az 1 resim seçmelisin");
      error = true;
    }
    if (title.length < 5) {
      ErrorNotification("Daha uzun bir ilan başlığı girmelisin");
      error = true;
    }
    if (price === 0) {
      ErrorNotification("0 Fiyat etiketi girilemez");
      error = true;
    }
    if (mahalle.length <= 0 || mahalle === "seçiniz") {
      ErrorNotification("Bir mahalle seçmelisin!");
      error = true;
    }
    if (grossArea.length <= 0) {
      ErrorNotification("m² (Brüt) boş bırakılamaz");
      error = true;
    }
    if (netArea.length <= 0) {
      ErrorNotification("m² (Net) boş bırakılamaz");
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
      for (let i = 0; i < selectedImages.length; i++) {
        const formData = new FormData();
        formData.append("file", selectedImages[i]);
        formData.append("upload_preset", uploadPreset); // Cloudinary yükleme ön tanımlaması
        formData.append("folder", "konut");
        axios
          .post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
          )
          .then((response) => {
            imageUrls.push(response.data.secure_url);
          })
          .then(() => {
            if (i === selectedImages.length - 1) {
              const newRealEstate = {
                id: uuidv4(),
                title: title,
                description:
                  content.length === 0 ? "Bir açıklama belirtilmedi!" : content,
                price: price,
                bargain: bargain,
                ilce: ilce,
                mahalle: mahalle,
                type: type,
                grossArea: grossArea,
                netArea: netArea,
                roomCount: roomCount,
                buildAge: buildAge,
                floor: floor,
                totalFloor: totalFloor,
                heating: heating,
                bathroomCount: bathroomCount,
                balcony: balcony,
                furnished: furnished,
                usingState: usingState,
                onSite: onSite,
                siteName: onSite === "Evet" ? siteName : "",
                dues: dues,
                suitableForCredit: suitableForCredit,
                titleStatus: titleStatus,
                swap: swap,
                date: getNowDate(),
                user: "",
                advertiserName: advertiserName,
                advertiserSurname: advertiserSurname,
                advertiserPhone: `+90${advertiserPhone}`,
                images: imageUrls,
                youtubeId: "",
                request: true,
              };
              axios
                .post(`${BACKEND_URL}/real-estates`, newRealEstate)
                .then((response) => console.log(response))
                .then(() => {
                  SuccessNotification("İlan ekleme isteği gönderildi");
                  InfoNotification(
                    "Lütfen ilanın yetkililerimiz tarafından onaylanmasını bekleyiniz"
                  );
                  navigation("/");
                });
            }
          });
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (stageRef.current) {
        const width = stageRef.current.offsetWidth;
        setStageWidth(width);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // İlk render'da width değerini almak için

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="ilan-ver">
      <div className="stage-container">
        <h2 className="title">
          {stage === 0
            ? "İlan tipi"
            : stage === 1
            ? "İletişim bilgileri"
            : stage === 2
            ? "İlan resimleri"
            : "İlan bilgieri"}
        </h2>
        <div>
          <p className="stage-info">{stage + 1}/4</p>
          <div
            style={{
              height: "5px",
              backgroundColor: "var(--color-primary-blue)",
              borderRadius: "10px 10px 0px 0px",
              transition: "width 0.4s",
              width: `${((stage + 1) / 4) * 100}%`,
            }}
          ></div>
        </div>
        <div
          className="stage-inner-container"
          style={{ transform: `translateX(${-1 * stage * stageWidth}px)` }}
        >
          <div
            ref={stageRef}
            className="stage stage-1"
            style={{ maxHeight: `${stage !== 0 ? "0px" : "2000px"}` }}
          >
            <button
              onClick={() => {
                setIlanTipi("Konut");
                setStage(stage + 1);
              }}
            >
              <div className="left">
                <img src="/images/type-building.png" alt="icon" />
                <p>
                  <span>Konut</span> ilanı vermek istiyorum
                </p>
              </div>
              <MdArrowForwardIos />
            </button>
            <button
              onClick={() => {
                setIlanTipi("Otomobil");
                setStage(stage + 1);
              }}
            >
              <div className="left">
                <img src="/images/type-car.png" alt="icon" />
                <p>
                  <span>Otomobil</span> ilanı vermek istiyorum
                </p>
              </div>
              <MdArrowForwardIos />
            </button>
          </div>
          <div
            className="stage stage-2"
            style={{ maxHeight: `${stage !== 1 ? "0px" : "2000px"}` }}
          >
            <div className="personal-information-container">
              <div className="form-element-double">
                <span>
                  <label htmlFor="ilan-ekle-advertiser-name">İsim</label>
                  <input
                    id="ilan-ekle-advertiser-name"
                    value={advertiserName}
                    onChange={(e) => {
                      setAdvertiserName(e.target.value);
                    }}
                    type="text"
                    placeholder="isim.."
                  />
                </span>
                <span>
                  <label htmlFor="ilan-ekle-advertiser-surname">Soyisim</label>
                  <input
                    id="ilan-ekle-advertiser-surname"
                    value={advertiserSurname}
                    onChange={(e) => {
                      setAdvertiserSurname(e.target.value);
                    }}
                    type="text"
                    placeholder="soyisim.."
                  />
                </span>
              </div>
              <div className="form-element">
                <label htmlFor="ilan-ekle-advertiser-phone">
                  İletişim numarası <span>(5554443322)</span>
                </label>
                <input
                  id="ilan-ekle-advertiser-phone"
                  value={advertiserPhone}
                  onChange={(e) => {
                    setAdvertiserPhone(e.target.value);
                  }}
                  type="text"
                  placeholder="iletişim numarası.."
                />
              </div>
              <button
                className="next-button"
                onClick={() => {
                  setStage(stage + 1);
                }}
                disabled={
                  advertiserName.length > 0 &&
                  advertiserSurname.length > 0 &&
                  advertiserPhone.length === 10
                    ? false
                    : true
                }
              >
                İleri
              </button>
              <button
                className="back-button"
                onClick={() => {
                  setStage(stage - 1);
                }}
              >
                Geri
              </button>
            </div>
          </div>
          <div
            className="stage stage-3"
            style={{ maxHeight: `${stage !== 2 ? "0px" : "2000px"}` }}
          >
            <div className="ilan-ekle-images">
              {ilanTipi === "Konut" ? (
                <div className="type-konut-images">
                  <div className="images-list">
                    {selectedImagesPreview.map((item, key) => {
                      return (
                        <label
                          htmlFor={`image-selector-single-${key}`}
                          key={key}
                        >
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
                </div>
              ) : (
                <div className="type-otomobil-images">
                  <div className="images-list">
                    {selectedImagesPreview.map((item, key) => {
                      return (
                        <label
                          htmlFor={`image-selector-single-${key}`}
                          key={key}
                        >
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
                </div>
              )}
              <button
                className="next-button"
                onClick={() => {
                  setStage(stage + 1);
                }}
                disabled={selectedImages.length > 0 ? false : true}
              >
                İleri
              </button>
              <button
                className="back-button"
                onClick={() => {
                  setSelectedImages([]);
                  setSelectedImagesPreview([]);
                  setStage(stage - 1);
                }}
              >
                Geri
              </button>
            </div>
          </div>
          <div
            className="stage stage-4"
            style={{ maxHeight: `${stage !== 3 ? "0px" : "2000px"}` }}
          >
            {ilanTipi === "Konut" ? (
              <div className="konut-ekle-ilan-bilgileri">
                <div className="title form-element">
                  <label htmlFor="real-estate-add-form-title">
                    İlan başlığı
                  </label>
                  <input
                    type="text"
                    placeholder="ilan başlığı giriniz.."
                    id="real-estate-add-form-title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="description form-element">
                  <label>
                    İlan Açıklaması{" "}
                    <span className="optional">( Opsiyonel )</span>
                  </label>
                  <ReactQuill
                    value={content}
                    onChange={handleChange}
                    placeholder="İlan açıklaması giriniz.."
                  />
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
                    <label htmlFor="real-estate-add-form-grossarea">
                      m² (brüt)
                    </label>
                    <input
                      id="real-estate-add-form-grossarea"
                      type="text"
                      placeholder="120m²"
                      value={grossArea}
                      onChange={(e) => {
                        setGrossArea(e.target.value);
                      }}
                    />
                  </span>
                  <span>
                    <label htmlFor="real-estate-add-form-netarea">
                      m² (net)
                    </label>
                    <input
                      id="real-estate-add-form-netarea"
                      type="text"
                      placeholder="110m²"
                      value={netArea}
                      onChange={(e) => {
                        setNetArea(e.target.value);
                      }}
                    />
                  </span>
                </div>
                <div className="room-count form-element">
                  <label htmlFor="real-estate-add-form-roomcount">
                    Oda sayısı
                  </label>
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
                  <label htmlFor="real-estate-add-form-buildage">
                    Bina yaşı
                  </label>
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
                  <label htmlFor="real-estate-add-form-floor">
                    Bulunduğu kat
                  </label>
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
                    <option value="Merkezi (Pay Ölçer)">
                      Merkezi (Pay Ölçer)
                    </option>
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
                  <label htmlFor="real-estate-add-form-onsite">
                    Site içerisinde
                  </label>
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
                <button
                  className="next-button"
                  onClick={handleRealEstateSubmit}
                  disabled={true ? false : true}
                >
                  İlan ver
                </button>
                <button
                  className="back-button"
                  onClick={() => {
                    setStage(stage - 1);
                  }}
                >
                  Geri
                </button>
              </div>
            ) : (
              <div className="otomobil-ekle-ilan-bilgileri">
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
                    İlan Açıklaması{" "}
                    <span className="optional">( Opsiyonel )</span>
                  </label>
                  <ReactQuill
                    value={carContent}
                    onChange={handleCarChange}
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
                  <label htmlFor="car-add-form-agir-hasarli">
                    Ağır Hasar Kayıtlı
                  </label>
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
                <button
                  className="next-button"
                  onClick={handleCarSubmit}
                  disabled={true ? false : true}
                >
                  İlan ver
                </button>
                <button
                  className="back-button"
                  onClick={() => {
                    setStage(stage - 1);
                  }}
                >
                  Geri
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IlanVer;
