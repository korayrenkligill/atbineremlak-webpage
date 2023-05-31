import React from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { RiWhatsappFill } from "react-icons/ri";

import "./contact.css";

function Contact() {
  return (
    <section className="contact">
      <h1 className="title">İletişim seçenekleri</h1>
      <div className="contact-container">
        <div className="contact-form">
          <div className="name-surname">
            <div>
              <label htmlFor="">İsim</label>
              <input type="text" placeholder="Koray" />
            </div>
            <div>
              <label htmlFor="">Soyisim</label>
              <input type="text" placeholder="Renkligil" />
            </div>
          </div>
          <div>
            <label htmlFor="">E-posta</label>
            <input type="text" placeholder="korayrenkligill@gmail.com" />
          </div>
          <div>
            <label htmlFor="">Mesaj</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="15"
              placeholder="Merhabalar sizlere bir konu için danışmak istedim.."
            ></textarea>
          </div>
          <button>Gönder</button>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d194.83846693702355!2d27.425809013203512!3d38.61632213149176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2str!4v1685518145894!5m2!1str!2str"
          loading="lazy"
        ></iframe>
      </div>
      <div className="numbers">
        <div className="person">
          <div className="profile-name">
            <div
              className="profile"
              style={{
                backgroundImage: `url(https://randomuser.me/api/portraits/men/79.jpg)`,
              }}
            />
            <div>
              <p>Name Surname</p>
              <span>Position</span>
            </div>
          </div>
          <div className="contact-informations">
            <a href="tel:+905534421797">
              <img src="/images/call.png" alt="icon" className="image-icon" />
              +90 553 442 1797
            </a>
            <a href="https://wa.me/+905534421797">
              <img
                src="/images/whatsapp.png"
                alt="icon"
                className="image-icon"
              />
              Mesaj Gönder
            </a>
            <a href="mailto:koray.renkligill@gmail.com">
              <img
                src="/images/message.png"
                alt="icon"
                className="image-icon"
              />
              koray.renkligill@gmail.com
            </a>
          </div>
        </div>
        <div className="person">
          <div className="profile-name">
            <div
              className="profile"
              style={{
                backgroundImage: `url(https://randomuser.me/api/portraits/men/81.jpg)`,
              }}
            />
            <div>
              <p>Name Surname</p>
              <span>Position</span>
            </div>
          </div>
          <div className="contact-informations">
            <a href="tel:+905534421797">
              <img src="/images/call.png" alt="icon" className="image-icon" />
              +90 553 442 1797
            </a>
            <a href="https://wa.me/+905534421797">
              <img
                src="/images/whatsapp.png"
                alt="icon"
                className="image-icon"
              />
              Mesaj Gönder
            </a>
            <a href="mailto:korayrenkligill@gmail.com">
              <img
                src="/images/message.png"
                alt="icon"
                className="image-icon"
              />
              korayrenkligill@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
