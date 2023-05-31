import React from "react";
import "./header.css";
function Header() {
  return (
    <header>
      <div className="header">
        <h1>
          Hayal Ettiğiniz Yaşamı İnşa Edin
          <br /> Lüks Emlaklarımızla Konfor ve Prestijin Keyfini Çıkarın.
        </h1>
        <span>“ Siz hayal edin, Biz gerçekleştirelim ”</span>
        <button>İletişime geç</button>
      </div>
      <div className="frame">
        <img src="/images/estate-illustration.png" alt="" />
      </div>
    </header>
  );
}

export default Header;
