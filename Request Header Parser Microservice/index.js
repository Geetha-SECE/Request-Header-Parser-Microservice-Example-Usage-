const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/whoami", (req, res) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ipaddress =
    (forwarded ? forwarded.split(",")[0].trim() : "") ||
    req.ip ||
    req.socket.remoteAddress;

  res.json({
    ipaddress,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  //
  console.log(`Server running on port ${PORT}`);
});
//
