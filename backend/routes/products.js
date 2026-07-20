import express from "express";
import db from "../database/db.js";

const router = express.Router();


// Barcha mahsulotlarni olish
router.get("/", async (req, res) => {

    const products = await db.all(
        "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(products);

});



// Mahsulot qo'shish
router.post("/", async (req, res) => {

    const {
        name,
        category,
        unit,
        buyPrice,
        price,
        stock
    } = req.body;


    const result = await db.run(
        `
        INSERT INTO products
        (name, category, unit, buyPrice, price, stock)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            name,
            category,
            unit,
            buyPrice,
            price,
            stock
        ]
    );


    res.json({
        id: result.lastID,
        message: "Mahsulot qo‘shildi"
    });

});




// Mahsulot o'chirish
router.delete("/:id", async (req, res) => {


    await db.run(
        "DELETE FROM products WHERE id=?",
        [req.params.id]
    );


    res.json({
        message:"Mahsulot o‘chirildi"
    });


});




// Mahsulot yangilash
router.put("/:id", async (req,res)=>{


    const {
        name,
        category,
        unit,
        buyPrice,
        price,
        stock
    } = req.body;



    await db.run(
        `
        UPDATE products SET

        name=?,
        category=?,
        unit=?,
        buyPrice=?,
        price=?,
        stock=?

        WHERE id=?

        `,
        [
            name,
            category,
            unit,
            buyPrice,
            price,
            stock,
            req.params.id
        ]
    );


    res.json({
        message:"Yangilandi"
    });


});



export default router;