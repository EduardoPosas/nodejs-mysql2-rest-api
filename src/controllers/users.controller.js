import { pool } from '../db.js'

const getUsers = async (req, res) => {
    try {
        const [users] = await pool.query('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        const message = !user.length ? "Usuario no existe" : user[0]
        res.json(message);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

}

const createUser = async (req, res) => {
    const { name, lastName, email, password, token, confirmed } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO users (name, lastName, email, password, token, confirmed) VALUES (?,?,?,?,?,?)', [name, lastName, email, password, token, confirmed]);
        console.log(result);
        res.json({
            name,
            email,
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, email, password, token, confirmed } = req.body;

    try {
        const [result] = await pool.query('UPDATE users SET name = IFNULL(?, name), lastName = IFNULL(?, lastname), email = IFNULL(?, email), password = IFNULL(?, password), token = IFNULL(?, token), confirmed = IFNULL(?, confirmed) WHERE id = ?', [name, lastName, email, password, token, confirmed, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Usuario no existe"
            });
        }
        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        if (!result?.affectedRows) {
            return res.status(404).json({
                error: 'Usuario no existe en sistema'
            });
        }
        res.sendStatus(204); // Return only the state of request
    } catch (error) {
        res.status(500).json({
            error: error.message
        }
        );
    }
}

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}