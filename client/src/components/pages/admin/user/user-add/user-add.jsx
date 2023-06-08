import React, { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import PasswordInput from "../../../../elements/password-input";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../../elements/toastify";
import { v4 as uuidv4 } from "uuid";
import "./user-add.css";
import { useNavigate } from "react-router-dom";
import {
  BACKEND_URL,
  cloudName,
  uploadPreset,
} from "../../../../elements/config";

function UserAdd() {
  const navigation = useNavigate();

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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let newNumber = "";
    let imageUrl = "";
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
    if (number.length !== 10) {
      ErrorNotification(
        "Doğru bir numara girişi yapılmadı örnek numara: (5112223344)"
      );
      error = true;
    } else {
      newNumber = "+90" + number;
    }
    if (age < 18) {
      ErrorNotification(
        "18 yaşından küçük kullanıcılar için kayıt oluşturulamaz"
      );
      error = true;
    }
    if (users.some((user) => user.email === email)) {
      ErrorNotification("Bu e-postaya sahip bir kullanıcı bulunmakta");
      error = true;
    }
    if (!error) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", uploadPreset); // Cloudinary yükleme ön tanımlaması
      formData.append("folder", "profiles");
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        )
        .then((response) => {
          imageUrl = response.data.secure_url;
          console.log(response.data.secure_url);
        })
        .then(() => {
          const newUser = {
            id: uuidv4(),
            name: name,
            surname: surname,
            password: password,
            email: email,
            phone: newNumber,
            gender: gender,
            age: age,
            profile: imageUrl,
          };
          axios.post(`${BACKEND_URL}/users`, newUser).then(() => {
            console.log(newUser);
            navigation("/admin/kullanıcılar/");
            SuccessNotification("Kullanıcı başarıyla eklendi");
          });
        });
    }
  };
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/users`)
      .then((response) => setUsers(response.data));
  }, []);
  return (
    <div className="user-add">
      <h1 className="admin-title">Kullanıcı Ekle</h1>
      <form className="user-add-form" onSubmit={handleFormSubmit}>
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
          <label htmlFor="user-add-form-number">
            Telefon Numarası <span className="optional">(5554443322)</span>
          </label>
          <input
            type="text"
            placeholder="numara.."
            id="user-add-form-number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
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
          Ekle
        </button>
      </form>
    </div>
  );
}

export default UserAdd;
