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

app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  let users = Users.read();
  let updatedUser = users.find((u) => u.id == id);
  res.json(updatedUser);
});

// API'nin dinlediği port
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
