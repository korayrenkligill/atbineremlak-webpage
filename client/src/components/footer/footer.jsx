import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="top-footer">
        <div className="company-information">
          <div className="company">
            <img src="/logo.png" alt="logo" />
            Atbiner Emlak
          </div>
          <div className="contact">
            <a href="https://goo.gl/maps/pVyF8mVh9NBYvBMh9">
              <img src="/images/google-maps.png" alt="icon" /> Yarhasanlar
              Mahallesi Karamızrak Cad. No: 16D, Manisa / Şehzadeler
            </a>
            <a href="tel:+905525961533">
              <img src="/images/call.png" alt="icon" /> +90 552 596 15 33
            </a>
            <a href="https://wa.me/+905525961533">
              <img src="/images/whatsapp.png" alt="icon" /> Mesaj Gönder
            </a>
            <a href="mailto:kaan_kavakli10@hotmail.com">
              <img src="/images/message.png" alt="icon" />{" "}
              kaan_kavakli10@hotmail.com
            </a>
          </div>
        </div>
        <div className="navigation">
          <h2>Sayfalar</h2>
          <Link to="/ana-sayfa">Ana sayfa</Link>
          <Link to="/">Ev ilanları</Link>
          <Link to="/otomobil">Araba ilanları</Link>
          <Link to="/tadilat">Tadilat</Link>
        </div>
        <div className="social-medias">
          <h2>Sosyal Medya Adresleri</h2>
          <a href="https://www.instagram.com/atbineremlakk/" target="blank">
            <img src="/images/instagram.png" alt="icon" />
            Instagram
          </a>
          <a href="https://www.facebook.com/kadir.atbiner.94" target="blank">
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
