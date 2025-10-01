const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => res.send("TodoList Backend çalışıyor!"));

app.use("/auth", require("./routes/auth"));
app.use("/todos", require("./routes/todos"));

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
