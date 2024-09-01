// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
//접근 허가
app.use(cors());

// DB 연결 설정
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

conn.connect((err) => {
    if (err) {
        console.error("DB 연결 오류:", err);
    } else {
        console.log("DB 연결 성공");
    }
});

module.exports = app;
