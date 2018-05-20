const router = require("express").Router({ mergeParams: true });
const imgs = require("./db.json");
const bodyParser = require("body-parser");
const fs = require("fs");

const fetch = require("node-fetch");

router.get("/:id", (req,res) => {
    res.locals.product = "product";
    const getImgName = req.params.id;

    const img = imgs.find(img => {
        return img.title === getImgName; 
    });

    res.render("product", { img: img });
});

router.put("/:id", (req,res, next) => {
    const putImgName = req.params.id;

    const imgToUpdate = imgs.findIndex(img => {
        return img.title === putImgName; 
    });

    imgs[imgToUpdate].sold = req.body.sold;

    req.imgToReRender = imgs[imgToUpdate];

    fs.writeFile("./db.json", JSON.stringify(imgs, null, 2), "utf8", (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    next();
}, (req, res, next) => { 
    // res.status(200).send(JSON.stringify(req.imgToReRender));
    res.render("product", { img: req.imgToReRender });
});


module.exports = router;