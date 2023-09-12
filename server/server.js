const express = require("express");
const cors = require("cors"); // cors modülünü çağır
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 4000;
const JsonLocation = "db.json";

//Publish
// const serverAdress = "https://server.atbineremlak.com";

// Test area
const serverAdress = "http://localhost:4000";

const upload = multer({ dest: "uploads" });

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  session({
    secret: "357951",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors()); // cors'u ara katman olarak ekle
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://atbineremlak.com",
      "http://atbineremlak.com",
    ], // İstemci adresini buraya yazın
    credentials: true, // Oturum bilgisi gibi özel başlıkların gönderilmesine izin vermek için
  })
);

// JSON verilerini okuyan ve döndüren fonksiyon
function readData() {
  let data = fs.readFileSync(JsonLocation);
  let jsonData = JSON.parse(data);
  return jsonData;
}

// USERS FUNCTİONS --------------------------------------------------------------------------

var Users = {
  read: function () {
    let data = readData();
    let users = data.users;
    return users;
  },
  add: function (user) {
    let users = Users.read();
    users.push(user);
    let data = readData();
    data.users = users;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  update: function (id, user) {
    let users = Users.read();
    let updatedUsers = users.map((u) => (u.id === id ? user : u));
    let data = readData();
    data.users = updatedUsers;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  delete: function (id) {
    let users = Users.read();
    let updatedUsers = users.filter((user) => user.id !== id);
    let data = readData();
    data.users = updatedUsers;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
};
// REAL ESTATES FUNCTİONS --------------------------------------------------------------------------

var RealEstates = {
  read: function () {
    let data = readData();
    let realEstates = data.realEstates;
    return realEstates;
  },
  add: function (realEstate) {
    let realEstates = RealEstates.read();
    realEstates.push(realEstate);
    let data = readData();
    data.realEstates = realEstates;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  update: function (id, realEstate) {
    let realEstates = RealEstates.read();
    let updatedRealEstate = realEstates.map((u) =>
      u.id === id ? realEstate : u
    );
    let data = readData();
    data.realEstates = updatedRealEstate;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  delete: function (id) {
    let realEstates = RealEstates.read();
    let updatedRealEstate = realEstates.filter(
      (realEstate) => realEstate.id !== id
    );
    let data = readData();
    data.realEstates = updatedRealEstate;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
};
// CARS FUNCTİONS --------------------------------------------------------------------------

var Cars = {
  read: function () {
    let data = readData();
    let cars = data.cars;
    return cars;
  },
  add: function (car) {
    let cars = Cars.read();
    cars.push(car);
    let data = readData();
    data.cars = cars;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  update: function (id, car) {
    let cars = Cars.read();
    let updatedCars = cars.map((u) => (u.id === id ? car : u));
    let data = readData();
    data.cars = updatedCars;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  delete: function (id) {
    let cars = Cars.read();
    let updatedCars = cars.filter((car) => car.id !== id);
    let data = readData();
    data.cars = updatedCars;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
};
// CONTACT FUNCTİONS --------------------------------------------------------------------------

var Contact = {
  read: function () {
    let data = readData();
    let contact = data.contact;
    return contact;
  },
  add: function (contact) {
    let contacts = Contact.read();
    contacts.push(contact);
    let data = readData();
    data.contact = contacts;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  delete: function (id) {
    let contacts = Contact.read();
    let updatedContacts = contacts.filter((contact) => contact.id !== id);
    let data = readData();
    data.contact = updatedContacts;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
};
// TADİLAT FUNCTIONS --------------------------------------------------------------------------

var Tadilat = {
  read: function () {
    let data = readData();
    let tadilatlar = data.tadilat;
    return tadilatlar;
  },
  add: function (tadilat) {
    let tadilatlar = Tadilat.read();
    tadilatlar.push(tadilat);
    let data = readData();
    data.tadilat = tadilatlar;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
};

// THEME FUNCTIONS
var Theme = {
  read: function () {
    let data = readData();
    let theme = data.theme;
    return theme;
  },
  update: function (theme) {
    let data = readData();
    data.theme = theme;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
};

// Resimlerin bulunduğu klasör yolunu belirtin
const resimKlasoru = path.join(__dirname, "uploads");

// İstemcinin resme erişim taleplerini yönlendirin
app.get("/uploads/:main/:klasorAdi/:resimAdi", (req, res) => {
  const resimAdi = req.params.resimAdi;
  const klasorAdi = req.params.klasorAdi;
  const main = req.params.main;
  const resimYolu = `${resimKlasoru}/${main}/${klasorAdi}/${resimAdi}`;
  res.sendFile(resimYolu);
});

// USERS REQUESTS --------------------------------------------------------------------------

// Tüm kullanıcıları döndüren GET isteği
app.get("/users", (req, res) => {
  let users = Users.read();
  res.json(users);
});

// Yeni bir kullanıcı ekleyen POST isteği
app.post("/users", upload.array("images"), (req, res) => {
  const id = req.body.id;
  let user = {
    id: id,
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    age: Number(req.body.age),
    profile: "https://img.freepik.com/free-icon/user_318-159711.jpg",
  };
  // Klasör mevcutluğunu kontrol etme
  if (!fs.existsSync(`uploads/profiles/${id}`)) {
    // Klasör oluşturma
    fs.mkdir(`uploads/profiles/${id}`, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Klasör oluşturuldu!");
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i];
          const oldPath = file.path;
          const extension = path.extname(file.originalname);
          const newFileName = "resim_" + uuidv4() + extension;
          const newPath = path.join(`uploads/profiles/${id}`, newFileName);
          let linkPath = `${serverAdress}/${newPath}`;
          linkPath = linkPath.replace(/\\/g, "/");
          user.profile = linkPath;

          // Dosyayı hedef klasöre taşıyın
          fs.renameSync(oldPath, newPath);
        }
        Users.add(user);
      }
    });
  } else {
    console.log("Klasör zaten mevcut.");
  }
  res.json({ message: "User added successfully" });
});

// Belirli bir kullanıcıyı güncelleyen PUT isteği
app.put("/users/:id", upload.array("images"), (req, res) => {
  let id = req.params.id;
  let user = {
    id: id,
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    age: Number(req.body.age),
    profile: typeof req.body.images === "string" ? req.body.images : "",
  };
  const klasorYolu = `uploads/profiles/${id}/`; // Sileceğiniz klasörün yolu
  const korunanIsimler = []; // Silmek istemediğiniz dosyaların isimleri
  if (typeof req.body.images === "string") {
    const dosyaYolu = new URL(req.body.images).pathname;
    const dosyaAdi = path.basename(dosyaYolu);
    korunanIsimler.push(dosyaAdi);
  }
  fs.readdir(klasorYolu, (err, dosyalar) => {
    if (err) {
      console.error("Klasör okunamadı:", err);
      return;
    }
    dosyalar.forEach((dosya) => {
      if (!korunanIsimler.includes(dosya)) {
        const dosyaYolu = path.join(klasorYolu, dosya);
        fs.unlink(dosyaYolu, (err) => {
          if (err) {
            console.error("Dosya silinemedi:", err);
            return;
          }
          console.log(`${dosya} başarıyla silindi.`);
        });
      }
    });
  });

  if (typeof req.body.images !== "string") {
    const file = req.files[0];
    const oldPath = file.path;
    const extension = path.extname(file.originalname);
    const newFileName = "resim_" + uuidv4() + extension;
    const newPath = path.join(`uploads/profiles/${id}`, newFileName);
    let linkPath = `${serverAdress}/${newPath}`;
    linkPath = linkPath.replace(/\\/g, "/");
    user.profile = linkPath;
    console.log("Değişim var dosya keydedildi listeye eklendi");

    // Dosyayı hedef klasöre taşıyın
    fs.renameSync(oldPath, newPath);
  }
  Users.update(id, user);
  res.json({ message: "User updated successfully" });
});

// Belirli bir kullanıcıyı silen DELETE isteği
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  fs.rmdir(`uploads/profiles/${id}`, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Klasör kaldırıldı");
      Users.delete(id);
    }
  });
  res.json({ message: "User deleted successfully" });
});

// Belirli bir kullanıcıyı döndüren GET isteği
app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  let users = Users.read();
  let user = users.find((u) => u.id == id);
  res.json(user);
});

// REAL ESTATE REQUESTS --------------------------------------------------------------------------

// Tüm ilanları döndüren GET isteği
app.get("/real-estates", (req, res) => {
  let realEstates = RealEstates.read();
  res.json(realEstates);
});

// Yeni bir ilan ekleyen POST isteği
app.post("/real-estates", upload.array("images"), (req, res) => {
  const id = req.body.id;
  let realEstate = {
    id: id,
    title: req.body.title,
    description: req.body.description,
    price: Number(req.body.price),
    bargain: req.body.bargain,
    ilce: req.body.ilce,
    mahalle: req.body.mahalle,
    type: req.body.type,
    grossArea: Number(req.body.grossArea),
    netArea: Number(req.body.netArea),
    roomCount: req.body.roomCount,
    buildAge: req.body.buildAge,
    floor: Number(req.body.floor),
    totalFloor: Number(req.body.totalFloor),
    heating: req.body.heating,
    bathroomCount: Number(req.body.bathroomCount),
    balcony: req.body.balcony,
    furnished: req.body.furnished,
    usingState: req.body.usingState,
    onSite: req.body.onSite,
    siteName: req.body.siteName,
    dues: Number(req.body.dues),
    suitableForCredit: req.body.suitableForCredit,
    titleStatus: req.body.titleStatus,
    swap: req.body.swap,
    cephe: JSON.parse(req.body.cephe),
    icOzellikler: JSON.parse(req.body.icOzellikler),
    disOzellikler: JSON.parse(req.body.disOzellikler),
    muhit: JSON.parse(req.body.muhit),
    ulasim: JSON.parse(req.body.ulasim),
    manzara: JSON.parse(req.body.manzara),
    konutTipi: JSON.parse(req.body.konutTipi),
    date: req.body.date,
    activity: req.body.activity,
    user: JSON.parse(req.body.user),
    advertiserName: req.body.advertiserName,
    advertiserSurname: req.body.advertiserSurname,
    advertiserPhone: req.body.advertiserPhone,
    advertiserNote: req.body.advertiserNote,
    images: [],
    request:
      req.body.request.toLowerCase() === "true" || req.body.request === true,
  };
  let imagePaths = [];
  // Klasör mevcutluğunu kontrol etme
  if (!fs.existsSync(`uploads/konut/${id}`)) {
    // Klasör oluşturma
    fs.mkdir(`uploads/konut/${id}`, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Klasör oluşturuldu!");
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i];
          const oldPath = file.path;
          const extension = path.extname(file.originalname);
          const newFileName = "resim_" + uuidv4() + extension;
          const newPath = path.join(`uploads/konut/${id}`, newFileName);
          let linkPath = `${serverAdress}/${newPath}`;
          linkPath = linkPath.replace(/\\/g, "/");
          imagePaths.push(linkPath);

          // Dosyayı hedef klasöre taşıyın
          fs.renameSync(oldPath, newPath);
        }
        realEstate.images = imagePaths;
        RealEstates.add(realEstate);
      }
    });
  } else {
    console.log("Klasör zaten mevcut.");
  }
  res.json({ message: "User added successfully" });
});

