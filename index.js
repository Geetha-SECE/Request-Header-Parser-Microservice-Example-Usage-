const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  if (!dateParam) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  if (/^\d+$/.test(dateParam)) {
    dateParam = parseInt(dateParam, 10);
  }

  const parsedDate = new Date(dateParam);

  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
