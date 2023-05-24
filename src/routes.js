const express = require("express")
const router = express.Router()
const userController = require("./controllers/userController")
const loginController = require("./controllers/loginController")
const auth = require("./middleware/auth")

router.get("/users", userController.findAll)
router.post("/users", userController.create)
router.patch("/users/:id", userController.update)
router.delete("/users/:id", userController.delete)
router.get("/users/:id",auth, userController.findOne)

router.post("/login", loginController.login)

module.exports = router