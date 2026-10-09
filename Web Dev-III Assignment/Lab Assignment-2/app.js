const express = require("express");
const app = express();

const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRouters");

app.use(express.json());
app.use(logger);

app.use("/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("Student Management REST API");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});