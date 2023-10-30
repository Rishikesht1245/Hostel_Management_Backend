import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";

import staffRoutes from "./routes/staff.routes";
import studentRoutes from "./routes/student.routes";
import chiefWardenRoutes from "./routes/chiefWarden.routes";

import globalErrorHandler from "./errors/AppError";

// custom type for token payload
import "./types/request";
import { endPointNotFound, verifyAuth } from "./routes/routeUtils";

class App {
  // this will be used for creating server in the server.ts file
  public app: express.Application;

  // constructor will be invoked when we create instance new App().app at export
  constructor() {
    this.dotenvConfig();
    this.app = express();
    this.cors();
    this.bodyParser();
    this.connectDB();
    this.Routes();
    this.globalErrorHandler();
  }

  /* ============== private methods only available with in this class =============== */
  // dotenv Configuration
  private dotenvConfig(): void {
    dotenv.config();
  }

  //  configuring cors to accept request from frontend
  private cors(): void {
    this.app.use(
      cors({
        origin: process.env.FRONT_END_URL as string,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
      })
    );
  }

  //   body parser
  private bodyParser(): void {
    // parses the req.body (encoded data) : extended true to parse complex data
    this.app.use(express.urlencoded({ extended: true }));
    // parses the json data
    this.app.use(express.json({ limit: "2mb" }));
  }

  //   routes
  private Routes(): void {
    // index route
    this.app.all("/api/v1", (req: Request, res: Response) => {
      res.send("Welcome to Hostel Management App 🏚️");
    });

    //student routes
    this.app.use("/api/v1/students", studentRoutes);
    // staff routes
    this.app.use("/api/v1/staffs", staffRoutes);
    //chief warden routes
    this.app.use("/api/v1/chief-warden", chiefWardenRoutes);

    //authentication checking function to authenticate in client side
    this.app.use("/api/v1/checkAuth", verifyAuth);

    // endpoint not found
    this.app.use("*", endPointNotFound);
  }

  // Global Error Handler
  private globalErrorHandler(): void {
    this.app.use(globalErrorHandler);
  }

  // mongo DB Connection
  private connectDB(): void {
    connectDB();
  }
}

export default new App().app;
