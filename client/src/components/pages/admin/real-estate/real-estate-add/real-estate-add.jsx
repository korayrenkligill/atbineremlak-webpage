import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import ReactQuill from "react-quill";
import YouTube from "react-youtube";
import "./real-estate-add.css";

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

const getVideoIdFromUrl = (url) => {
  const videoIdRegex = /[?&]v=([^?&]+)/;
  const match = url.match(videoIdRegex);
  if (match && match[1]) {
    return match[1];
  } else {
    return null; // Geçersiz URL
  }
};

function RealEstateAdd() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  const [videoId, setVideoId] = useState("");

  const [content, setContent] = useState("");

  const [ilce, setIlce] = useState("Şehzadeler");

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
    if (file.length + selectedImages.length < 26) {
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
    <div className="real-estate-add">
      <h1 className="admin-title">Konut İlanı Ekle</h1>
      <div className="real-estate-add-form">
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
          <label htmlFor="">İlçe</label>
          <select
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
          <label htmlFor="">Mahalle</label>
          <select>
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
          <label htmlFor="">İlan türü</label>
          <select>
            <option value="Test">Satılık</option>
            <option value="Test">Kiralık</option>
          </select>
        </div>
        <div className="area form-element-double">
          <span>
            <label htmlFor="">m² (brüt)</label>
            <input type="text" placeholder="120m²" />
          </span>
          <span>
            <label htmlFor="">m² (net)</label>
            <input type="text" placeholder="110m²" />
          </span>
        </div>
        <div className="room-count form-element">
          <label htmlFor="">Oda sayısı</label>
          <select>
            <option value="Test">Stüdyo (1 + 0)</option>
            <option value="Test">1 + 1</option>
            <option value="Test">1.5 + 1</option>
            <option value="Test">2 + 0</option>
            <option value="Test">2 + 1</option>
            <option value="Test">2.5 + 1</option>
            <option value="Test">2 + 2</option>
            <option value="Test">3 + 0</option>
            <option value="Test">3 + 1</option>
            <option value="Test">3.5 + 1</option>
            <option value="Test">3 + 2</option>
            <option value="Test">3 + 3</option>
            <option value="Test">4 + 0</option>
            <option value="Test">4 + 1</option>
            <option value="Test">4.5 + 1</option>
            <option value="Test">4 + 2</option>
            <option value="Test">4 + 3</option>
            <option value="Test">4 + 4</option>
            <option value="Test">5 + 1</option>
            <option value="Test">5.5 + 1</option>
            <option value="Test">5 + 2</option>
            <option value="Test">5 + 3</option>
            <option value="Test">5 + 4</option>
            <option value="Test">6 + 1</option>
            <option value="Test">6.5 + 1</option>
            <option value="Test">6 + 2</option>
            <option value="Test">6 + 3</option>
            <option value="Test">6 + 4</option>
            <option value="Test">7 + 1</option>
            <option value="Test">7 + 2</option>
            <option value="Test">7 + 3</option>
            <option value="Test">8 + 1</option>
            <option value="Test">8 + 2</option>
            <option value="Test">8 + 3</option>
            <option value="Test">8 + 4</option>
            <option value="Test">9 + 1</option>
            <option value="Test">9 + 2</option>
            <option value="Test">9 + 3</option>
            <option value="Test">9 + 4</option>
            <option value="Test">9 + 5</option>
            <option value="Test">9 + 6</option>
            <option value="Test">10 + 1</option>
            <option value="Test">10 + 2</option>
            <option value="Test">10 üzeri</option>
          </select>
        </div>
        <div className="age form-element">
          <label htmlFor="">Bina yaşı</label>
          <select>
            <option value="">0</option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5-10 arası</option>
            <option value="">11-15 arası</option>
            <option value="">16-20 arası</option>
            <option value="">21-25 arası</option>
            <option value="">26-30 arası</option>
            <option value="">31 ve üzeri</option>
          </select>
        </div>
        <div className="floor form-element">
          <label htmlFor="">Bulunduğu kat</label>
          <input type="number" placeholder="bulunduğu kat.." />
        </div>
        <div className="total-floo form-element">
          <label htmlFor="">Toplam kat sayısı</label>
          <input type="number" placeholder="toplam kat.." />
        </div>
        <div className="heating form-element">
          <label htmlFor="">Isıtma</label>
          <select>
            <option value="">Yok</option>
            <option value="">Soba</option>
            <option value="">Doğalgaz sobası</option>
            <option value="">Kat kaloriferi</option>
            <option value="">Merkezi</option>
            <option value="">Merkezi (Pay Ölçer)</option>
            <option value="">Kombi (Doğalgaz)</option>
            <option value="">Kombi (Elektrik)</option>
            <option value="">Yerden ısıtma</option>
            <option value="">Klima</option>
            <option value="">Güneş enerjisi</option>
            <option value="">Şömine</option>
          </select>
        </div>
        <div className="bathroom-count form-element">
          <label htmlFor="">Banyo sayısı</label>
          <input type="number" placeholder="banyo sayısı.." />
        </div>
        <div className="balcony form-element">
          <label htmlFor="">Balkon</label>
          <select>
            <option value="">Var</option>
            <option value="">Yok</option>
          </select>
        </div>
        <div className="esyali form-element">
          <label htmlFor="">Eşyalı</label>
          <select>
            <option value="">Evet</option>
            <option value="">Hayır</option>
          </select>
        </div>
        <div className="kullanim-durumu form-element">
          <label htmlFor="">Kullanım durumu</label>
          <select>
            <option value="">Boş</option>
            <option value="">Kiracılı</option>
            <option value="">Mülk sahibi</option>
          </select>
        </div>
        <div className="site-icerisinde form-element">
          <label htmlFor="">Site içerisinde</label>
          <select>
            <option value="">Evet</option>
            <option value="">Hayır</option>
          </select>
        </div>
        <div className="side-adi form-element">
          <label htmlFor="">
            Site adı <span className="optional">( Opsiyonel )</span>
          </label>
          <input type="text" placeholder="site adı.." />
        </div>
        <div className="aidat form-element">
          <label htmlFor="">
            Aidat (₺) <span className="optional">( Opsiyonel )</span>
          </label>
          <input type="number" placeholder="70₺.." />
        </div>
        <div className="krediye-uygun form-element">
          <label htmlFor="">Krediye Uygun</label>
          <select>
            <option value="">Evet</option>
            <option value="">Hayır</option>
          </select>
        </div>
        <div className="tapu-durumu form-element">
          <label htmlFor="">
            Tapu durumu <span className="optional">( Opsiyonel )</span>
          </label>
          <select>
            <option value="">Bilinmiyor</option>
            <option value="">Kat Mülkiyetli</option>
            <option value="">Kat İrtifaklı</option>
            <option value="">Hisseli Tapulu</option>
            <option value="">Müstakil Tapulu</option>
            <option value="">Arsa Tapulu</option>
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

export default RealEstateAdd;
