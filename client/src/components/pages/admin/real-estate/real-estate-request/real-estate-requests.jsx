import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import "./real-estate-requests.css";
function RealEstateRequests() {
  return (
    <div className="real-estate-requests">
      <h1 className="admin-title">Konut İlanı İstekleri</h1>
      <div className="table-container">
        <table>
          <tr>
            <th className="image">Resim</th>
            <th className="title">Başlık</th>
            <th className="area">m² (Brüt)</th>
            <th className="room-count">Oda Sayısı</th>
            <th className="price">Fiyat</th>
            <th className="ilce">İlçe</th>
            <th className="actions">Aksiyonlar</th>
          </tr>

          <tr>
            <td>
              <div
                className="frame"
                style={{
                  backgroundImage: `url(https://www.ikea.com/images/a-light-living-room-centred-around-a-jaettebo-three-and-a-ha-d80334e03b4e4094d0e02846c7de2e85.jpg)`,
                }}
              />
            </td>
            <td>
              DERİN YAPI'DAN SAKİNLİK SEVENLER İÇİN DOĞA MANZARALI GENİŞ 5+2!!
              DERİN YAPI VİLLA OFİSİ
            </td>
            <td>120 m²</td>
            <td>3+1</td>
            <td>1.200.000</td>
            <td>Şehzadeler</td>
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
          <tr>
            <td>
              <div
                className="frame"
                style={{
                  backgroundImage: `url(https://hips.hearstapps.com/hmg-prod/images/melanie-pounds-mountain-brook-house-tour-living-room-fireplace-jpg-1623351404.jpg)`,
                }}
              />
            </td>
            <td>
              DERİN YAPI'DAN SAKİNLİK SEVENLER İÇİN DOĞA MANZARALI GENİŞ 5+2!!
              DERİN YAPI VİLLA OFİSİ
            </td>
            <td>120 m²</td>
            <td>3+1</td>
            <td>1.200.000</td>
            <td>Şehzadeler</td>
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
          <tr>
            <td>
              <div
                className="frame"
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80)`,
                }}
              />
            </td>
            <td>
              DERİN YAPI'DAN SAKİNLİK SEVENLER İÇİN DOĞA MANZARALI GENİŞ 5+2!!
              DERİN YAPI VİLLA OFİSİ
            </td>
            <td>120 m²</td>
            <td>3+1</td>
            <td>1.200.000</td>
            <td>Şehzadeler</td>
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

export default RealEstateRequests;
