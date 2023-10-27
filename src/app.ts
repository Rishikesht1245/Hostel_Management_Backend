import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";

// custom type for token payload
import "./types/request";

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

  // mongo DB Connection
  private connectDB(): void {
    connectDB();
  }
}

export default new App().app;
