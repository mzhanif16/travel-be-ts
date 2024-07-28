

import {UserController} from "../controller/user-controller";
import {router} from "../route/public-api";



/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     description: Endpoint for user login.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: Successful login
 *       404:
 *         description: Not Found
 */
router.post("/api/users/login",UserController.login)


/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register user
 *     description: Endpoint for user register.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: joni
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       201:
 *         description: Successful Register
 *       400:
 *         description: Email Already Exist
 */
router.post("/api/users/register",UserController.register)
