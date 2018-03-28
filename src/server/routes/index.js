import express from "express";
import index from "./views/index.hbs";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../../common/app";
const router = express.Router();

router.get("/", (req, res, next) => {
    res.send(
        index({
            title: "Home Page",
            // this will work in production
            React: renderToString(<App />)
        })
    );
});

export default router;
