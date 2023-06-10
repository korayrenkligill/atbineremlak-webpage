import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import "./emlak-sidebar.css";

const manisaIlceleri = [
  {
    ilce: "Seçiniz..",
    mahalleler: ["Seçiniz.."],
  },
  {
    ilce: "Şehzadeler",
    mahalleler: [
      "Seçiniz..",
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
      "Seçiniz..",
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

function EmlakSidebar(props) {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <div className="emlak-sidebar">
      <h2
        className="title"
        onClick={() => {
          setMobileMenu(!mobileMenu);
        }}
      >
        Filtreleme Menüsü <IoMenu className="icon" />
      </h2>
      <div
        className={`mobile-menu ${
          mobileMenu ? "mobile-menu-open" : "mobile-menu-close"
        }`}
      >
        <div className="sidebar-element">
          <label htmlFor="emlak-sidebar-ilce">İlçe</label>
          <select
            id="emlak-sidebar-ilce"
            value={props.ilce}
            onChange={(e) => {
              if (e.target.value !== "") props.setIlce(e.target.value);
              else {
                props.setIlce(e.target.value);
                props.setMahalle(e.target.value);
              }
            }}
          >
            {manisaIlceleri.map((item, key) => {
              if (item.ilce === "Seçiniz..")
                return (
                  <option value="" key={key}>
                    {item.ilce}
                  </option>
                );
              else
                return (
                  <option value={item.ilce} key={key}>
                    {item.ilce}
                  </option>
                );
            })}
          </select>
        </div>
        {props.ilce !== "" && (
          <div className="sidebar-element">
            <label htmlFor="emlak-sidebar-mahalle">Mahalle</label>
            <select
              id="emlak-sidebar-mahalle"
              value={props.mahalle}
              onChange={(e) => props.setMahalle(e.target.value)}
            >
              {manisaIlceleri.map((ilceItem, key) => {
                if (ilceItem.ilce === props.ilce) {
                  return ilceItem.mahalleler.map((mahalleItem, key2) => {
                    if (mahalleItem === "Seçiniz..")
                      return (
                        <option value="" key={key2}>
                          {mahalleItem}
                        </option>
                      );
                    else
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
        )}
        <div className="sidebar-element">
          <label htmlFor="emlak-sidebar-type">İlan türü</label>
          <select
            id="emlak-sidebar-type"
            value={props.type}
            onChange={(e) => props.setType(e.target.value)}
          >
            <option value="">Seçiniz..</option>
            <option value="Satılık">Satılık</option>
            <option value="Kiralık">Kiralık</option>
          </select>
        </div>
        <div className="sidebar-element-double">
          <h2 className="inner-title">Fiyat</h2>
          <input
            type="number"
            placeholder="min.."
            min="0"
            value={props.minPrice > 0 && props.minPrice}
            onChange={(e) => props.setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="max.."
            min="0"
            value={props.maxPrice > 0 && props.maxPrice}
            onChange={(e) => props.setMaxPrice(e.target.value)}
          />
        </div>
        <div className="sidebar-element">
          <label htmlFor="emlak-sidebar-roomcount">Oda sayısı</label>
          <select
            id="emlak-sidebar-roomcount"
            value={props.roomCount}
            onChange={(e) => props.setRoomCount(e.target.value)}
          >
            <option value="">Seçiniz..</option>
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
        <div className="sidebar-element">
          <label htmlFor="">Bulunduğu kat</label>
          <input
            type="number"
            placeholder="bulunduğu kat.."
            min="0"
            value={props.floor > 0 && props.floor}
            onChange={(e) => props.setFloor(e.target.value)}
          />
        </div>
        <div className="sidebar-element">
          <label htmlFor="emlak-sidebar-heating">Isıtma</label>
          <select
            id="emlak-sidebar-heating"
            value={props.heating}
            onChange={(e) => props.setHeating(e.target.value)}
          >
            <option value="">Seçiniz..</option>
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
        <div className="sidebar-element">
          <label htmlFor="emlak-sidebar-furnished">Eşyalı</label>
          <select
            id="emlak-sidebar-furnished"
            value={props.furnished}
            onChange={(e) => props.setFurnished(e.target.value)}
          >
            <option value="">Seçiniz..</option>
            <option value="Hayır">Hayır</option>
            <option value="Evet">Evet</option>
          </select>
        </div>
        <div className="sidebar-element">
          <label htmlFor="emlak-sidebar-usingstate">Kullanım durumu</label>
          <select
            id="emlak-sidebar-usingstate"
            value={props.usingState}
            onChange={(e) => props.setUsingState(e.target.value)}
          >
            <option value="">Seçiniz..</option>
            <option value="Boş">Boş</option>
            <option value="Kiracılı">Kiracılı</option>
            <option value="Mülk sahibi">Mülk sahibi</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default EmlakSidebar;
