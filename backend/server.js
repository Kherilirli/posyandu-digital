require('dotenv').config();

console.log("1. SERVER START");

const app = require('./app');
console.log("2. APP LOADED");

const db = require('./database/config');
console.log("3. DB CONFIG LOADED");

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        console.log("4. GET CONNECTION");
        await db.getConnection();
        console.log("5. DATABASE CONNECTED");

        app.listen(PORT, () => {
            console.log(`6. SERVER RUNNING ${PORT}`);
        });

    } catch (err) {
        console.error("ERROR :", err);
    }
})();