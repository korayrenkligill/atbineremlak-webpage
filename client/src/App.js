import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import MainPage from "./components/pages/main-page/main-page";
import Emlak from "./components/pages/emlak/emlak";
import { Route, Routes } from "react-router-dom";
import AdminPanel from "./components/pages/admin/admin-panel";
import Dashboard from "./components/pages/admin/dashboard/dashboard";
import RealEstateList from "./components/pages/admin/real-estate/real-estate-list/real-estate-list";
import RealEstateAdd from "./components/pages/admin/real-estate/real-estate-add/real-estate-add";
import { BACKEND_URL } from "./components/elements/config";
import "./App.css";
import RealEstateRequests from "./components/pages/admin/real-estate/real-estate-request/real-estate-requests";
import CarAdd from "./components/pages/admin/car/car-add/car-add";
import CarList from "./components/pages/admin/car/car-list/car-list";
import CarRequest from "./components/pages/admin/car/car-request/car-request";
import Admin404 from "./components/pages/admin/404/admin-404";
import UserAdd from "./components/pages/admin/user/user-add/user-add";
import UserList from "./components/pages/admin/user/user-list/user-list";
import { ToastContainer } from "react-toastify";
import UserEdit from "./components/pages/admin/user/user-edit/user-edit";
import RealEstateEdit from "./components/pages/admin/real-estate/real-estate-edit/real-estate-edit";
import CarEdit from "./components/pages/admin/car/car-edit/car-edit";
import IlanVer from "./components/pages/ilan-ver/ilan-ver-main";
import Araba from "./components/pages/araba/araba";
import Tadilat from "./components/pages/tadilat/tadilat";
import EmlakDetail from "./components/pages/emlak/detail/emlak-detail";
import ContactList from "./components/pages/admin/contact/contact";
import ArabaDetail from "./components/pages/araba/detail/araba-detail";
import TadilatAdd from "./components/pages/admin/tadilat/tadilat-add/tadilat-add";
import ThemeColors from "./components/pages/admin/settings/theme/theme-colors";
import axios from "axios";
import TadilatDetail from "./components/pages/tadilat/tadilat-detail/tadilat-detail";
import ContactPage from "./components/pages/contact/contact";
import Page404 from "./components/pages/page404/page404";
function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  const [lightPrimaryColor, setLightPrimaryColor] = useState("#1f1f1f");
  const [lightSecondaryColor, setLightSecondaryColor] = useState("#575757");
  const [lightTertiaryColor, setLightTertiaryColor] = useState("#808080");
  const [lightQuaternaryColor, setLightQuaternaryColor] = useState("#bbbbbb");
  const [lightFifthColor, setLightFifthColor] = useState("#f5f5f5");

  const [lightPrimaryBackgroundColor, setLightPrimaryBackgroundColor] =
    useState("#ffffff");
  const [lightSecondaryBackgroundColor, setLightSecondaryBackgroundColor] =
    useState("#f9f9f9");
  const [lightTertiaryBackgroundColor, setLightTertiaryBackgroundColor] =
    useState("#dfdfdf");
  const [lightQuaternaryBackgroundColor, setLightQuaternaryBackgroundColor] =
    useState("#d3d3d3");

  const [darkPrimaryColor, setDarkPrimaryColor] = useState("#d7d7d7");
  const [darkSecondaryColor, setDarkSecondaryColor] = useState("#a7a7a7");
  const [darkTertiaryColor, setDarkTertiaryColor] = useState("#808080");
  const [darkQuaternaryColor, setDarkQuaternaryColor] = useState("#676767");
  const [darkFifthColor, setDarkFifthColor] = useState("#414141");

  const [darkPrimaryBackgroundColor, setDarkPrimaryBackgroundColor] =
    useState("#1f1f1f");
  const [darkSecondaryBackgroundColor, setDarkSecondaryBackgroundColor] =
    useState("#1b1b1b");
  const [darkTertiaryBackgroundColor, setDarkTertiaryBackgroundColor] =
    useState("#171717");
  const [darkQuaternaryBackgroundColor, setDarkQuaternaryBackgroundColor] =
    useState("#101010");

  const changeTheme = (chosenTheme) => {
    if (chosenTheme === "dark") {
      setTheme("dark");
      localStorage.setItem("theme", JSON.stringify("dark"));
      document.documentElement.style.setProperty(
        "--color-primary-text",
        darkPrimaryColor
      );
      document.documentElement.style.setProperty(
        "--color-secondary-text",
        darkSecondaryColor
      );
      document.documentElement.style.setProperty(
        "--color-tertiary-text",
        darkTertiaryColor
      );
      document.documentElement.style.setProperty(
        "--color-quaternary-text",
        darkQuaternaryColor
      );
      document.documentElement.style.setProperty(
        "--color-fifth-text",
        darkFifthColor
      );

      document.documentElement.style.setProperty(
        "--color-primary-background",
        darkPrimaryBackgroundColor
      );
      document.documentElement.style.setProperty(
        "--color-secondary-background",
        darkSecondaryBackgroundColor
      );
      document.documentElement.style.setProperty(
        "--color-tertiary-background",
        darkTertiaryBackgroundColor
      );
      document.documentElement.style.setProperty(
        "--color-quaternary-background",
        darkQuaternaryBackgroundColor
      );
    } else {
      setTheme("light");
      localStorage.setItem("theme", JSON.stringify("light"));
      document.documentElement.style.setProperty(
        "--color-primary-text",
        lightPrimaryColor
      );
      document.documentElement.style.setProperty(
        "--color-secondary-text",
        lightSecondaryColor
      );
      document.documentElement.style.setProperty(
        "--color-tertiary-text",
        lightTertiaryColor
      );
      document.documentElement.style.setProperty(
        "--color-quaternary-text",
        lightQuaternaryColor
      );
      document.documentElement.style.setProperty(
        "--color-fifth-text",
        lightFifthColor
      );

      document.documentElement.style.setProperty(
        "--color-primary-background",
        lightPrimaryBackgroundColor
      );
      document.documentElement.style.setProperty(
        "--color-secondary-background",
        lightSecondaryBackgroundColor
      );
      document.documentElement.style.setProperty(
        "--color-tertiary-background",
        lightTertiaryBackgroundColor
      );
      document.documentElement.style.setProperty(
        "--color-quaternary-background",
        lightQuaternaryBackgroundColor
      );
    }
  };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/theme`).then((response) => {
      setLightPrimaryColor(response.data.lightPrimaryColor);
      setLightSecondaryColor(response.data.lightSecondaryColor);
      setLightTertiaryColor(response.data.lightTertiaryColor);
      setLightQuaternaryColor(response.data.lightQuaternaryColor);
      setLightFifthColor(response.data.lightFifthColor);

      setLightPrimaryBackgroundColor(response.data.lightPrimaryBackgroundColor);
      setLightSecondaryBackgroundColor(
        response.data.lightSecondaryBackgroundColor
      );
      setLightTertiaryBackgroundColor(
        response.data.lightTertiaryBackgroundColor
      );
      setLightQuaternaryBackgroundColor(
        response.data.lightQuaternaryBackgroundColor
      );

      setDarkPrimaryColor(response.data.darkPrimaryColor);
      setDarkSecondaryColor(response.data.darkSecondaryColor);
      setDarkTertiaryColor(response.data.darkTertiaryColor);
      setDarkQuaternaryColor(response.data.darkQuaternaryColor);
      setDarkFifthColor(response.data.darkFifthColor);

      setDarkPrimaryBackgroundColor(response.data.darkPrimaryBackgroundColor);
      setDarkSecondaryBackgroundColor(
        response.data.darkSecondaryBackgroundColor
      );
      setDarkTertiaryBackgroundColor(response.data.darkTertiaryBackgroundColor);
      setDarkQuaternaryBackgroundColor(
        response.data.darkQuaternaryBackgroundColor
      );

      const storedData = localStorage.getItem("theme");
      setTheme(JSON.parse(storedData));

      if (JSON.parse(storedData) === "dark") {
        setTheme("dark");
        document.documentElement.style.setProperty(
          "--color-primary-text",
          response.data.darkPrimaryColor
        );
        document.documentElement.style.setProperty(
          "--color-secondary-text",
          response.data.darkSecondaryColor
        );
        document.documentElement.style.setProperty(
          "--color-tertiary-text",
          response.data.darkTertiaryColor
        );
        document.documentElement.style.setProperty(
          "--color-quaternary-text",
          response.data.darkQuaternaryColor
        );
        document.documentElement.style.setProperty(
          "--color-fifth-text",
          response.data.darkFifthColor
        );

        document.documentElement.style.setProperty(
          "--color-primary-background",
          response.data.darkPrimaryBackgroundColor
        );
        document.documentElement.style.setProperty(
          "--color-secondary-background",
          response.data.darkSecondaryBackgroundColor
        );
        document.documentElement.style.setProperty(
          "--color-tertiary-background",
          response.data.darkTertiaryBackgroundColor
        );
        document.documentElement.style.setProperty(
          "--color-quaternary-background",
          response.data.darkQuaternaryBackgroundColor
        );
      } else {
        setTheme("light");
        document.documentElement.style.setProperty(
          "--color-primary-text",
          response.data.lightPrimaryColor
        );
        document.documentElement.style.setProperty(
          "--color-secondary-text",
          response.data.lightSecondaryColor
        );
        document.documentElement.style.setProperty(
          "--color-tertiary-text",
          response.data.lightTertiaryColor
        );
        document.documentElement.style.setProperty(
          "--color-quaternary-text",
          response.data.lightQuaternaryColor
        );
        document.documentElement.style.setProperty(
          "--color-fifth-text",
          response.data.lightFifthColor
        );

        document.documentElement.style.setProperty(
          "--color-primary-background",
          response.data.lightPrimaryBackgroundColor
        );
        document.documentElement.style.setProperty(
          "--color-secondary-background",
          response.data.lightSecondaryBackgroundColor
        );
        document.documentElement.style.setProperty(
          "--color-tertiary-background",
          response.data.lightTertiaryBackgroundColor
        );
        document.documentElement.style.setProperty(
          "--color-quaternary-background",
          response.data.lightQuaternaryBackgroundColor
        );
      }
    });
  }, []);
  return (
    <div className="App">
      <div className="notification">
        <ToastContainer />
      </div>
      <Navbar user={user} theme={theme} changeTheme={changeTheme} />
      <div className="Content">
        <Routes>
          <Route path="/" exact element={<Emlak />} />
          <Route path="/konut/:id" element={<EmlakDetail user={user} />} />
          <Route path="/otomobil" element={<Araba />} />
          <Route path="/araba/:id" element={<ArabaDetail user={user} />} />
          <Route path="/ana-sayfa" element={<MainPage />} />
          <Route path="/tadilat" element={<Tadilat />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tadilat/:id" element={<TadilatDetail />} />
          <Route path="/ilan-ver" element={<IlanVer />} />
          <Route
            path="/admin"
            element={<AdminPanel user={user} setUser={setUser} />}
          >
            <Route path="/admin/" element={<Dashboard />} />0
            <Route path="/admin/konutlar/" element={<RealEstateList />} />
            <Route
              path="/admin/konut/ekle/"
              element={<RealEstateAdd user={user} />}
            />
            <Route
              path="/admin/konut/edit/:id"
              element={<RealEstateEdit user={user} />}
            />
            <Route
              path="/admin/konut/ilan-istekleri/"
              element={<RealEstateRequests user={user} />}
            />
            <Route path="/admin/otomobiller/" element={<CarList />} />
            <Route
              path="/admin/otomobil/ekle/"
              element={<CarAdd user={user} />}
            />
            <Route
              path="/admin/otomobil/edit/:id"
              element={<CarEdit user={user} />}
            />
            <Route
              path="/admin/otomobil/ilan-istekleri/"
              element={<CarRequest user={user} />}
            />
            <Route path="/admin/iletisim" element={<ContactList />} />
            <Route path="/admin/kullanıcılar" element={<UserList />} />
            <Route path="/admin/kullanıcı/ekle/" element={<UserAdd />} />
            <Route path="/admin/kullanıcı/:id" element={<UserEdit />} />
            <Route path="/admin/tadilat/ekle/" element={<TadilatAdd />} />
            <Route
              path="/admin/ayarlar/renk/"
              element={
                <ThemeColors
                  lightPrimaryColor={lightPrimaryColor}
                  lightSecondaryColor={lightSecondaryColor}
                  lightTertiaryColor={lightTertiaryColor}
                  lightQuaternaryColor={lightQuaternaryColor}
                  lightFifthColor={lightFifthColor}
                  lightPrimaryBackgroundColor={lightPrimaryBackgroundColor}
                  lightSecondaryBackgroundColor={lightSecondaryBackgroundColor}
                  lightTertiaryBackgroundColor={lightTertiaryBackgroundColor}
                  lightQuaternaryBackgroundColor={
                    lightQuaternaryBackgroundColor
                  }
                  darkPrimaryColor={darkPrimaryColor}
                  darkSecondaryColor={darkSecondaryColor}
                  darkTertiaryColor={darkTertiaryColor}
                  darkQuaternaryColor={darkQuaternaryColor}
                  darkFifthColor={darkFifthColor}
                  darkPrimaryBackgroundColor={darkPrimaryBackgroundColor}
                  darkSecondaryBackgroundColor={darkSecondaryBackgroundColor}
                  darkTertiaryBackgroundColor={darkTertiaryBackgroundColor}
                  darkQuaternaryBackgroundColor={darkQuaternaryBackgroundColor}
                  setLightPrimaryColor={setLightPrimaryColor}
                  setLightSecondaryColor={setLightSecondaryColor}
                  setLightTertiaryColor={setLightTertiaryColor}
                  setLightQuaternaryColor={setLightQuaternaryColor}
                  setLightFifthColor={setLightFifthColor}
                  setLightPrimaryBackgroundColor={
                    setLightPrimaryBackgroundColor
                  }
                  setLightSecondaryBackgroundColor={
                    setLightSecondaryBackgroundColor
                  }
                  setLightTertiaryBackgroundColor={
                    setLightTertiaryBackgroundColor
                  }
                  setLightQuaternaryBackgroundColor={
                    setLightQuaternaryBackgroundColor
                  }
                  setDarkPrimaryColor={setDarkPrimaryColor}
                  setDarkSecondaryColor={setDarkSecondaryColor}
                  setDarkTertiaryColor={setDarkTertiaryColor}
                  setDarkQuaternaryColor={setDarkQuaternaryColor}
                  setDarkFifthColor={setDarkFifthColor}
                  setDarkPrimaryBackgroundColor={setDarkPrimaryBackgroundColor}
                  setDarkSecondaryBackgroundColor={
                    setDarkSecondaryBackgroundColor
                  }
                  setDarkTertiaryBackgroundColor={
                    setDarkTertiaryBackgroundColor
                  }
                  setDarkQuaternaryBackgroundColor={
                    setDarkQuaternaryBackgroundColor
                  }
                />
              }
            />
            <Route path="/admin/*" element={<Admin404 />} />
          </Route>
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
