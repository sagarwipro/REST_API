const {createUser,getUserById,getUsers,updateUser,deleteUser,login}=require("./user.controller");

const router= require("express").Router();
const {checkToken}=require("../../auth/token_validation");

router.post("/created",checkToken,createUser);
router.get("/:id",checkToken,getUserById);
router.get("/",checkToken,getUsers);
router.delete("/:id",checkToken,deleteUser);
router.patch("/",checkToken,updateUser);
router.post("/login",login)
module.exports=router;