// Belirli bir ilanı güncelleyen PUT isteği
app.put("/real-estates/:id", upload.array("images"), (req, res) => {
  let id = req.params.id;
  let images = JSON.parse(req.body.imageArray);
  let realEstate = {
    id: id,
    title: req.body.title,
    description: req.body.content,
    price: Number(req.body.price),
    bargain: req.body.bargain,
    ilce: req.body.ilce,
    mahalle: req.body.mahalle,
    type: req.body.type,
    grossArea: Number(req.body.grossArea),
    netArea: Number(req.body.netArea),
    roomCount: req.body.roomCount,
    buildAge: req.body.buildAge,
    floor: Number(req.body.floor),
    totalFloor: Number(req.body.totalFloor),
    heating: req.body.heating,
    bathroomCount: Number(req.body.bathroomCount),
    balcony: req.body.balcony,
    furnished: req.body.furnished,
    usingState: req.body.usingState,
    onSite: req.body.onSite,
    siteName: req.body.siteName,
    dues: Number(req.body.dues),
    suitableForCredit: req.body.suitableForCredit,
    titleStatus: req.body.titleStatus,
    swap: req.body.swap,
    cephe: JSON.parse(req.body.cephe),
    icOzellikler: JSON.parse(req.body.icOzellikler),
    disOzellikler: JSON.parse(req.body.disOzellikler),
    muhit: JSON.parse(req.body.muhit),
    ulasim: JSON.parse(req.body.ulasim),
    manzara: JSON.parse(req.body.manzara),
    konutTipi: JSON.parse(req.body.konutTipi),
    date: req.body.date,
    activity: req.body.activity,
    user: JSON.parse(req.body.user),
    advertiserName: req.body.advertiserName,
    advertiserSurname: req.body.advertiserSurname,
    advertiserPhone: req.body.advertiserPhone,
    advertiserNote: req.body.advertiserNote,
    images: [],
    request:
      req.body.request.toLowerCase() === "true" || req.body.request === true,
  };
  let imagePaths = [];
  const klasorYolu = `uploads/konut/${id}/`; // Sileceğiniz klasörün yolu
  const korunanIsimler = []; // Silmek istemediğiniz dosyaların isimleri
  images.forEach((element) => {
    if (typeof element === "string") {
      const dosyaYolu = new URL(element).pathname;
      const dosyaAdi = path.basename(dosyaYolu);
      korunanIsimler.push(dosyaAdi);
    }
  });
  fs.readdir(klasorYolu, (err, dosyalar) => {
    if (err) {
      console.error("Klasör okunamadı:", err);
      return;
    }
    dosyalar.forEach((dosya) => {
      if (!korunanIsimler.includes(dosya)) {
        const dosyaYolu = path.join(klasorYolu, dosya);
        fs.unlink(dosyaYolu, (err) => {
          if (err) {
            console.error("Dosya silinemedi:", err);
            return;
          }
          console.log(`${dosya} başarıyla silindi.`);
        });
      }
    });
  });

  let fileIndex = 0;
  images.forEach((image, index) => {
    if (typeof image === "string") {
      imagePaths.push(image);
      console.log("Değişim yok listeye eklendi");
    } else {
      const file = req.files[fileIndex];
      const oldPath = file.path;
      const extension = path.extname(file.originalname);
      const newFileName = "resim_" + uuidv4() + extension;
      const newPath = path.join(`uploads/konut/${id}`, newFileName);
      let linkPath = `${serverAdress}/${newPath}`;
      linkPath = linkPath.replace(/\\/g, "/");
      imagePaths.push(linkPath);
      fileIndex++;
      console.log("Değişim var dosya keydedildi listeye eklendi");

      // Dosyayı hedef klasöre taşıyın
      fs.renameSync(oldPath, newPath);
    }
  });

  realEstate.images = imagePaths;
  RealEstates.update(id, realEstate);
  res.json({ message: "Real estate updated successfully" });
});

