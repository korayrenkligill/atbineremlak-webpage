import React from "react";
import "./services.css";
function Services() {
  return (
    <section className="services">
      <h1 className="title">Hizmetlerimiz</h1>
      <div className="services-list">
        <div className="service">
          <div className="frame">
            <img src="/images/buy-house.png" alt="" />
          </div>
          <div className="texts">
            <h2 className="title">Daire Satışı</h2>
            <p>
              Hayalinizdeki evi satın almak için doğru adrestesiniz. Emlak
              uzmanlarımız, size özel ihtiyaçlarınızı anlamak ve bütçenize uygun
              bir konut bulmak için burada.
            </p>
            <button>Devamı</button>
          </div>
        </div>
        <div className="service">
          <div className="frame">
            <img src="/images/rent-house.png" alt="" />
          </div>
          <div className="texts">
            <h2 className="title">Daire Kiralama</h2>
            <p>
              Sizin için mükemmel daireyi bulmanıza yardımcı olmak için
              buradayız. Geniş portföyümüzde yer alan çeşitli seçenekler
              arasından beklentilerinize uygun bir kiralık daire bulmanızı
              sağlıyoruz.
            </p>
            <button>Devamı</button>
          </div>
        </div>
        <div className="service">
          <div className="frame">
            <img src="/images/buy-car.png" alt="" />
          </div>
          <div className="texts">
            <h2 className="title">Araç Satışı</h2>
            <p>
              Yeni bir araç sahibi olmak istediğinizde sizlere yardımcı
              oluyoruz. Geniş araç seçenekleri arasından istediğiniz marka,
              model ve özelliklere sahip bir aracı bulmanızı sağlıyoruz.
            </p>
            <button>Devamı</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
