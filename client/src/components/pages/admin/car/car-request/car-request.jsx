import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import "./car-request.css";
function CarRequest() {
  return (
    <div className="car-requests">
      <h1 className="admin-title">Konut İlanı İstekleri</h1>
      <div className="table-container">
        <table>
          <tr>
            <th className="image">Resim</th>
            <th className="title">Başlık</th>
            <th className="model">Model</th>
            <th className="motor">Motor</th>
            <th className="km">KM</th>
            <th className="price">Fiyat</th>
            <th className="actions">Aksiyonlar</th>
          </tr>

          <tr>
            <td>
              <div
                className="frame"
                style={{
                  backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Renault_12_Toros.jpg/640px-Renault_12_Toros.jpg)`,
                }}
              />
            </td>
            <td>
              BİNİCİDEN BİNİCİYE 2017 123.500 KM CARPLY GERİ GÖRÜŞ VS EXTRLI
            </td>
            <td>Toros</td>
            <td>80cc</td>
            <td>200.000</td>
            <td>210.000</td>
            <td>
              <div className="actions">
                <button>
                  <BsCheckLg />
                </button>
                <button>
                  <IoCloseOutline />
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default CarRequest;
