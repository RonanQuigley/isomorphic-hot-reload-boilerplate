import express from "express";
import * as middleware from "./middleware";
const router = express.Router();

console.log(process.env.NODE_ENV);

router.get("/", middleware.render);

export default router;