// Belirli bir arabayı silen DELETE isteği
app.delete("/real-estates/:id", (req, res) => {
  let id = req.params.id;
  fs.rmdir(`uploads/konut/${id}`, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Klasör kaldırıldı");
      RealEstates.delete(id);
    }
  });
  res.json({ message: "Car deleted successfully" });
});

// Isteği Onayla
app.put("/real-estates/request-accept/:id", (req, res) => {
  let id = req.params.id;
  let realEstate = req.body;
  RealEstates.update(id, realEstate);
  res.json({ message: "Real estate deleted successfully" });
});

// Belirli bir ilanı döndüren GET isteği
app.get("/real-estates/:id", (req, res) => {
  let id = req.params.id;
  let realEstates = RealEstates.read();
  let realEstate = realEstates.find((u) => u.id == id);
  res.json(realEstate);
});

app.get("/real-estates/requests/count", (req, res) => {
  let realEstates = RealEstates.read();
  realEstates = realEstates.filter((u) => u.request === true);
  res.json(realEstates.length);
});

app.get("/lastest", (req, res) => {
  let realEstates = RealEstates.read();
  realEstates = realEstates
    .filter((u) => {
      return u.request === false && u.activity === "Aktif";
    })
    .slice(-5);
  res.json(realEstates);
});

