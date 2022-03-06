import path from "path";
import dotenv from "dotenv";
import "isomorphic-fetch";

dotenv.config({
  path: path.resolve(__dirname, "./../.env"),
});
