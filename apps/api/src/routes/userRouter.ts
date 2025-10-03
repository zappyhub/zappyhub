import { Router } from "express";
//CONTROLLERS
import { createUserController } from "@/controllers/users/create";
import { updateUserController } from "@/controllers/users/update";
import { deleteUserController } from "@/controllers/users/delete";
import { getByEmailController } from "@/controllers/users/getByEmail";
import { getByPhoneController } from "@/controllers/users/getByCellphone";
import { getByNameController } from "@/controllers/users/getByName";
import { getByIdController } from "@/controllers/users/getById";
import { getAllController } from "@/controllers/users/getAll";




const userRouter = Router();


//CREATE
userRouter.post("/new", ((req, res,) => createUserController.run(req, res,)));
//GETALL
userRouter.get("/", (req, res,) => getAllController.run(req, res,))
//GETBYID
userRouter.get("/:id", (req, res,) => getByIdController.run(req, res,));
//GETBYEMAIL
userRouter.get("/search/email", (req, res,) => getByEmailController.run(req, res,));
//GETBYPHONE
userRouter.get("/search/cellphone", (req, res,) => getByPhoneController.run(req, res,));
//GETBYNAME
userRouter.get("/search/name", (req, res,) => getByNameController.run(req, res,));
//UPDATE
userRouter.put("/put/:id", (req, res,) => updateUserController.run(req, res,));
//DELETE
userRouter.delete("/delete/:id", (req, res,) => deleteUserController.run(req, res,));


export default userRouter;
