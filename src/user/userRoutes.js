const { Router } = require ("express");
const { createUser, readUsers, updateUse, deleteUser, loginUser } = require("./userControllers");
const {hashPass} =require('../middleware')
const userRouter = Router();


//userRouter.get('/listUser', listUsers);
//userRouter.patch('/updateUser', updateUser);
//userRouter.delete('/deleteUser', deleteUser);
userRouter.post('/addUser', hashPass, createUser);

userRouter.post('/loginUser,tokenCheck, comparePass, loginUser')
userRouter.get('/readUser', readUsers);
userRouter.put('/updateUser', updateUser)
userRouter.delete('/deleteUser', deleteUser)

module.exports = userRouter;
