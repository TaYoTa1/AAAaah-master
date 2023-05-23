const PC_service = require("../service/pc_service.js")

// в контролере собраны все методы для работы в данном случае с пользователем
// вы создаете методы которые в свою очередь определяете ддя каждого эндпоинта
// в роутере у этих методов в круглых скобках есть входные аргументы
// req-то что прилетает от клиента(постман) res-ответ нашего сервера клиенту
// next просто пока не трогайте

class PCController {
    async GetPC(req, res, next)
    {
        try {
            res.json(await PC_service.GetAllPCs())
        } catch(e) {
            res.json({"error": "EXCEPTION"})
        }
    }

    async AddPC(req, res, next)
    {
        try {
            res.json(await PC_service.AddPC(req))
        } catch(e) {
            res.json({"error": "EXCEPTION"})
        }
    }

    async DelPC(req, res, next)
    {
        try {
            res.json(await PC_service.DeletePC(req))
        } catch(e) {
            console.log(e)
            res.json({"error": "EXCEPTION"})
        }
    }
    async UpdatePC(req, res, next)
    {
        try {
            res.json(await PC_service.UpdatePC(req))
        } catch(e) {
            console.log(e)
            res.json({"error": "EXCEPTION"})
        }
    }
}

module.exports = new PCController()