app.put("/real-estates/activity/:id", (req, res) => {
  let id = req.params.id;
  let realEstate = req.body;
  RealEstates.update(id, realEstate);
  res.json({ message: "Real estate deleted successfully" });
});

// CARS REQUESTS --------------------------------------------------------------------------

// Tüm arabaları döndüren GET isteği
app.get("/cars", (req, res) => {
  let cars = Cars.read();
  res.json(cars);
});

// Yeni bir araba ekleyen POST isteği
app.post("/cars", upload.array("images"), (req, res) => {
  const id = req.body.id;
  let car = {
    id: id,
    baslik: req.body.baslik,
    aciklama: req.body.aciklama,
    fiyat: Number(req.body.fiyat),
    pazarlik: req.body.pazarlik,
    marka: req.body.marka,
    mahalle: req.body.mahalle,
    seri: req.body.seri,
    model: req.body.model,
    yil: Number(req.body.yil),
    yakit: req.body.yakit,
    vites: req.body.vites,
    aracDurumu: req.body.aracDurumu,
    km: Number(req.body.km),
    kasa: req.body.kasa,
    motorGucu: Number(req.body.motorGucu),
    motorHacmi: req.body.motorHacmi,
    cekis: req.body.cekis,
    renk: req.body.renk,
    agirHasarli: req.body.agirHasarli,
    takas: req.body.takas,
    guvenlik: JSON.parse(req.body.guvenlik),
    icDonanim: JSON.parse(req.body.icDonanim),
    disDonanim: JSON.parse(req.body.disDonanim),
    multimedya: JSON.parse(req.body.multimedya),
    date: req.body.date,
    activity: req.body.activity,
    user: JSON.parse(req.body.user),
    advertiserName: req.body.advertiserName,
    advertiserSurname: req.body.advertiserSurname,
    advertiserPhone: req.body.advertiserPhone,
    advertiserNote: req.body.advertiserNote,
    images: [],
    request:
      req.body.request.toLowerCase() === "true" || req.body.request === true,
  };
  let imagePaths = [];
  // Klasör mevcutluğunu kontrol etme
  if (!fs.existsSync(`uploads/otomobil/${id}`)) {
    // Klasör oluşturma
    fs.mkdir(`uploads/otomobil/${id}`, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Klasör oluşturuldu!");
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i];
          const oldPath = file.path;
          const extension = path.extname(file.originalname);
          const newFileName = "resim_" + uuidv4() + extension;
          const newPath = path.join(`uploads/otomobil/${id}`, newFileName);
          let linkPath = `${serverAdress}/${newPath}`;
          linkPath = linkPath.replace(/\\/g, "/");
          imagePaths.push(linkPath);

          // Dosyayı hedef klasöre taşıyın
          fs.renameSync(oldPath, newPath);
        }
        car.images = imagePaths;
        Cars.add(car);
      }
    });
  } else {
    console.log("Klasör zaten mevcut.");
  }
  res.json({ message: "Car added successfully" });
});

