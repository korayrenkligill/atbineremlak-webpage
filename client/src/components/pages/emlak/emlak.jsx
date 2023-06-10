import React, { useEffect, useState } from "react";
import "./emlak.css";
import EmlakSidebar from "./sidebar/emlak-sidebar";
import EmlakMain from "./main/emlak-main";
import axios from "axios";
import { BACKEND_URL } from "../../elements/config";
import PuffLoader from "react-spinners/PuffLoader";

function Emlak() {
  const [loading, setLoading] = useState(true);

  const [ilce, setIlce] = useState("");
  const [mahalle, setMahalle] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [roomCount, setRoomCount] = useState("");
  const [floor, setFloor] = useState(0);
  const [heating, setHeating] = useState("");
  const [furnished, setFurnished] = useState("");
  const [usingState, setUsingState] = useState("");

  const [realEstates, setRealEstates] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/real-estates`).then((response) => {
      let realEstateArray = response.data.filter((u) => u.request === false);
      setRealEstates(realEstateArray);
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
      <div className="emlak-page">
        <div>
          <EmlakSidebar
            ilce={ilce}
            setIlce={setIlce}
            mahalle={mahalle}
            setMahalle={setMahalle}
            type={type}
            setType={setType}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            roomCount={roomCount}
            setRoomCount={setRoomCount}
            floor={floor}
            setFloor={setFloor}
            heating={heating}
            setHeating={setHeating}
            furnished={furnished}
            setFurnished={setFurnished}
            usingState={usingState}
            setUsingState={setUsingState}
          />
        </div>
        <div>
          <EmlakMain
            realEstates={realEstates}
            ilce={ilce}
            mahalle={mahalle}
            type={type}
            minPrice={minPrice}
            maxPrice={maxPrice}
            roomCount={roomCount}
            floor={floor}
            heating={heating}
            furnished={furnished}
            usingState={usingState}
          />
        </div>
      </div>
    );
}

export default Emlak;
