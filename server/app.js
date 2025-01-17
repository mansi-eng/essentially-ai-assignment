// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ["http://localhost:3000"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-credentials", true);
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, UPDATE"
    );
    next();
});

app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", async (req, res) => {
    try {
        // Extract required fields from req body
        const { date, ticker } = req.body;

        // Fetch data from polygon Api
        const { data } = await axios.get(
            `https://api.polygon.io/v1/open-close/${ticker}/${date}?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`
        );

        // Extract required fields
        const { open, high, low, close, volume } = data;
        res.status(200).json({
            message: "Data fetched successfully",
            data: { open, high, low, close, volume },
        });
    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code
            const { status, data } = err.response;
            res.status(status).json({ error: data });
        } else {
            // Something else went wrong
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