// Belirli bir arabayı güncelleyen PUT isteği
app.put("/cars/:id", upload.array("images"), (req, res) => {
  let id = req.params.id;
  let images = JSON.parse(req.body.imageArray);
  let car = {
    id: id,
    baslik: req.body.baslik,
    aciklama: req.body.aciklama,
    fiyat: Number(req.body.fiyat),
    pazarlik: req.body.pazarlik,
    marka: req.body.marka,
    mahalle: req.body.mahalle,
    seri: req.body.seri,
    model: req.body.model,
    yil: Number(req.body.yil),
    yakit: req.body.yakit,
    vites: req.body.vites,
    aracDurumu: req.body.aracDurumu,
    km: Number(req.body.km),
    kasa: req.body.kasa,
    motorGucu: Number(req.body.motorGucu),
    motorHacmi: req.body.motorHacmi,
    cekis: req.body.cekis,
    renk: req.body.renk,
    agirHasarli: req.body.agirHasarli,
    takas: req.body.takas,
    guvenlik: JSON.parse(req.body.guvenlik),
    icDonanim: JSON.parse(req.body.icDonanim),
    disDonanim: JSON.parse(req.body.disDonanim),
    multimedya: JSON.parse(req.body.multimedya),
    date: req.body.date,
    activity: req.body.activity,
    user: JSON.parse(req.body.user),
    advertiserName: req.body.advertiserName,
    advertiserSurname: req.body.advertiserSurname,
    advertiserPhone: req.body.advertiserPhone,
    advertiserNote: req.body.advertiserNote,
    images: [],
    request:
      req.body.request.toLowerCase() === "true" || req.body.request === true,
  };
  let imagePaths = [];
  const klasorYolu = `uploads/otomobil/${id}/`; // Sileceğiniz klasörün yolu
  const korunanIsimler = []; // Silmek istemediğiniz dosyaların isimleri
  images.forEach((element) => {
    if (typeof element === "string") {
      const dosyaYolu = new URL(element).pathname;
      const dosyaAdi = path.basename(dosyaYolu);
      korunanIsimler.push(dosyaAdi);
    }
  });
  fs.readdir(klasorYolu, (err, dosyalar) => {
    if (err) {
      console.error("Klasör okunamadı:", err);
      return;
    }
    dosyalar.forEach((dosya) => {
      if (!korunanIsimler.includes(dosya)) {
        const dosyaYolu = path.join(klasorYolu, dosya);
        fs.unlink(dosyaYolu, (err) => {
          if (err) {
            console.error("Dosya silinemedi:", err);
            return;
          }
          console.log(`${dosya} başarıyla silindi.`);
        });
      }
    });
  });

  let fileIndex = 0;
  images.forEach((image, index) => {
    if (typeof image === "string") {
      imagePaths.push(image);
      console.log("Değişim yok listeye eklendi");
    } else {
      const file = req.files[fileIndex];
      const oldPath = file.path;
      const extension = path.extname(file.originalname);
      const newFileName = "resim_" + uuidv4() + extension;
      const newPath = path.join(`uploads/otomobil/${id}`, newFileName);
      let linkPath = `${serverAdress}/${newPath}`;
      linkPath = linkPath.replace(/\\/g, "/");
      imagePaths.push(linkPath);
      fileIndex++;
      console.log("Değişim var dosya keydedildi listeye eklendi");

      // Dosyayı hedef klasöre taşıyın
      fs.renameSync(oldPath, newPath);
    }
  });

  car.images = imagePaths;
  Cars.update(id, car);
  res.json({ message: "Car updated successfully" });
});

