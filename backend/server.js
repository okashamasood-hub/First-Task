const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/auth");


app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

app.use(express.json());

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});