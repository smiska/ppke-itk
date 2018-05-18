const router = require("express").Router({ mergeParams: true });
const imgs = require("./db.json");

const fetch = require("node-fetch");
const ejs = require("ejs");

// router.get("/:id", (req,res) => {
//     const imgName = req.params.id;

//     const img = imgs.find(img => {
//         return img.title === imgName; 
//     });

//     res.render("product", { img: img });
// });

router.get("/:id", (req,res) => {
    const imgName = req.params.id;

    const img = imgs.find(img => {
        return img.title === imgName; 
    });

    res.render("product", { img: img });
});


module.exports = router;