// Isteği Onayla
app.put("/cars/request-accept/:id", (req, res) => {
  let id = req.params.id;
  let car = req.body;
  Cars.update(id, car);
  res.json({ message: "Real estate deleted successfully" });
});

// Belirli bir arabayı silen DELETE isteği
app.delete("/cars/:id", (req, res) => {
  let id = req.params.id;
  fs.rmdir(`uploads/otomobil/${id}`, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Klasör kaldırıldı");
      Cars.delete(id);
    }
  });
  res.json({ message: "Car deleted successfully" });
});

// Belirli bir arabayı döndüren GET isteği
app.get("/cars/:id", (req, res) => {
  let id = req.params.id;
  let cars = Cars.read();
  let car = cars.find((u) => u.id == id);
  res.json(car);
});
app.get("/cars/requests", (req, res) => {
  let cars = Cars.read();
  cars = cars.filter((u) => u.request === true);
  res.json(cars);
});

app.get("/cars/requests/count", (req, res) => {
  let cars = Cars.read();
  cars = cars.filter((u) => u.request === true);
  res.json(cars.length);
});

app.put("/cars/activity/:id", (req, res) => {
  let id = req.params.id;
  let car = req.body;
  Cars.update(id, car);
  res.json({ message: "Real estate deleted successfully" });
});

