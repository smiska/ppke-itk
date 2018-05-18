const express = require("express");
const app = express();
const imgs = require("./db.json");
const imgRouter = require("./imgRouter");

app.set("view engine", "ejs");
app.use("/products", express.static("imgs"));
app.use("/", express.static("imgs"));
app.use("/product", imgRouter);

app.get("/", (req, res) => res.render("listing", { imgs: imgs }));
app.get("/about", (req, res) => res.render("about"));

app.listen(7000, () => console.log("server started"))