import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import ReactQuill from "react-quill";
import "./real-estate-add.css";
function RealEstateAdd() {
  const [selectedImages, setSelectedImages] = useState([]);

  const [content, setContent] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files;
    for (let i = 0; i < file.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(file[i]);

      reader.onload = () => {
        setSelectedImages((oldArray) => [...oldArray, reader.result]);
      };
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(file[i]);
      reader.onload = () => {
        setSelectedImages((oldArray) => [...oldArray, reader.result]);
      };
    }
  };

  const handleFileInputChangeSingle = (e, key) => {
    const file = e.target.files[0];
    const imagesArray = [...selectedImages];
    console.log(key);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        imagesArray[key] = reader.result;
        setSelectedImages(imagesArray);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClearFileInputSingle = (key) => {
    const imagesArray = [...selectedImages];
    const newArray = [];
    for (let i = 0; i < imagesArray.length; i++)
      if (i !== key) newArray.push(imagesArray[i]);
    setSelectedImages(newArray);
  };

  const handleChange = (value) => {
    setContent(value);
  };
  return (
    <div className="real-estate-add">
      <h1 className="admin-title">Konut İlanlaı Ekle</h1>
      <div className="real-estate-add-form">
        <div className="images-list">
          {selectedImages.map((item, key) => {
            return (
              <label htmlFor={`image-selector-single-${key}`} key={key}>
                <div className="frame">
                  <img src={item} alt={`image_${key}`} />
                  <button
                    className="remove-button"
                    onClick={() => {
                      handleClearFileInputSingle(key);
                    }}
                  >
                    <BsFillTrash3Fill className="icon" />
                  </button>
                </div>
                <input
                  id={`image-selector-single-${key}`}
                  type="file"
                  accept="image/*"
                  multiple={true}
                  onChange={(e) => {
                    handleFileInputChangeSingle(e, key);
                  }}
                  style={{ display: "none" }}
                />
              </label>
            );
          })}
          <label
            htmlFor="image-selector"
            className="image-uploader drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="placeholder">
              <BiImageAdd className="icon" />
              <span>Bir resim sürükle veya seç</span>
            </div>
            <input
              id="image-selector"
              type="file"
              accept="image/*"
              multiple={true}
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div className="title form-element">
          <label htmlFor="">İlan başlığı</label>
          <input type="text" placeholder="ilan başlığı giriniz.." />
        </div>
        <div className="description form-element">
          <label htmlFor="">İlan Açıklaması</label>
          <ReactQuill
            value={content}
            onChange={handleChange}
            placeholder="İlan açıklaması giriniz.."
          />
        </div>
        <div className="Type form-element">
          <label htmlFor="">İlan türü</label>
          <select>
            <option value="Test">Satılık</option>
            <option value="Test">Kiralık</option>
          </select>
        </div>
        <div className="area form-element-double">
          <span>
            <label htmlFor="">m² (brüt)</label>
            <input type="text" placeholder="120m²" />
          </span>
          <span>
            <label htmlFor="">m² (net)</label>
            <input type="text" placeholder="110m²" />
          </span>
        </div>
        <div className="room-count form-element">
          <label htmlFor="">Oda sayısı</label>
          <select>
            <option value="Test">Stüdyo (1 + 0)</option>
            <option value="Test">1 + 1</option>
            <option value="Test">1.5 + 1</option>
            <option value="Test">2 + 0</option>
            <option value="Test">2 + 1</option>
            <option value="Test">2.5 + 1</option>
            <option value="Test">2 + 2</option>
            <option value="Test">3 + 0</option>
            <option value="Test">3 + 1</option>
            <option value="Test">3.5 + 1</option>
            <option value="Test">3 + 2</option>
            <option value="Test">3 + 3</option>
            <option value="Test">4 + 0</option>
            <option value="Test">4 + 1</option>
            <option value="Test">4.5 + 1</option>
            <option value="Test">4 + 2</option>
            <option value="Test">4 + 3</option>
            <option value="Test">4 + 4</option>
            <option value="Test">5 + 1</option>
            <option value="Test">5.5 + 1</option>
            <option value="Test">5 + 2</option>
            <option value="Test">5 + 3</option>
            <option value="Test">5 + 4</option>
            <option value="Test">6 + 1</option>
            <option value="Test">6.5 + 1</option>
            <option value="Test">6 + 2</option>
            <option value="Test">6 + 3</option>
            <option value="Test">6 + 4</option>
            <option value="Test">7 + 1</option>
            <option value="Test">7 + 2</option>
            <option value="Test">7 + 3</option>
            <option value="Test">8 + 1</option>
            <option value="Test">8 + 2</option>
            <option value="Test">8 + 3</option>
            <option value="Test">8 + 4</option>
            <option value="Test">9 + 1</option>
            <option value="Test">9 + 2</option>
            <option value="Test">9 + 3</option>
            <option value="Test">9 + 4</option>
            <option value="Test">9 + 5</option>
            <option value="Test">9 + 6</option>
            <option value="Test">10 + 1</option>
            <option value="Test">10 + 2</option>
            <option value="Test">10 üzeri</option>
          </select>
        </div>
        <div className="age form-element">
          <label htmlFor="">Bina yaşı</label>
          <select>
            <option value="">0</option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5-10 arası</option>
            <option value="">11-15 arası</option>
            <option value="">16-20 arası</option>
            <option value="">21-25 arası</option>
            <option value="">26-30 arası</option>
            <option value="">31 ve üzeri</option>
          </select>
        </div>
        <div className="floor form-element">
          <label htmlFor="">Bulunduğu kat</label>
          <input type="number" placeholder="bulunduğu kat.." />
        </div>
        <div className="total-floo form-element">
          <label htmlFor="">Toplam kat sayısı</label>
          <input type="number" placeholder="toplam kat.." />
        </div>
        <div className="heating form-element">
          <label htmlFor="">Isıtma</label>
          <select>
            <option value="">Yok</option>
            <option value="">Soba</option>
            <option value="">Doğalgaz sobası</option>
            <option value="">Kat kaloriferi</option>
            <option value="">Merkezi</option>
            <option value="">Merkezi (Pay Ölçer)</option>
            <option value="">Kombi (Doğalgaz)</option>
            <option value="">Kombi (Elektrik)</option>
            <option value="">Yerden ısıtma</option>
            <option value="">Klima</option>
            <option value="">Güneş enerjisi</option>
            <option value="">Şömine</option>
          </select>
        </div>
        <div className="bathroom-count form-element">
          <label htmlFor="">Banyo sayısı</label>
          <input type="number" placeholder="banyo sayısı.." />
        </div>
        <div className="balcony form-element">
          <label htmlFor="">Balkon</label>
          <select>
            <option value="">Var</option>
            <option value="">Yok</option>
          </select>
        </div>
        <div className="esyali form-element">
          <label htmlFor="">Eşyalı</label>
          <select>
            <option value="">Evet</option>
            <option value="">Hayır</option>
          </select>
        </div>
        <div className="kullanim-durumu form-element">
          <label htmlFor="">Kullanım durumu</label>
          <select>
            <option value="">Boş</option>
            <option value="">Kiracılı</option>
            <option value="">Mülk sahibi</option>
          </select>
        </div>
        <div className="site-icerisinde form-element">
          <label htmlFor="">Site içerisinde</label>
          <select>
            <option value="">Evet</option>
            <option value="">Hayır</option>
          </select>
        </div>
        <div className="side-adi form-element">
          <label htmlFor="">Site adı</label>
          <input type="text" placeholder="site adı.." />
        </div>
        <div className="aidat form-element">
          <label htmlFor="">Aidat (₺)</label>
          <input type="number" placeholder="70₺.." />
        </div>
        <div className="krediye-uygun form-element">
          <label htmlFor="">Krediye Uygun</label>
          <select>
            <option value="">Evet</option>
            <option value="">Hayır</option>
          </select>
        </div>
        <div className="tapu-durumu form-element">
          <label htmlFor="">Tapu durumu</label>
          <select>
            <option value="">Bilinmiyor</option>
            <option value="">Kat Mülkiyetli</option>
            <option value="">Kat İrtifaklı</option>
            <option value="">Hisseli Tapulu</option>
            <option value="">Müstakil Tapulu</option>
            <option value="">Arsa Tapulu</option>
          </select>
        </div>
        <div className="takas form-element">
          <label htmlFor="">Takas</label>
          <select>
            <option value="">Evet</option>
            <option value="">Hayır</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default RealEstateAdd;
