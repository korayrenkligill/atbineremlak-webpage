import React from "react";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import "./real-estate-list.css";
import { Link } from "react-router-dom";
function RealEstateList() {
  return (
    <div className="real-estate-list">
      <h1 className="admin-title">Konut İlanları Listesi</h1>
      <div className="items-list">
        <div className="item">
          <button className="remove-item-button">
            <BsFillTrash3Fill />
          </button>
          <div
            className="image-background"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1612965607446-25e1332775ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGl2aW5ncm9vbXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80)`,
            }}
          />
          <div className="item-information">
            <h3>Title</h3>
            <p>Oda sayısı: 3+1</p>
            <p>m² (Net): 120</p>
            <p>Bina yaşı: 5-10 arası</p>
            <p>Bulunduğu kat: 11</p>
          </div>
          <Link className="edit-item-button">
            <BsPencilSquare />
            İlanı Düzenle
          </Link>
        </div>
        <div className="item">
          <button className="remove-item-button">
            <BsFillTrash3Fill />
          </button>
          <div
            className="image-background"
            style={{
              backgroundImage: `url(https://hips.hearstapps.com/hmg-prod/images/melanie-pounds-mountain-brook-house-tour-living-room-fireplace-jpg-1623351404.jpg)`,
            }}
          />
          <div className="item-information">
            <h3>Title</h3>
            <p>Oda sayısı: 3+1</p>
            <p>m² (Net): 120</p>
            <p>Bina yaşı: 5-10 arası</p>
            <p>Bulunduğu kat: 11</p>
          </div>
          <Link className="edit-item-button">
            <BsPencilSquare />
            İlanı Düzenle
          </Link>
        </div>
        <div className="item">
          <button className="remove-item-button">
            <BsFillTrash3Fill />
          </button>
          <div
            className="image-background"
            style={{
              backgroundImage: `url(https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2f9e2f107360739.5fa521b236457.jpg)`,
            }}
          />
          <div className="item-information">
            <h3>Title</h3>
            <p>Oda sayısı: 3+1</p>
            <p>m² (Net): 120</p>
            <p>Bina yaşı: 5-10 arası</p>
            <p>Bulunduğu kat: 11</p>
          </div>
          <Link className="edit-item-button">
            <BsPencilSquare />
            İlanı Düzenle
          </Link>
        </div>
        <div className="item">
          <button className="remove-item-button">
            <BsFillTrash3Fill />
          </button>
          <div
            className="image-background"
            style={{
              backgroundImage: `url(https://mir-s3-cdn-cf.behance.net/project_modules/hd/e920f9121965701.60d09102967e3.jpg)`,
            }}
          />
          <div className="item-information">
            <h3>Title</h3>
            <p>Oda sayısı: 3+1</p>
            <p>m² (Net): 120</p>
            <p>Bina yaşı: 5-10 arası</p>
            <p>Bulunduğu kat: 11</p>
          </div>
          <Link className="edit-item-button">
            <BsPencilSquare />
            İlanı Düzenle
          </Link>
        </div>
        <div className="item">
          <button className="remove-item-button">
            <BsFillTrash3Fill />
          </button>
          <div
            className="image-background"
            style={{
              backgroundImage: `url(https://st.hzcdn.com/simgs/12e14b88001af647_4-3192/beach-style-living-room.jpg)`,
            }}
          />
          <div className="item-information">
            <h3>Title</h3>
            <p>Oda sayısı: 3+1</p>
            <p>m² (Net): 120</p>
            <p>Bina yaşı: 5-10 arası</p>
            <p>Bulunduğu kat: 11</p>
          </div>
          <Link className="edit-item-button">
            <BsPencilSquare />
            İlanı Düzenle
          </Link>
        </div>
        <div className="item">
          <button className="remove-item-button">
            <BsFillTrash3Fill />
          </button>
          <div
            className="image-background"
            style={{
              backgroundImage: `url(https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/472a7849052237.58a9ed278937e.jpg)`,
            }}
          />
          <div className="item-information">
            <h3>Title</h3>
            <p>Oda sayısı: 3+1</p>
            <p>m² (Net): 120</p>
            <p>Bina yaşı: 5-10 arası</p>
            <p>Bulunduğu kat: 11</p>
          </div>
          <Link className="edit-item-button">
            <BsPencilSquare />
            İlanı Düzenle
          </Link>
        </div>
        <div className="item">
          <button className="remove-item-button">
            <BsFillTrash3Fill />
          </button>
          <div
            className="image-background"
            style={{
              backgroundImage: `url(https://www.ikea.com/images/a-light-living-room-centred-around-a-jaettebo-three-and-a-ha-d80334e03b4e4094d0e02846c7de2e85.jpg)`,
            }}
          />
          <div className="item-information">
            <h3>Title</h3>
            <p>Oda sayısı: 3+1</p>
            <p>m² (Net): 120</p>
            <p>Bina yaşı: 5-10 arası</p>
            <p>Bulunduğu kat: 11</p>
          </div>
          <Link className="edit-item-button">
            <BsPencilSquare />
            İlanı Düzenle
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RealEstateList;
