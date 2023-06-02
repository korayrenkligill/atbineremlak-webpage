import React from "react";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import "./car-list.css";
import { Link } from "react-router-dom";
function CarList() {
  return (
    <div className="car-list">
      <h1 className="admin-title">Otomobil İlanları Listesi</h1>
      <div className="items-list">
        <div className="item">
          <button className="remove-item-button">
            <BsFillTrash3Fill />
          </button>
          <div
            className="image-background"
            style={{
              backgroundImage: `url(https://cdn.otopark.com/wp-content/uploads/2020/06/bmw-4er-coupe-2020.jpg)`,
            }}
          />
          <div className="item-information">
            <h3>Title</h3>
            <p>Model: model</p>
            <p>Motor: 90cc</p>
            <p>KM: 140.000</p>
            <p>Fiyat: 450.000</p>
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
              backgroundImage: `url(https://cdn.motor1.com/images/mgl/2X8nx/s3/peugeot-3008-restyle-2020.jpg)`,
            }}
          />
          <div className="item-information">
            <h3>Title</h3>
            <p>Model: model</p>
            <p>Motor: 90cc</p>
            <p>KM: 140.000</p>
            <p>Fiyat: 450.000</p>
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
              backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Peugeot_301_1.6_HDi_Allure_2014_%2814194363316%29.jpg/640px-Peugeot_301_1.6_HDi_Allure_2014_%2814194363316%29.jpg)`,
            }}
          />
          <div className="item-information">
            <h3>Title</h3>
            <p>Model: model</p>
            <p>Motor: 90cc</p>
            <p>KM: 140.000</p>
            <p>Fiyat: 450.000</p>
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
              backgroundImage: `url(https://i0.shbdn.com/photos/28/31/56/x5_1103283156sfh.jpg)`,
            }}
          />
          <div className="item-information">
            <h3>Title</h3>
            <p>Model: model</p>
            <p>Motor: 90cc</p>
            <p>KM: 140.000</p>
            <p>Fiyat: 450.000</p>
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
              backgroundImage: `url(https://i.dunya.com/storage/files/images/2023/02/09/sifir-model-tofas-uretimi-etiyopy-1F1p_cover.png)`,
            }}
          />
          <div className="item-information">
            <h3>Title</h3>
            <p>Model: model</p>
            <p>Motor: 90cc</p>
            <p>KM: 140.000</p>
            <p>Fiyat: 450.000</p>
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
              backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/3/39/Renault_12TSW_Toros_front.jpg)`,
            }}
          />
          <div className="item-information">
            <h3>Title</h3>
            <p>Model: model</p>
            <p>Motor: 90cc</p>
            <p>KM: 140.000</p>
            <p>Fiyat: 450.000</p>
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

export default CarList;
