require("dotenv").config();
const mysql =require('mysql');

//if u want to hide ur these info below from other users then u must install dotenv

let databaseOptions={
    port:process.env.DB_PORT,
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    connectionLimits:10
    };
    console.log("databaseOptions=>",databaseOptions);
const pool=mysql.createPool(databaseOptions);

module.exports=pool;