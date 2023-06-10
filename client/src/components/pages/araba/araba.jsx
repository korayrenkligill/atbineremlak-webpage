import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../elements/config";
import PuffLoader from "react-spinners/PuffLoader";
import ArabaSidebar from "./sidebar/araba-sidebar";
import ArabaMain from "./main/araba-main";
import "./araba.css";

function Araba() {
  const [loading, setLoading] = useState(true);

  const [marka, setMarka] = useState("");
  const [seri, setSeri] = useState("");
  const [yil, setYil] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [yakit, setYakit] = useState("");
  const [vites, setVites] = useState("");
  const [aracDurumu, setAracDurumu] = useState("");
  const [km, setKm] = useState(0);
  const [kasa, setKasa] = useState("");

  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/cars`).then((response) => {
      let carsArray = response.data.filter((u) => u.request === false);
      setCars(carsArray);
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
      <div className="araba-page">
        <div>
          <ArabaSidebar
            marka={marka}
            setMarka={setMarka}
            seri={seri}
            setSeri={setSeri}
            yil={yil}
            setYil={setYil}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            yakit={yakit}
            setYakit={setYakit}
            vites={vites}
            setVites={setVites}
            aracDurumu={aracDurumu}
            setAracDurumu={setAracDurumu}
            km={km}
            setKm={setKm}
            kasa={kasa}
            setKasa={setKasa}
          />
        </div>
        <div>
          <ArabaMain
            cars={cars}
            marka={marka}
            seri={seri}
            yil={yil}
            minPrice={minPrice}
            maxPrice={maxPrice}
            yakit={yakit}
            vites={vites}
            aracDurumu={aracDurumu}
            km={km}
            kasa={kasa}
          />
        </div>
      </div>
    );
}

export default Araba;
