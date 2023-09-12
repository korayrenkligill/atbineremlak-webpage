import React, { useEffect, useState } from "react";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../../../elements/toastify";
import { FaSave } from "react-icons/fa";

import "./theme-colors.css";
import { BACKEND_URL } from "../../../../elements/config";
function ThemeColors(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [chosenTheme, setChosenTheme] = useState("acik");

  const [primaryColor, setPrimaryColor] = useState("#1f1f1f");
  const [secondaryColor, setSecondaryColor] = useState("#575757");
  const [tertiaryColor, setTertiaryColor] = useState("#808080");
  const [quaternaryColor, setQuaternaryColor] = useState("#bbbbbb");
  const [fifthColor, setFifthColor] = useState("#f5f5f5");

  const [primaryBackgroundColor, setPrimaryBackgroundColor] =
    useState("#ffffff");
  const [secondaryBackgroundColor, setSecondaryBackgroundColor] =
    useState("#f9f9f9");
  const [tertiaryBackgroundColor, setTertiaryBackgroundColor] =
    useState("#dfdfdf");
  const [quaternaryBackgroundColor, setQuaternaryBackgroundColor] =
    useState("#d3d3d3");

  const changeThemeSelect = (selected) => {
    if (selected === "acik") {
      setChosenTheme(selected);
      setPrimaryColor(props.lightPrimaryColor);
      setSecondaryColor(props.lightSecondaryColor);
      setTertiaryColor(props.lightTertiaryColor);
      setQuaternaryColor(props.lightQuaternaryColor);
      setFifthColor(props.lightFifthColor);
      setPrimaryBackgroundColor(props.lightPrimaryBackgroundColor);
      setSecondaryBackgroundColor(props.lightSecondaryBackgroundColor);
      setTertiaryBackgroundColor(props.lightTertiaryBackgroundColor);
      setQuaternaryBackgroundColor(props.lightQuaternaryBackgroundColor);
    } else {
      setChosenTheme(selected);
      setPrimaryColor(props.darkPrimaryColor);
      setSecondaryColor(props.darkSecondaryColor);
      setTertiaryColor(props.darkTertiaryColor);
      setQuaternaryColor(props.darkQuaternaryColor);
      setFifthColor(props.darkFifthColor);
      setPrimaryBackgroundColor(props.darkPrimaryBackgroundColor);
      setSecondaryBackgroundColor(props.darkSecondaryBackgroundColor);
      setTertiaryBackgroundColor(props.darkTertiaryBackgroundColor);
      setQuaternaryBackgroundColor(props.darkQuaternaryBackgroundColor);
    }
  };

  const handleSubmit = () => {
    if (chosenTheme === "acik") {
      props.setLightPrimaryColor(primaryColor);
      props.setLightSecondaryColor(secondaryColor);
      props.setLightTertiaryColor(tertiaryColor);
      props.setLightQuaternaryColor(quaternaryColor);
      props.setLightFifthColor(fifthColor);

      props.setLightPrimaryBackgroundColor(primaryBackgroundColor);
      props.setLightSecondaryBackgroundColor(secondaryBackgroundColor);
      props.setLightTertiaryBackgroundColor(tertiaryBackgroundColor);
      props.setLightQuaternaryBackgroundColor(quaternaryBackgroundColor);

      const colors = {
        lightPrimaryColor: primaryColor,
        lightSecondaryColor: secondaryColor,
        lightTertiaryColor: tertiaryColor,
        lightQuaternaryColor: quaternaryColor,
        lightFifthColor: fifthColor,

        lightPrimaryBackgroundColor: primaryBackgroundColor,
        lightSecondaryBackgroundColor: secondaryBackgroundColor,
        lightTertiaryBackgroundColor: tertiaryBackgroundColor,
        lightQuaternaryBackgroundColor: quaternaryBackgroundColor,

        darkPrimaryColor: props.darkPrimaryColor,
        darkSecondaryColor: props.darkSecondaryColor,
        darkTertiaryColor: props.darkTertiaryColor,
        darkQuaternaryColor: props.darkQuaternaryColor,
        darkFifthColor: props.darkFifthColor,

        darkPrimaryBackgroundColor: props.darkPrimaryBackgroundColor,
        darkSecondaryBackgroundColor: props.darkSecondaryBackgroundColor,
        darkTertiaryBackgroundColor: props.darkTertiaryBackgroundColor,
        darkQuaternaryBackgroundColor: props.darkQuaternaryBackgroundColor,
      };
      axios
        .put(`${BACKEND_URL}/theme`, colors)
        .then(() => {
          SuccessNotification("Başarıyla kaydedildi");
          document.documentElement.style.setProperty(
            "--color-primary-text",
            primaryColor
          );
          document.documentElement.style.setProperty(
            "--color-secondary-text",
            secondaryColor
          );
          document.documentElement.style.setProperty(
            "--color-tertiary-text",
            tertiaryColor
          );
          document.documentElement.style.setProperty(
            "--color-quaternary-text",
            quaternaryColor
          );
          document.documentElement.style.setProperty(
            "--color-fifth-text",
            fifthColor
          );

          document.documentElement.style.setProperty(
            "--color-primary-background",
            primaryBackgroundColor
          );
          document.documentElement.style.setProperty(
            "--color-secondary-background",
            secondaryBackgroundColor
          );
          document.documentElement.style.setProperty(
            "--color-tertiary-background",
            tertiaryBackgroundColor
          );
          document.documentElement.style.setProperty(
            "--color-quaternary-background",
            tertiaryBackgroundColor
          );
        })
        .catch(() => {
          ErrorNotification("Hata ile karşılaşıldı tekrar deneyiniz");
        });
    } else {
      props.setDarkPrimaryColor(primaryColor);
      props.setDarkSecondaryColor(secondaryColor);
      props.setDarkTertiaryColor(tertiaryColor);
      props.setDarkQuaternaryColor(quaternaryColor);
      props.setDarkFifthColor(fifthColor);

      props.setDarkPrimaryBackgroundColor(primaryBackgroundColor);
      props.setDarkSecondaryBackgroundColor(secondaryBackgroundColor);
      props.setDarkTertiaryBackgroundColor(tertiaryBackgroundColor);
      props.setDarkQuaternaryBackgroundColor(quaternaryBackgroundColor);

      const colors = {
        lightPrimaryColor: props.lightPrimaryColor,
        lightSecondaryColor: props.lightSecondaryColor,
        lightTertiaryColor: props.lightTertiaryColor,
        lightQuaternaryColor: props.lightQuaternaryColor,
        lightFifthColor: props.lightFifthColor,

        lightPrimaryBackgroundColor: props.lightPrimaryBackgroundColor,
        lightSecondaryBackgroundColor: props.lightSecondaryBackgroundColor,
        lightTertiaryBackgroundColor: props.lightTertiaryBackgroundColor,
        lightQuaternaryBackgroundColor: props.lightQuaternaryBackgroundColor,

        darkPrimaryColor: primaryColor,
        darkSecondaryColor: secondaryColor,
        darkTertiaryColor: tertiaryColor,
        darkQuaternaryColor: quaternaryColor,
        darkFifthColor: fifthColor,

        darkPrimaryBackgroundColor: primaryBackgroundColor,
        darkSecondaryBackgroundColor: secondaryBackgroundColor,
        darkTertiaryBackgroundColor: tertiaryBackgroundColor,
        darkQuaternaryBackgroundColor: quaternaryBackgroundColor,
      };
      axios
        .put(`${BACKEND_URL}/theme`, colors)
        .then(() => {
          SuccessNotification("Başarıyla kaydedildi");
          document.documentElement.style.setProperty(
            "--color-primary-text",
            primaryColor
          );
          document.documentElement.style.setProperty(
            "--color-secondary-text",
            secondaryColor
          );
          document.documentElement.style.setProperty(
            "--color-tertiary-text",
            tertiaryColor
          );
          document.documentElement.style.setProperty(
            "--color-quaternary-text",
            quaternaryColor
          );
          document.documentElement.style.setProperty(
            "--color-fifth-text",
            fifthColor
          );

          document.documentElement.style.setProperty(
            "--color-primary-background",
            primaryBackgroundColor
          );
          document.documentElement.style.setProperty(
            "--color-secondary-background",
            secondaryBackgroundColor
          );
          document.documentElement.style.setProperty(
            "--color-tertiary-background",
            tertiaryBackgroundColor
          );
          document.documentElement.style.setProperty(
            "--color-quaternary-background",
            tertiaryBackgroundColor
          );
        })
        .catch(() => {
          ErrorNotification("Hata ile karşılaşıldı tekrar deneyiniz");
        });
    }
  };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/theme`).then((response) => {
      setPrimaryColor(response.data.lightPrimaryColor);
      setSecondaryColor(response.data.lightSecondaryColor);
      setTertiaryColor(response.data.lightTertiaryColor);
      setQuaternaryColor(response.data.lightQuaternaryColor);
      setFifthColor(response.data.lightFifthColor);

      setPrimaryBackgroundColor(response.data.lightPrimaryBackgroundColor);
      setSecondaryBackgroundColor(response.data.lightSecondaryBackgroundColor);
      setTertiaryBackgroundColor(response.data.lightTertiaryBackgroundColor);
      setQuaternaryBackgroundColor(
        response.data.lightQuaternaryBackgroundColor
      );
      setLoading(false);
    });
  }, []);
  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />
      </div>
    );
  else
    return (
      <div className="theme-colors">
        <h1 className="admin-title">Tema Renkleri</h1>
        <div className="theme-choser">
          <select
            className="theme-choser-select"
            value={chosenTheme}
            onChange={(e) => {
              changeThemeSelect(e.target.value);
            }}
          >
            <option value="acik">Açık Tema</option>
            <option value="koyu">Koyu Tema</option>
          </select>
        </div>
        <div className="colors">
          <h2 className="color-header">Yazı Renkleri</h2>
          <div className="color">
            <div
              className="color-preview"
              style={{ backgroundColor: primaryColor }}
            />
            <input
              type="text"
              className="color-input"
              value={primaryColor}
              onChange={(e) => {
                setPrimaryColor(e.target.value);
              }}
            />
            <p className="color-title">Birincil Yazı Rengi</p>
          </div>
          <div className="color">
            <div
              className="color-preview"
              style={{ backgroundColor: secondaryColor }}
            />
            <input
              type="text"
              className="color-input"
              value={secondaryColor}
              onChange={(e) => {
                setSecondaryColor(e.target.value);
              }}
            />
            <p className="color-title">İkincil Yazı Rengi</p>
          </div>
          <div className="color">
            <div
              className="color-preview"
              style={{ backgroundColor: tertiaryColor }}
            />
            <input
              type="text"
              className="color-input"
              value={tertiaryColor}
              onChange={(e) => {
                setTertiaryColor(e.target.value);
              }}
            />
            <p className="color-title">Üçüncül Yazı Rengi</p>
          </div>
          <div className="color">
            <div
              className="color-preview"
              style={{ backgroundColor: quaternaryColor }}
            />
            <input
              type="text"
              className="color-input"
              value={quaternaryColor}
              onChange={(e) => {
                setQuaternaryColor(e.target.value);
              }}
            />
            <p className="color-title">Dördüncül Yazı Rengi</p>
          </div>
          <div className="color">
            <div
              className="color-preview"
              style={{ backgroundColor: fifthColor }}
            />
            <input
              type="text"
              className="color-input"
              value={fifthColor}
              onChange={(e) => {
                setFifthColor(e.target.value);
              }}
            />
            <p className="color-title">Beşincil Yazı Rengi</p>
          </div>
          <h2 className="color-header">Arkaplan Renkleri</h2>
          <div className="color">
            <div
              className="color-preview"
              style={{ backgroundColor: primaryBackgroundColor }}
            />
            <input
              type="text"
              className="color-input"
              value={primaryBackgroundColor}
              onChange={(e) => {
                setPrimaryBackgroundColor(e.target.value);
              }}
            />
            <p className="color-title">Birincil Arkaplan Rengi</p>
          </div>
          <div className="color">
            <div
              className="color-preview"
              style={{ backgroundColor: secondaryBackgroundColor }}
            />
            <input
              type="text"
              className="color-input"
              value={secondaryBackgroundColor}
              onChange={(e) => {
                setSecondaryBackgroundColor(e.target.value);
              }}
            />
            <p className="color-title">İkincil Arkaplan Rengi</p>
          </div>
          <div className="color">
            <div
              className="color-preview"
              style={{ backgroundColor: tertiaryBackgroundColor }}
            />
            <input
              type="text"
              className="color-input"
              value={tertiaryBackgroundColor}
              onChange={(e) => {
                setTertiaryBackgroundColor(e.target.value);
              }}
            />
            <p className="color-title">Üçüncül Arkaplan Rengi</p>
          </div>
          <div className="color">
            <div
              className="color-preview"
              style={{ backgroundColor: quaternaryBackgroundColor }}
            />
            <input
              type="text"
              className="color-input"
              value={quaternaryBackgroundColor}
              onChange={(e) => {
                setQuaternaryBackgroundColor(e.target.value);
              }}
            />
            <p className="color-title">Dördüncül Arkaplan Rengi</p>
          </div>
          <button className="save-theme-button" onClick={handleSubmit}>
            <FaSave className="icon" /> Kaydet
          </button>
        </div>
      </div>
    );
}

export default ThemeColors;
