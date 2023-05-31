import React from "react";
import { BsHandIndexThumb } from "react-icons/bs";
import "./popular-listings.css";

const popularListings = [
  {
    image:
      "https://www.thehousedesigners.com/images/uploads/SiteImage-Landing-modern-house-plans-1.webp",
    title: "Title",
    roomCount: "3+1",
    area: 120,
    age: "5-10 arası",
    floorLocation: 11,
  },
  {
    image:
      "https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
    title: "Title",
    roomCount: "3+1",
    area: 120,
    age: "5-10 arası",
    floorLocation: 11,
  },
  {
    image:
      "https://cdn.houseplansservices.com/product/tahbfmakhok6k787jtmjm3ecgt/w620x413.png?v=9",
    title: "Title",
    roomCount: "3+1",
    area: 120,
    age: "5-10 arası",
    floorLocation: 11,
  },
  {
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    title: "Title",
    roomCount: "3+1",
    area: 120,
    age: "5-10 arası",
    floorLocation: 11,
  },
  {
    image:
      "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607",
    title: "Title",
    roomCount: "3+1",
    area: 120,
    age: "5-10 arası",
    floorLocation: 11,
  },
];

function PopularListings() {
  return (
    <section className="popular-listings">
      <h1 className="title">Popüler ilanlar</h1>
      <div className="real-estate-listings">
        {popularListings.map((item, key) => {
          return (
            <div className="list-item" key={key}>
              <div
                className="image-background"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              >
                <div>
                  <BsHandIndexThumb className="icon" />
                </div>
              </div>
              <h3>{item.title}</h3>
              <p>Oda sayısı: {item.roomCount}</p>
              <p>m² (Net): {item.area}</p>
              <p>Bina yaşı: {item.age}</p>
              <p>Bulunduğu kat: {item.floorLocation}</p>
              <button>İlana git</button>
            </div>
          );
        })}
      </div>
      <div className="more-container">
        <button className="more">Devamı</button>
      </div>
    </section>
  );
}

export default PopularListings;
