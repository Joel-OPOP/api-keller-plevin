import express, { Express } from "express";
const dotenv = require("dotenv");
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Packages
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

// Cors
let corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  optionsSuccessStatus: 200,
};

// Middleware
let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("tiny", { stream: accessLogStream }));
app.use(express.json());
app.use(cors(corsOptions));

// Routes
const initRoute = require("./routes/init-route");

// Route grouping
app.use(initRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
