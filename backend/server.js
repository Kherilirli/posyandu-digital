require("dotenv").config();

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION");
    console.error(err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION");
    console.error(err);
});

console.log("1. SERVER START");

try {

    const app = require("./app");
    console.log("2. APP LOADED");

    const db = require("./database/config");
    console.log("3. DB LOADED");

    const PORT = process.env.PORT || 3000;
    console.log({
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    PASSWORD_LENGTH: process.env.DB_PASSWORD?.length
    });

    db.getConnection()
        .then(() => {
            console.log("4. DATABASE CONNECTED");

            app.listen(PORT, () => {
                console.log(`5. SERVER RUNNING ${PORT}`);
            });
        })
        .catch(err => {
            console.error("DATABASE ERROR");
            console.error(err);
        });

} catch (err) {

    console.error("IMPORT ERROR");
    console.error(err);

}