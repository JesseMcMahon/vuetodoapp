const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../../../config/auth")

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.post("/addtodo/:currentuser/:newtodo", userController.addThisTodo)
router.get("/me", auth, userController.getUserDetails);
router.get("/gettodos/:currentuser", userController.getTodos)
router.put("/removetodo/:currentuser/:todoid", userController.deleteTodo)

module.exports = router;