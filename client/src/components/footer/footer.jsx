import React from "react";
import "./footer.css";
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="top-footer">
        <div className="company-information">
          <div className="company">
            <img src="logo.png" alt="logo" />
            Atbiner Emlak
          </div>
          <div className="contact">
            <a href="https://goo.gl/maps/pVyF8mVh9NBYvBMh9">
              <img src="/images/google-maps.png" alt="icon" /> Yarhasanlar
              Mahallesi Karamızrak Cad. No: 16D, Manisa / Şehzadeler
            </a>
            <a href="tel:+905534421797">
              <img src="/images/call.png" alt="icon" /> +90 553 442 1797
            </a>
            <a href="https://wa.me/+905534421797">
              <img src="/images/whatsapp.png" alt="icon" /> Mesaj Gönder
            </a>
            <a href="mailto:koray.renkligill@gmail.com">
              <img src="/images/message.png" alt="icon" />{" "}
              koray.renkligill@gmail.com
            </a>
          </div>
        </div>
        <div className="navigation">
          <h2>Sayfalar</h2>
          <a href="#">Ana sayfa</a>
          <a href="#">Ev ilanları</a>
          <a href="#">Araba ilanları</a>
        </div>
        <div className="social-medias">
          <h2>Sosyal Medya Adresleri</h2>
          <a href="#">
            <img src="/images/instagram.png" alt="icon" />
            Instagram
          </a>
          <a href="#">
            <img src="/images/facebook.png" alt="icon" />
            Facebook
          </a>
        </div>
      </div>
      <div className="bottom-footer">
        <p>
          &copy; {currentYear}{" "}
          <a href="https://www.korayrenkligil.com" target="blank">
            Koray Renkligil
          </a>
          . Tüm hakları saklıdır. İlan bilgileri ve görsellerinin izinsiz
          kullanılması yasaktır.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
