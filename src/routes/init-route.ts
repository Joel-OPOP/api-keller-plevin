import { Router, Request, Response } from "express";
const router = Router();

// Helpers
const { accessLogStream } = require("../Utilities/logger");

// Packages
const moment = require("moment");

// Check if the server is currently running.
router.get("/", async (req: Request, res: Response) => {
  try {
    res.send({
      success: true,
      message: "Server is running.",
      time: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      accessLogStream.write(
        moment().format("MMMM Do YYYY, h:mm:ss a") +
          " : " +
          "[ERROR]: [ROUTE - INIT-ROUTE] : --- :" +
          err.toString() +
          "\n \n"
      );

      res.status(422).send({
        success: false,
        message: err.message,
      });
    }
  }
});

module.exports = router;
