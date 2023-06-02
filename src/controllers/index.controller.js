import { pool } from "../db.js";

const ping = async (req, res) => {
    console.log('-------------------------------');
    console.log(req.user);
    const [result] = await pool.query('SELECT "pong" as result')
    res.json(result);
}

export {
    ping
};
