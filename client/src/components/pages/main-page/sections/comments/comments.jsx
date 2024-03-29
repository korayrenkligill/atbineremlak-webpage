import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./comments.css";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
function Comments() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "linear",
    arrows: false,
  };
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <section className="comments">
      <h1 className="title">Kullanıcı yorumları</h1>
      <div
        className="comments-slider"
        style={{ maxWidth: `${windowSize.innerWidth - 0}px` }}
      >
        <Slider {...settings}>
          <div>
            <div className="comment-container">
              <div className="comment">
                <img
                  src="https://randomuser.me/api/portraits/men/72.jpg"
                  alt=""
                />
                <div className="texts">
                  <h2>Halil Zeybek</h2>
                  <p>
                    Sizinle çalışmak gerçekten keyifliydi ve bana her adımda
                    destek olduğunuzu hissettim.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="comment-container">
              <div className="comment">
                <img
                  src="https://randomuser.me/api/portraits/men/82.jpg"
                  alt=""
                />
                <div className="texts">
                  <h2>Mustafa Efe Yıldız</h2>
                  <p>
                    Sizinle çalışmak gerçekten keyifliydi ve bana her adımda
                    destek olduğunuzu hissettim.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="comment-container">
              <div className="comment">
                <img
                  src="https://randomuser.me/api/portraits/men/86.jpg"
                  alt=""
                />
                <div className="texts">
                  <h2>Koray Renkligil</h2>
                  <p>
                    Sizinle çalışmak gerçekten keyifliydi ve bana her adımda
                    destek olduğunuzu hissettim.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="comment-container">
              <div className="comment">
                <img
                  src="https://randomuser.me/api/portraits/men/12.jpg"
                  alt=""
                />
                <div className="texts">
                  <h2>Muhammet Berk Gülpınar</h2>
                  <p>
                    Sizinle çalışmak gerçekten keyifliydi ve bana her adımda
                    destek olduğunuzu hissettim.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
}

export default Comments;