// CONTACT REQUESTS

// Tüm ilanları döndüren GET isteği
app.get("/contacts", (req, res) => {
  let contacts = Contact.read();
  res.json(contacts);
});

app.post("/contacts", (req, res) => {
  const contact = req.body;
  Contact.add(contact);
  res.json({ message: "Contact added successfully" });
});

app.delete("/contacts/:id", (req, res) => {
  let id = req.params.id;
  Contact.delete(id);
  res.json({ message: "Contact deleted successfully" });
});

// TADİLAT REQUESTS

// REAL ESTATE REQUESTS --------------------------------------------------------------------------

// Tüm tadilatları döndüren GET isteği
app.get("/tadilat", (req, res) => {
  let tadilatlar = Tadilat.read();
  res.json(tadilatlar);
});

// Yeni bir tadilat ekleyen POST isteği
app.post("/tadilat", upload.array("oldImages"), (req, res) => {
  const id = req.body.id;
  const oldImageFiles = req.files;
  let tadilat = {
    id: id,
    title: req.body.title,
    description: req.body.description,
    advertiserName: req.body.advertiserName,
    advertiserSurname: req.body.advertiserSurname,
    advertiserPhone: req.body.advertiserPhone,
    advertiserNote: req.body.advertiserNote,
    oldImages: [],
  };
  let oldImagePaths = [];
  console.log(typeof oldImageFiles, oldImageFiles);
  // Klasör mevcutluğunu kontrol etme
  if (!fs.existsSync(`uploads/tadilat/${id}`)) {
    // Klasör oluşturma
    fs.mkdir(`uploads/tadilat/${id}`, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Klasör oluşturuldu!");

        for (const oldImage of oldImageFiles) {
          const oldPath = oldImage.path;
          const extension = path.extname(oldImage.originalname);
          const newFileName = "resim_" + uuidv4() + extension;
          const newPath = path.join(`uploads/tadilat/${id}`, newFileName);
          let linkPath = `${serverAdress}/${newPath}`;
          linkPath = linkPath.replace(/\\/g, "/");
          oldImagePaths.push(linkPath);

          // Dosyayı hedef klasöre taşıyın
          fs.renameSync(oldPath, newPath);
        }
        tadilat.oldImages = oldImagePaths;
        Tadilat.add(tadilat);
      }
    });
  } else {
    console.log("Klasör zaten mevcut.");
  }
  res.json({ message: "Tadilat added successfully" });
});

// Belirli bir ilanı döndüren GET isteği
app.get("/tadilat/:id", (req, res) => {
  let id = req.params.id;
  let tadilatlar = Tadilat.read();
  let tadilat = tadilatlar.find((u) => u.id == id);
  res.json(tadilat);
});

//Theme
app.get("/theme", (req, res) => {
  let theme = Theme.read();
  res.json(theme);
});

app.put("/theme", (req, res) => {
  const theme = req.body;
  Theme.update(theme);
  res.json({ message: "Theme updated successfully" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "path-to-your-index.html"));
});

// API'nin dinlediği port
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
