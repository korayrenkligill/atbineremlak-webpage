import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./sections/header/header";
import Services from "./sections/services/services";
import PopularListings from "./sections/popular-listings/popular-listings";
import PuffLoader from "react-spinners/PuffLoader";
import Comments from "./sections/comments/comments";
import { Helmet } from "react-helmet";
import "./main-page.css";
import Contact from "./sections/contact/contact";
import { BACKEND_URL } from "../../elements/config";

function MainPage() {
  const [realEstates, setRealEstates] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${BACKEND_URL}/lastest`).then((response) => {
      setRealEstates(response.data);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BACKEND_URL}/users`).then((response) => {
      let usersTemp = response.data.filter((user) => user.id !== "1");
      setUsers(usersTemp);
    });
  }, []);

  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />
      </div>
    );
  return (
    <main className="main-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Atbiner Emlak</title>
        <meta name="author" content="Koray Renkligil" />
        <meta
          name="description"
          content="Manisa’daki en güvenilir emlakçınız! Dükkanımızda, müşterilerimize en iyi hizmeti sunmak için her zaman çalışıyoruz. Geniş portföyümüzde, her bütçeye uygun evler, daireler ve arabalar bulunmaktadır. Bize güvenebilirsiniz!"
        />
        <meta
          name="keywords"
          content="atbineremlak,atbiner emlak,emlak, emlakçı, gayrimenkul, ev, daire, kiralık, satılık, konut, iş yeri, ofis, araba, arazi, manisa, yunusemre, şehzadeler, yenimahalle, muradiye, karaköy"
        />
      </Helmet>
      <Header realEstates={realEstates} />
      <Services />
      <PopularListings realEstates={realEstates} />
      <Comments />
      <Contact users={users} />
    </main>
  );
}

export default MainPage;
