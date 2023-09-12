import React from "react";
import "./contact.css";
function ContactPage() {
  return (
    <div className="contact-page">
      <a className="web" href="https://atbineremlak.com">
        atbineremlak.com
      </a>
      <img src="/logo.png" alt="logo" className="logo" />
      <p>
        Tadilatta bizleri tercih ederek, evinizi daha iyi bir yaşam alanına
        dönüştürebilirsiniz. Evinizi daha güvenli, daha konforlu ve daha
        sağlıklı hale getirir evinizi değerine değer katabilirsiniz.
      </p>
      <hr />
      <p className="adres">
        Adres : Yarhasanlar Mahallesi Karamızrak Cad. No: 16D, Manisa /
        Şehzadeler
      </p>
      <hr />
      <a href="tel:+905525961533" className="telefon" target="blank">
        +90 552 596 15 33
      </a>
      <hr />
      <p className="whatsapp-text">
        WhatsApp üzerinden mesajlaşarak sorularınızı dilediğiniz zaman
        iletebilir, ihtiyaç duyduğunuz hizmet ve ürünler hakkında hızla destek
        alabilir ve öğrenmek istediğiniz tüm bilgilere WhatsApp platformu
        üzerinden erişebilirsiniz.
      </p>
      <a
        className="whatsapp-link"
        href="https://wa.me/+905525961533"
        target="blank"
      >
        Whatsapp Destek
      </a>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d194.83839978277953!2d27.425775600704476!3d38.61634685483076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1satbiner%20emlak!5e0!3m2!1str!2str!4v1692276044033!5m2!1str!2str"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default ContactPage;
