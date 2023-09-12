import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import ReactQuill from "react-quill";
import YouTube from "react-youtube";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../../elements/toastify";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./tadilat-add.css";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../../elements/config";
import PuffLoader from "react-spinners/PuffLoader";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";

function TadilatAdd({ user }) {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const [selectedOldImages, setSelectedOldImages] = useState([]);
  const [selectedOldImagesPreview, setSelectedOldImagesPreview] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [advertiserName, setAdvertiserName] = useState("");
  const [advertiserSurname, setAdvertiserSurname] = useState("");
  const [advertiserPhone, setAdvertiserPhone] = useState("");
  const [advertiserNote, setAdvertiserNote] = useState("");

  const imagesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const [currentImages, setCurrentImages] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([1]);

  const showPeginate = (list, page = 1) => {
    const indexOfLastImage = page * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImagesTemp = list.slice(indexOfFirstImage, indexOfLastImage);
    setCurrentImages(currentImagesTemp);
    const pageNumbersTemp = [];
    // console.log(
    //   list.length,
    //   imagesPerPage,
    //   list.length / imagesPerPage,
    //   Math.ceil(list.length / imagesPerPage)
    // );
    for (let i = 1; i <= Math.ceil(list.length / imagesPerPage); i++) {
      pageNumbersTemp.push(i);
      if (i === Math.ceil(list.length / imagesPerPage)) {
        console.log(pageNumbersTemp);
        setPageNumbers(pageNumbersTemp);
      }
    }
    setCurrentPage(page);
  };
  const paginate = (pageNumber) => {
    var listTemp = selectedOldImagesPreview;
    showPeginate(listTemp, pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleDrop = (e, state) => {
    e.preventDefault();
    const file = e.dataTransfer.files;
    if (file.length + selectedOldImages.length < 26) {
      setSelectedOldImages((oldArray) => [...oldArray, ...file]);
      var list2Temp = [];
      var selectedImagesPreviewTemp = selectedOldImagesPreview;
      for (let i = 0; i < file.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(file[i]);

        reader.onload = () => {
          setSelectedOldImagesPreview((oldArray) => [
            ...oldArray,
            reader.result,
          ]);
          list2Temp.push(reader.result);
          if (i === file.length - 1) {
            //Döngü sonunda
            var listTemp = selectedImagesPreviewTemp.concat(list2Temp);
            showPeginate(listTemp);
          }
        };
        toast.success("Resimler başarıyla yüklendi", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      ErrorNotification("En fazla 25 resim yükleyebilirsin!");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e, state) => {
    const file = e.target.files;
    if (file.length + selectedOldImages.length < 26) {
      setSelectedOldImages((oldArray) => [...oldArray, ...file]);
      var list2Temp = [];
      var selectedImagesPreviewTemp = selectedOldImagesPreview;
      for (let i = 0; i < file.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(file[i]);
        reader.onload = () => {
          setSelectedOldImagesPreview((oldArray) => [
            ...oldArray,
            reader.result,
          ]);
          list2Temp.push(reader.result);
          if (i === file.length - 1) {
            //Döngü sonunda
            var listTemp = selectedImagesPreviewTemp.concat(list2Temp);
            showPeginate(listTemp);
          }
        };
        toast.success("Resimler başarıyla yüklendi", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      ErrorNotification("En fazla 25 resim yükleyebilirsin!");
    }
  };

  const handleFileInputChangeSingle = (e, key, state) => {
    const file = e.target.files[0];
    const imagesPreviewArray = [...selectedOldImagesPreview];
    const imagesArray = [...selectedOldImages];
    if (file && file.type.startsWith("image/")) {
      imagesArray[key] = file;
      setSelectedOldImages(imagesArray);
      const reader = new FileReader();
      reader.onload = () => {
        imagesPreviewArray[key] = reader.result;
        setSelectedOldImagesPreview(imagesPreviewArray);
        showPeginate(imagesPreviewArray);
        toast.success("Resim başarıyla değiştirildi", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClearFileInputSingle = (key, state) => {
    const imagesPreviewArray = [...selectedOldImagesPreview];
    const imagesArray = [...selectedOldImages];
    const newArrayPreview = [];
    const newArray = [];
    for (let i = 0; i < imagesArray.length; i++)
      if (i !== key) {
        newArrayPreview.push(imagesPreviewArray[i]);
        newArray.push(imagesArray[i]);
      }
    setSelectedOldImagesPreview(newArrayPreview);
    setSelectedOldImages(newArray);
    showPeginate(newArrayPreview);
    toast.success("Resim başarıyla kaldırıldı", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("id", uuidv4());
    formData.append("title", title);
    formData.append("description", content);
    formData.append("advertiserName", advertiserName);
    formData.append("advertiserSurname", advertiserSurname);
    formData.append("advertiserNote", advertiserNote);
    selectedOldImages.forEach((oldImage) => {
      formData.append(`oldImages`, oldImage);
    });
    try {
      await axios
        .post(`${BACKEND_URL}/tadilat`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          SuccessNotification("İlan başarıyla eklendi");
          navigation("/admin/konutlar/");
        })
        .catch(() => {
          ErrorNotification(
            "İlan eklenirken hata ile karşılaşıldı tekrar deneyiniz"
          );
        });
      console.log("Resimler yüklendi!");
    } catch (error) {
      console.error("Resimler yüklenirken bir hata oluştu:", error);
    }
  };
  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />
        <h2>Tadilat yayınlanıyor</h2>
        <p>
          "bu işlem seçilen fotoğraf sayısına bağlı olarak biraz zaman alabilir
          sabrınız için teşekkürler"
        </p>
      </div>
    );
  return (
    <div className="real-estate-add">
      <h1 className="admin-title">Tadilat Ekle</h1>
      <form className="real-estate-add-form" onSubmit={handleSubmit}>
        <div className="images-list">
          {currentImages.map((item, key) => {
            return (
              <label htmlFor={`old-image-selector-single-${key}`} key={key}>
                <div className="frame">
                  <img src={item} alt={`image_${key}`} />
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => {
                      handleClearFileInputSingle(
                        imagesPerPage * (currentPage - 1) + key,
                        "old"
                      );
                    }}
                  >
                    <BsFillTrash3Fill className="icon" />
                  </button>
                </div>
                <input
                  id={`old-image-selector-single-${key}`}
                  type="file"
                  accept="image/*"
                  multiple={true}
                  onChange={(e) => {
                    handleFileInputChangeSingle(
                      e,
                      imagesPerPage * (currentPage - 1) + key,
                      "old"
                    );
                  }}
                  style={{ display: "none" }}
                />
              </label>
            );
          })}
          {pageNumbers.length === currentPage && (
            <label
              htmlFor="image-selector"
              className="image-uploader drop-area"
              onDrop={(e) => {
                handleDrop(e, "old");
              }}
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
                onChange={(e) => {
                  handleFileInputChange(e, "old");
                }}
                style={{ display: "none" }}
              />
            </label>
          )}
        </div>
        <div className="paginateButtons">
          {pageNumbers.map((number) => {
            return (
              <button
                type="button"
                key={number}
                onClick={() => {
                  paginate(number);
                }}
                className={`paginateButton ${
                  number === currentPage && "active"
                }`}
              >
                {number}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="clear-all-images-button"
          onClick={() => {
            setSelectedOldImages([]);
            setSelectedOldImagesPreview([]);
          }}
        >
          <BsFillTrash3Fill className="icon" /> Tüm resimleri kaldır
        </button>
        <div className="title form-element">
          <label htmlFor="real-estate-add-form-title">Tadilat başlığı</label>
          <input
            type="text"
            placeholder="ilan başlığı giriniz.."
            id="real-estate-add-form-title"
            minLength="0"
            maxLength="80"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <p className="element-description">
            "Ana sayfada görünecek olan başlıktır. Kısa ve öz olması tavsiye
            edilir."
          </p>
        </div>
        <div className="description form-element">
          <label>
            Tadilat Açıklaması <span className="optional">( Opsiyonel )</span>
          </label>
          <ReactQuill
            value={content}
            onChange={handleChange}
            placeholder="İlan açıklaması giriniz.."
          />
          <p className="element-description">
            "Tadilatı tanıtabilir yapılan işlemlerden bahsedebilirsiniz."
            <br />
            "Açıklama bölümüne şahsi iletişim adresi veya şirket ismi
            yazılmamalıdır."
          </p>
        </div>
        <hr />
        <p className="element-description">
          "Tadilat hakkında not alabileceğiniz bu bölümdeki yazıları yalnızca
          yetkililer görebilir"
          <br />
          "Bilgilerin bilinmemesi veya girilmeye gerek duyulmaması durumunda boş
          bırakılabilir"
        </p>
        <div className="area form-element-double">
          <span>
            <label htmlFor="real-estate-add-form-advertiser-name">
              Tadilat Sahibinin Adı
              <span className="optional">(Opsiyonel)</span>
            </label>
            <input
              id="real-estate-add-form-advertiser-name"
              type="text"
              placeholder="ilan sahibi adı.."
              value={advertiserName}
              onChange={(e) => {
                setAdvertiserName(e.target.value);
              }}
            />
          </span>
          <span>
            <label htmlFor="real-estate-add-form-advertiser-surname">
              Tadilat Sahibinin Soyadı
              <span className="optional">(Opsiyonel)</span>
            </label>
            <input
              id="real-estate-add-form-advertiser-surname"
              type="text"
              placeholder="ilan sahibi soyadı.."
              value={advertiserSurname}
              onChange={(e) => {
                setAdvertiserSurname(e.target.value);
              }}
            />
          </span>
        </div>
        <div className="form-element">
          <label htmlFor="real-estate-add-form-advertiser-phone">
            Tadilat Sahibinin Numarası
            <span className="optional">(Opsiyonel)</span>
          </label>
          <PhoneInput
            country={"tr"}
            value={advertiserPhone}
            onChange={(phone) => setAdvertiserPhone(phone)}
          />
        </div>
        <div className="form-element">
          <label htmlFor="real-estate-add-form-advertiser-note">
            Tadilat Notu
            <span className="optional">(Opsiyonel)</span>
          </label>
          <textarea
            rows="10"
            id="real-estate-add-form-advertiser-note"
            type="text"
            placeholder="ilan notu.."
            value={advertiserNote}
            onChange={(e) => {
              setAdvertiserNote(e.target.value);
            }}
          ></textarea>
        </div>
        <button className="submit-button" type="submit">
          Ekle
        </button>
      </form>
    </div>
  );
}

export default TadilatAdd;
