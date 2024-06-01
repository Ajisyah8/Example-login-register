import express, { Router } from "express";
import { register, login } from "../Controller/auth.js";

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await login(email, password);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(401).json(result);
    }
});

// Register endpoint
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const result = await register(email, password);
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(400).json(result);
    }
});

export default router;