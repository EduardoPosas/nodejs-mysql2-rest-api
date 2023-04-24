import { pool } from "../db.js";

const ping = async (req, res) => {
    const [result] = await pool.query('SELECT "pong" as result');
    res.json(result);
}

export {
    ping
};
