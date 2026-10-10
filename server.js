import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

function sendDateResponse(dateString, res) {
  let date;

  if (!dateString) {
    date = new Date();
  } else {
    // Nếu là toàn số (Unix timestamp)
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Kiểm tra nếu ngày không hợp lệ
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),          
    utc: date.toUTCString()        
  });
}

app.get("/api", (req, res) => {
  sendDateResponse(null, res);
});

app.get("/api/:date", (req, res) => {
  sendDateResponse(req.params.date, res);
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
