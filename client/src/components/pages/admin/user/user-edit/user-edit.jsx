import React, { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import PasswordInput from "../../../../elements/password-input";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../../elements/toastify";
import { useNavigate, useParams } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";

import "./user-edit.css";
import {
  BACKEND_URL,
  apiKey,
  apiSecret,
  cloudName,
  uploadPreset,
} from "../../../../elements/config";
import PhoneInput from "react-phone-input-2";

const extractPublicIdFromImageUrl = (imageUrl) => {
  // Cloudinary URL'sinden public_id'yi çıkarma
  const regex = /\/([^/]+)\.[^.]+$/;
  const match = imageUrl.match(regex);
  if (match && match.length >= 2) {
    return match[1];
  }
  return null;
};

function UserEdit() {
  const navigation = useNavigate();
  const id = useParams().id;
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("Erkek");
  const [age, setAge] = useState(0);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setSelectedImagePreview(reader.result);
    };
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setSelectedImagePreview(reader.result);
    };
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let newNumber = "";
    let error = false;
    if (selectedImage === null) {
      ErrorNotification("Bir resim seçmelisin");
      error = true;
    }
    if (name.length <= 2) {
      ErrorNotification("Daha uzun bir isim girmelisin");
      error = true;
    }
    if (surname.length <= 2) {
      ErrorNotification("Daha uzun bir soyisim girmelisin");
      error = true;
    }
    if (email.length <= 2) {
      ErrorNotification("Daha uzun bir e-posta girmelisin");
      error = true;
    }
    if (password.length <= 2) {
      ErrorNotification("Daha uzun bir şifre girmelisin");
      error = true;
    }
    if (password !== password2) {
      ErrorNotification("Girilen şifreler eşleşmiyor");
      error = true;
    }
    if (number.length !== 12) {
      ErrorNotification("Doğru bir numara girişi yapılmadı");
      error = true;
    } else {
      newNumber = "+" + number;
    }
    if (age < 18) {
      ErrorNotification(
        "18 yaşından küçük kullanıcılar için kayıt oluşturulamaz"
      );
      error = true;
    }
    if (users.some((user) => user.email === email && user.id !== id)) {
      ErrorNotification("Bu e-postaya sahip bir kullanıcı bulunmakta");
      error = true;
    }
    if (!error) {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("name", name);
      formData.append("surname", surname);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("phone", newNumber);
      formData.append("gender", gender);
      formData.append("age", age.toString());
      formData.append(`images`, selectedImage);
      try {
        await axios
          .put(`${BACKEND_URL}/users/${user.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            SuccessNotification("Kullanıcı başarıyla eklendi");
            navigation("/admin/kullanıcılar/");
          })
          .catch(() => {
            ErrorNotification(
              "Kullanıcı eklenirken hata ile karşılaşıldı tekrar deneyiniz"
            );
            navigation("/admin/kullanıcılar/");
          });
        console.log("Resimler yüklendi!");
      } catch (error) {
        console.error("Resimler yüklenirken bir hata oluştu:", error);
      }
    }
  };
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/users`)
      .then((response) => {
        setUsers(response.data);
        const innerUser = response.data.find((u) => u.id == id);
        if (innerUser != null) {
          setUser(innerUser);
          setSelectedImagePreview(innerUser.profile);
          setSelectedImage(innerUser.profile);
          setName(innerUser.name);
          setSurname(innerUser.surname);
          setEmail(innerUser.email);
          setPassword(innerUser.password);
          setPassword2(innerUser.password);
          setNumber(innerUser.phone.slice(1));
          setGender(innerUser.gender);
          setAge(innerUser.age);
        } else {
          navigation("/");
        }
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />;
      </div>
    );
  else
    return (
      <div className="user-edit">
        <h1 className="admin-title">Kullanıcı Düzenle</h1>
        <form className="user-edit-form" onSubmit={handleFormSubmit}>
          <label
            htmlFor="image-selector"
            className="image-uploader drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {selectedImage ? (
              <img src={selectedImagePreview} alt="Selected" />
            ) : (
              <div className="placeholder">
                <BiImageAdd className="icon" />
              </div>
            )}
            <input
              id="image-selector"
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />
          </label>
          <div className="title form-element-double">
            <span>
              <label htmlFor="user-add-form-name">İsim</label>
              <input
                type="text"
                placeholder="isim.."
                id="user-add-form-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </span>
            <span>
              <label htmlFor="user-add-form-surname">Soyisim</label>
              <input
                type="text"
                placeholder="soyisim.."
                id="user-add-form-surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </span>
          </div>
          <div className="title form-element">
            <label htmlFor="user-add-form-email">E-posta</label>
            <input
              type="email"
              placeholder="eposta.."
              id="user-add-form-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="title form-element-double">
            <span>
              <label htmlFor="user-add-form-password">Şifre</label>
              <PasswordInput
                id="user-add-form-password"
                password={password}
                setPassword={setPassword}
              />
            </span>
            <span>
              <label htmlFor="user-add-form-password-again">Şifre Tekrar</label>
              <PasswordInput
                id="user-add-form-password-again"
                password={password2}
                setPassword={setPassword2}
              />
            </span>
          </div>
          <div className="title form-element">
            <label htmlFor="user-add-form-number">Telefon Numarası</label>
            <PhoneInput
              country={"tr"}
              value={number}
              onChange={(phone) => setNumber(phone)}
            />
          </div>
          <div className="title form-element">
            <label htmlFor="user-add-form-gender">Cinsiyet</label>
            <select
              id="user-add-form-gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Erkek</option>
              <option>Kadın</option>
            </select>
          </div>
          <div className="title form-element">
            <label htmlFor="user-add-form-age">Yaş</label>
            <input
              type="number"
              placeholder="yaş.."
              id="user-add-form-age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="submit-button" type="submit">
            Kaydet
          </button>
        </form>
      </div>
    );
}

export default UserEdit;
