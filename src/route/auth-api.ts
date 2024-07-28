import express from "express";
import {authMiddleware} from "../middleware/auth-middleware";
import {UserController} from "../controller/user-controller";
import {AddressController} from "../controller/address-controller";
import {WisataController} from "../controller/wisata-controller";
import {upload} from "../multer-config";
import {TransactionController} from "../controller/transaction-controller";

export const authApiRouter = express.Router();
authApiRouter.use(authMiddleware);

//User API
authApiRouter.get("/api/users", UserController.get);
authApiRouter.post("/api/users/logout", UserController.logout);
authApiRouter.put("/api/users", UserController.update);

//Address API
authApiRouter.post("/api/users/:userId/address", AddressController.createAddress);
authApiRouter.get("/api/users/address", AddressController.getAddress);

//Wisata API
authApiRouter.post("/api/wisata",upload.single('img_wisata'),WisataController.create)
authApiRouter.get("/api/wisata",WisataController.get)
authApiRouter.post("/api/wisata/favourite/:wisataId",WisataController.update)
authApiRouter.post("/api/wisata/rate/:wisataId",WisataController.updateRate)

//Transaction API
authApiRouter.post("/api/transaction",TransactionController.create)
authApiRouter.get("/api/transaction",TransactionController.get)