import React from "react";
import Header from "./sections/header/header";
import Services from "./sections/services/services";
import PopularListings from "./sections/popular-listings/popular-listings";
import Comments from "./sections/comments/comments";
//CSS
import "./main-page.css";
import Contact from "./sections/contact/contact";

function MainPage() {
  return (
    <main className="main-page">
      <Header />
      <Services />
      <PopularListings />
      <Comments />
      <Contact />
    </main>
  );
}

export default MainPage;
