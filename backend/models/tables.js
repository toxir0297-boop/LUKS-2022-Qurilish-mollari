import db from "../database/db.js";


export async function createTables(){

    await db.exec(`

    CREATE TABLE IF NOT EXISTS products (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        category TEXT,

        unit TEXT,

        buyPrice INTEGER,

        price INTEGER,

        stock INTEGER DEFAULT 0

    );


    CREATE TABLE IF NOT EXISTS sales (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        customer TEXT,

        product TEXT,

        quantity INTEGER,

        total INTEGER,

        paymentType TEXT,

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

    );


    CREATE TABLE IF NOT EXISTS debts (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        customer TEXT,

        product TEXT,

        quantity INTEGER,

        total INTEGER,

        paid INTEGER DEFAULT 0,

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

    );

    `);


    console.log("Database tables created ✅");

}