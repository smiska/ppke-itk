const fs = require("fs");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const imgs = require("./db.json");
const backupImgs = require("./db-backup.json");
const imgRouter = require("./imgRouter");

app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use("/products", express.static("imgs"));
app.use("/", express.static("imgs"));
app.use("/product", imgRouter);
// app.locals.initDB = imgs.map(img => Object.freeze(img));

app.get("/", (req, res) => {
    res.locals.listing = "listing";
    res.render("listing", { imgs: imgs });    
}); 
app.get("/about", (req, res) => res.render("about"));

app.post("/reset", (req, res) => {
    fs.writeFile("./db.json", JSON.stringify(backupImgs, null, 2), "utf8", (err) => {
        if (err) throw err;
        console.log('The reset was called!');
    });
    res.send("coolness")
});

app.listen(7000, () => console.log("server started"))