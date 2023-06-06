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

function UserAdd() {
  const navigation = useNavigate();

  const [users, setUsers] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
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
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const defaultImage =
      "data:image/png;base64,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";
    let newNumber = "";
    let error = false;
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
    const newUser = {
      id: uuidv4(),
      name: name,
      surname: surname,
      password: password,
      email: email,
      phone: newNumber,
      gender: gender,
      age: age,
      profile: selectedImage ? selectedImage : defaultImage,
    };
    if (!error) {
      axios.post("http://localhost:4000/users", newUser).then(() => {
        navigation("/admin/kullanıcılar/");
        SuccessNotification("Kullanıcı başarıyla eklendi");
      });
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
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
            <img src={selectedImage} alt="Selected" />
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
