const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const multer = require("multer");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.urlencoded({ extended: false }));

//handle multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//home
app.get("/", (req, res) => {
  return res.render("index.ejs");
});

//route
app.post("/upload", upload.single("avatar"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

app.listen(port, () => {
  console.log(`server is working on ${port}`);
});
