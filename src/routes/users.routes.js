import { Router } from "express";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser
} from "../controllers/users.controller.js";

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser)
router.post('/users', createUser);
// router.put('/users/:id', updateUser); // Update all data
router.patch('/users/:id', updateUser); // Update data partially
router.delete('/users/:id', deleteUser);


export default router;