const { Router } = require ("express");
const { createUser, readUsers, updateUsers, deleteUser, loginUser } = require("./userControllers");
const {hashPass, comparePass, tokenCheck} =require('../middleware')
const userRouter = Router();
console.log("line5")

//userRouter.get('/listUser', listUsers);
//userRouter.patch('/updateUser', updateUser);
//userRouter.delete('/deleteUser', deleteUser);
userRouter.post('/addUser', hashPass, createUser);
console.log("line11")
userRouter.post('/loginUser', tokenCheck, comparePass, loginUser)
console.log("line13")
userRouter.get('/readUser', readUsers);
console.log("line15")
userRouter.put('/updateUser', updateUsers)
console.log("line17")
userRouter.delete('/deleteUser', deleteUser)

module.exports = userRouter;
