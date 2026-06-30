require("dotenv").config();

const app = require("./app");
const db = require("./database/config");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

(async () => {
    try {
        const conn = await db.getConnection();

        console.log("Database connected");

        conn.release();

    } catch (err) {

        console.error("Database failed");
        console.error(err);

    }
})();