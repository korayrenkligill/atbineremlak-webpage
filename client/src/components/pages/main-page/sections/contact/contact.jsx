import React from "react";

import "./contact.css";

function Contact({ users }) {
  return (
    <section className="contact" id="contact">
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
        {users.map((user) => {
          return (
            <div className="person" key={user.id}>
              <div className="profile-name">
                <div
                  className="profile"
                  style={{
                    backgroundImage: `url(${user.profile})`,
                  }}
                />
                <div>
                  <p>
                    {user.name} {user.surname}
                  </p>
                  <span>Yönetici</span>
                </div>
              </div>
              <div className="contact-informations">
                <a href={`tel:${user.phone}`}>
                  <img
                    src="/images/call.png"
                    alt="icon"
                    className="image-icon"
                  />
                  {user.phone}
                </a>
                <a href={`https://wa.me/${user.phone}`}>
                  <img
                    src="/images/whatsapp.png"
                    alt="icon"
                    className="image-icon"
                  />
                  Mesaj Gönder
                </a>
                <a href={`mailto:${user.email}`}>
                  <img
                    src="/images/message.png"
                    alt="icon"
                    className="image-icon"
                  />
                  {user.email}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Contact;
