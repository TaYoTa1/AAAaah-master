const Router = require("express").Router
const router = Router()


//роутер в свою очередь смотрит на эдпоинт и вызывает соответствующий метод из
// контроллера ("/users" "adduser" "/deluser" и так далее это эндпоинты)
// .get .post .delete это тип http запроса
// в круглых скобках передаются аргументы они разделяются между собой запятой
// первый аргумент эндпоинт второй какой метод вызвать или какой функционал выполнить
// переходим в контроллер
const users = require("../controllers/user_controller")
router.get("/users", users.GetUser)
router.post("/adduser",users.AddUser)
router.delete("/deluser",users.DelUser)
router.post("/upduser",users.UpdateUser)

const pcs = require("../controllers/pc_controller")
router.get("/pcs", pcs.GetPC)
router.post("/addpc",pcs.AddPC)
router.delete("/delpc",pcs.DelPC)
router.post("/updpc",pcs.UpdatePC)

module.exports = router