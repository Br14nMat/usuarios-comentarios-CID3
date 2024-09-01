import express, {Request, Response} from 'express';
import userController from '../controllers/user.controller'
import validateSchema from '../middlewares/validateSchema';
import userSchema from '../schemas/user.schema';
import auth from "../middlewares/auth";

export const router = express.Router();

//router.get("/:id", userController.getUser)

router.post("/", validateSchema(userSchema), userController.create)

router.get("/profile", auth, userController.getUser)

router.post("/login", userController.login)

router.get("/all", userController.getAll)

router.get("/:id", userController.getUser)

router.put("/:id", userController.update)

router.delete("/:id", userController.delete)

