require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes");
const port = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/api/v1", router);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
