const exp = require("constants");
const express = require("express");
const cors = require("cors"); // cors modülünü çağır
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const fs = require("fs");
const port = 4000;
const JsonLocation = "db.json";

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
    origin: "http://localhost:3000", // İstemci adresini buraya yazın
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

var RealEsstates = {
  read: function () {
    let data = readData();
    let realEstates = data.realEstates;
    return realEstates;
  },
  add: function (realEstate) {
    let realEstates = RealEsstates.read();
    realEstates.push(realEstate);
    let data = readData();
    data.realEstates = realEstates;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  update: function (id, realEstate) {
    let realEstates = RealEsstates.read();
    let updatedRealEstate = realEstates.map((u) =>
      u.id === id ? realEstate : u
    );
    let data = readData();
    data.realEstates = updatedRealEstate;
    let stringData = JSON.stringify(data);
    fs.writeFileSync(JsonLocation, stringData);
  },
  delete: function (id) {
    let realEstates = RealEsstates.read();
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

// USERS REQUESTS --------------------------------------------------------------------------

// Tüm kullanıcıları döndüren GET isteği
app.get("/users", (req, res) => {
  let users = Users.read();
  res.json(users);
});

// Yeni bir kullanıcı ekleyen POST isteği
app.post("/users", (req, res) => {
  let user = req.body;
  Users.add(user);
  res.json({ message: "User added successfully" });
});

// Belirli bir kullanıcıyı güncelleyen PUT isteği
app.put("/users/:id", (req, res) => {
  let id = req.params.id;
  let user = req.body;
  Users.update(id, user);
  res.json({ message: "User updated successfully" });
});

// Belirli bir kullanıcıyı silen DELETE isteği
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  Users.delete(id);
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
  let realEstates = RealEsstates.read();
  res.json(realEstates);
});

// Yeni bir ilan ekleyen POST isteği
app.post("/real-estates", (req, res) => {
  let realEstate = req.body;
  RealEsstates.add(realEstate);
  res.json({ message: "Real estate added successfully" });
});

// Belirli bir ilanı güncelleyen PUT isteği
app.put("/real-estates/:id", (req, res) => {
  let id = req.params.id;
  let realEstate = req.body;
  RealEsstates.update(id, realEstate);
  res.json({ message: "Real estate updated successfully" });
});

// Belirli bir ilanı silen DELETE isteği
app.delete("/real-estates/:id", (req, res) => {
  let id = req.params.id;
  RealEsstates.delete(id);
  res.json({ message: "Real estate deleted successfully" });
});

// Belirli bir ilanı döndüren GET isteği
app.get("/real-estates/:id", (req, res) => {
  let id = req.params.id;
  let realEstates = RealEsstates.read();
  let realEstate = realEstates.find((u) => u.id == id);
  res.json(realEstate);
});

// CARS REQUESTS --------------------------------------------------------------------------

// Tüm arabaları döndüren GET isteği
app.get("/cars", (req, res) => {
  let cars = Cars.read();
  res.json(cars);
});

// Yeni bir araba ekleyen POST isteği
app.post("/cars", (req, res) => {
  let car = req.body;
  Cars.add(car);
  res.json({ message: "Car added successfully" });
});

// Belirli bir arabayı güncelleyen PUT isteği
app.put("/cars/:id", (req, res) => {
  let id = req.params.id;
  let car = req.body;
  Cars.update(id, car);
  res.json({ message: "Car updated successfully" });
});

// Belirli bir arabayı silen DELETE isteği
app.delete("/cars/:id", (req, res) => {
  let id = req.params.id;
  Cars.delete(id);
  res.json({ message: "Car deleted successfully" });
});

// Belirli bir arabayı döndüren GET isteği
app.get("/cars/:id", (req, res) => {
  let id = req.params.id;
  let cars = Cars.read();
  let car = cars.find((u) => u.id == id);
  res.json(car);
});

// API'nin dinlediği port
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
