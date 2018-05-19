const router = require("express").Router({ mergeParams: true });
const imgs = require("./db.json");
const bodyParser = require("body-parser");
const fs = require("fs");

const fetch = require("node-fetch");
const ejs = require("ejs");

router.get("/:id", (req,res) => {
    res.locals.product = "product";
    const getImgName = req.params.id;

    const img = imgs.find(img => {
        return img.title === getImgName; 
    });

    res.render("product", { img: img });
});

router.put("/:id", (req,res) => {
    const putImgName = req.params.id;

    const imgToUpdate = imgs.findIndex(img => {
        return img.title === putImgName; 
    });

    imgs[imgToUpdate].sold = req.body.sold;
    fs.writeFile("./db.json", JSON.stringify(imgs, null, 2), "utf8", (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })

    res.status(200).send(JSON.stringify(imgs[imgToUpdate]));
    // const img = imgs.find(img => {
    //     return img.title === imgName; 
    // });

    // res.render("product", { img: img });
});


module.exports = router;