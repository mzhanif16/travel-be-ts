import express from "express";
import {UserController} from "../controller/user-controller";
import path from "path";

export const router = express.Router();
router.post("/api/users/register",UserController.register)
router.post("/api/users/login",UserController.login)
router.post("/api/users/verify-register",UserController.verifyOTP)
router.post("/api/users/requestPasswordReset",UserController.requestPasswordReset)
router.post("/api/users/reset-password",UserController.resetPassword)

router.get('/uploads/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.resolve(__dirname, '..', '..', 'uploads', filename);
    res.sendFile(filePath, err => {
        if (err) {
            res.status(404).json({ message: 'File not found' });
        }
    });
});